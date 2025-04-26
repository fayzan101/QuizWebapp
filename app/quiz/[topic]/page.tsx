"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { quizData } from "@/lib/quiz-data"
import { AlertCircle, CheckCircle, Clock, AlertTriangle } from "lucide-react"
import { useUser } from "@/contexts/user-context"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function QuizPage() {
  const params = useParams()
  const router = useRouter()
  const topicId = typeof params.topic === "string" ? params.topic : ""
  const { isAuthenticated, addQuizResult, user, isAdmin } = useUser()

  const currentTopic = quizData.find((topic) => topic.id === topicId)

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [answers, setAnswers] = useState<(number | null)[]>([])
  const [showResults, setShowResults] = useState(false)
  const [timeLeft, setTimeLeft] = useState(300)
  const [timerActive, setTimerActive] = useState(true)
  const [disqualified, setDisqualified] = useState(false)
  const [disqualificationReason, setDisqualificationReason] = useState("")

  useEffect(() => {
    if (!isAuthenticated) router.push("/sign-in")
  }, [isAuthenticated, router])

  useEffect(() => {
    if (!currentTopic) router.push("/")
  }, [currentTopic, router])

  useEffect(() => {
    if (currentTopic) {
      setAnswers(Array(currentTopic.questions.length).fill(null))
    }
  }, [currentTopic])

  useEffect(() => {
    if (isAdmin) return

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden" && !showResults && !disqualified) {
        disqualify("You switched tabs or windows during the quiz.")
      }
    }

    const handleBlur = () => {
      if (!showResults && !disqualified) {
        disqualify("You switched to another application during the quiz.")
      }
    }

    document.addEventListener("visibilitychange", handleVisibilityChange)
    window.addEventListener("blur", handleBlur)

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange)
      window.removeEventListener("blur", handleBlur)
    }
  }, [disqualified, showResults, isAdmin])

  const disqualify = (reason: string) => {
    setDisqualified(true)
    setTimerActive(false)
    setDisqualificationReason(reason)
    if (currentTopic) {
      addQuizResult({
        userId: user!.name,
        topicId: currentTopic.id,
        score: 0,
        totalQuestions: currentTopic.questions.length,
        date: new Date().toISOString(),
        completed: false,
        disqualified: true,
        id: "",
        userName: ""
      })
    }
  }

  useEffect(() => {
    if (!timerActive || timeLeft <= 0) return

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          setTimerActive(false)
          setShowResults(true)
          if (currentTopic) {
            const score = calculateScore()
            addQuizResult({
              userId: user!.name,
              topicId: currentTopic.id,
              score,
              totalQuestions: currentTopic.questions.length,
              date: new Date().toISOString(),
              completed: true,
              disqualified: false,
              id: "",
              userName: ""
            })
          }
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [timerActive, timeLeft, currentTopic])

  const calculateScore = (answersToCheck = answers) => {
    let score = 0
    currentTopic?.questions.forEach((question, index) => {
      if (answersToCheck[index] === question.correctAnswer) {
        score++
      }
    })
    return score
  }

  const handleOptionSelect = (optionIndex: number) => {
    setSelectedOption(optionIndex)
  }

  const handleNextQuestion = () => {
    const updatedAnswers = [...answers]
    updatedAnswers[currentQuestionIndex] = selectedOption
    setAnswers(updatedAnswers)

    if (currentQuestionIndex < currentTopic!.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setSelectedOption(null)
    } else {
      setTimerActive(false)
      setShowResults(true)

      const score = calculateScore(updatedAnswers)
      addQuizResult({
        userId: user!.name,
        topicId: currentTopic!.id,
        score,
        totalQuestions: currentTopic!.questions.length,
        date: new Date().toISOString(),
        completed: true,
        disqualified: false,
        id: "",
        userName: ""
      })
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`
  }

  if (!currentTopic || !isAuthenticated) return null

  const currentQuestion = currentTopic.questions[currentQuestionIndex]
  const totalQuestions = currentTopic.questions.length
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100

  if (disqualified) {
    return (
      <div className="container mx-auto px-4 py-12">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl text-center flex items-center justify-center gap-2">
              <AlertTriangle className="h-6 w-6 text-red-500" />
              Quiz Terminated
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Disqualified</AlertTitle>
              <AlertDescription>
                {disqualificationReason} For academic integrity, you have been disqualified and received 0 marks.
              </AlertDescription>
            </Alert>
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">0/{totalQuestions}</div>
              <p className="text-xl text-muted-foreground">Your Score: 0%</p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => router.push("/")}>
              Back to Home
            </Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  if (showResults) {
    const score = calculateScore()
    const percentage = Math.round((score / totalQuestions) * 100)

    return (
      <div className="container mx-auto px-4 py-12">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Quiz Results: {currentTopic.title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">
                {score}/{totalQuestions}
              </div>
              <p className="text-xl text-muted-foreground">Your Score: {percentage}%</p>
            </div>

            <Progress value={percentage} className="h-3" />

            <div className="space-y-4 mt-8">
              <h3 className="text-xl font-semibold">Question Review</h3>
              {currentTopic.questions.map((question, index) => {
                const isCorrect = answers[index] === question.correctAnswer
                return (
                  <div key={question.id} className="border rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      {isCorrect ? (
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      ) : (
                        <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
                      )}
                      <div className="space-y-2 flex-1">
                        <p className="font-medium">
                          {index + 1}. {question.question}
                        </p>
                        <div className="grid grid-cols-1 gap-2">
                          {question.options.map((option, optionIndex) => {
                            const isUserAnswer = optionIndex === answers[index]
                            const isCorrectAnswer = optionIndex === question.correctAnswer
                            return (
                              <div
                                key={optionIndex}
                                className={`p-2 rounded-md ${
                                  isCorrectAnswer
                                    ? "bg-green-100 dark:bg-green-900/30 border-green-200 dark:border-green-800"
                                    : isUserAnswer
                                    ? "bg-red-100 dark:bg-red-900/30 border-red-200 dark:border-red-800"
                                    : "bg-gray-100 dark:bg-gray-800"
                                } ${isUserAnswer || isCorrectAnswer ? "border" : ""}`}
                              >
                                {option}
                                {isCorrectAnswer && (
                                  <span className="ml-2 text-green-600 dark:text-green-400 text-sm">(Correct)</span>
                                )}
                                {isUserAnswer && !isCorrectAnswer && (
                                  <span className="ml-2 text-red-600 dark:text-red-400 text-sm">(Your Answer)</span>
                                )}
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => router.push("/")}>
              Back to Home
            </Button>
            <Button onClick={() => router.replace(`/quiz/${topicId}`)}>Retry</Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center justify-between">
            {currentTopic.title}
            <span className="flex items-center gap-1 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" /> {formatTime(timeLeft)}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <Progress value={progress} className="h-2" />
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">
              Q{currentQuestionIndex + 1}: {currentQuestion.question}
            </h2>
            <RadioGroup value={selectedOption?.toString() ?? ""} onValueChange={(val) => handleOptionSelect(Number(val))}>
              {currentQuestion.options.map((option, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                  <Label htmlFor={`option-${index}`}>{option}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button disabled={selectedOption === null} onClick={handleNextQuestion}>
            {currentQuestionIndex === totalQuestions - 1 ? "Finish" : "Next"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
