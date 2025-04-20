"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useUser } from "@/contexts/user-context"
import { quizData } from "@/lib/quiz-data"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PlusCircle, Save, Trash2, Edit, AlertCircle } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function QuestionsManagementPage() {
  const { isAuthenticated, isAdmin } = useUser()
  const router = useRouter()
  const [selectedTopic, setSelectedTopic] = useState("mvc")
  const [questions, setQuestions] = useState(quizData)
  const [editingQuestion, setEditingQuestion] = useState<any>(null)
  const [showSaveAlert, setShowSaveAlert] = useState(false)

  // Form state for new/edit question
  const [formData, setFormData] = useState({
    question: "",
    options: ["", "", "", ""],
    correctAnswer: 0,
  })

  useEffect(() => {
    if (!isAuthenticated || !isAdmin) {
      router.push("/sign-in")
    }
  }, [isAuthenticated, isAdmin, router])

  if (!isAuthenticated || !isAdmin) {
    return null
  }

  const currentTopic = questions.find((topic) => topic.id === selectedTopic)

  const handleTopicChange = (topicId: string) => {
    setSelectedTopic(topicId)
    setEditingQuestion(null)
  }

  const handleEditQuestion = (question: any) => {
    setEditingQuestion(question)
    setFormData({
      question: question.question,
      options: [...question.options],
      correctAnswer: question.correctAnswer,
    })
  }

  const handleDeleteQuestion = (questionId: number) => {
    const updatedQuestions = questions.map((topic) => {
      if (topic.id === selectedTopic) {
        return {
          ...topic,
          questions: topic.questions.filter((q) => q.id !== questionId),
        }
      }
      return topic
    })

    setQuestions(updatedQuestions)
    // In a real app, you would save this to a database
    setShowSaveAlert(true)
    setTimeout(() => setShowSaveAlert(false), 3000)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...formData.options]
    newOptions[index] = value
    setFormData({
      ...formData,
      options: newOptions,
    })
  }

  const handleCorrectAnswerChange = (value: string) => {
    setFormData({
      ...formData,
      correctAnswer: Number.parseInt(value),
    })
  }

  const handleSaveQuestion = () => {
    if (editingQuestion) {
      // Update existing question
      const updatedQuestions = questions.map((topic) => {
        if (topic.id === selectedTopic) {
          return {
            ...topic,
            questions: topic.questions.map((q) => (q.id === editingQuestion.id ? { ...q, ...formData } : q)),
          }
        }
        return topic
      })
      setQuestions(updatedQuestions)
    } else {
      // Add new question
      const newId = Math.max(...currentTopic!.questions.map((q) => q.id)) + 1
      const updatedQuestions = questions.map((topic) => {
        if (topic.id === selectedTopic) {
          return {
            ...topic,
            questions: [...topic.questions, { id: newId, ...formData }],
          }
        }
        return topic
      })
      setQuestions(updatedQuestions)
    }

    // Reset form
    setFormData({
      question: "",
      options: ["", "", "", ""],
      correctAnswer: 0,
    })
    setEditingQuestion(null)

    // In a real app, you would save this to a database
    setShowSaveAlert(true)
    setTimeout(() => setShowSaveAlert(false), 3000)
  }

  const resetForm = () => {
    setFormData({
      question: "",
      options: ["", "", "", ""],
      correctAnswer: 0,
    })
    setEditingQuestion(null)
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Manage Quiz Questions</h1>

        {showSaveAlert && (
          <Alert className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Success</AlertTitle>
            <AlertDescription>
              Changes saved successfully. Note: In this demo, changes are only saved for the current session.
            </AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle>Topics</CardTitle>
              <CardDescription>Select a topic to manage its questions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {questions.map((topic) => (
                  <Button
                    key={topic.id}
                    variant={selectedTopic === topic.id ? "default" : "outline"}
                    className="w-full justify-start"
                    onClick={() => handleTopicChange(topic.id)}
                  >
                    {topic.title}
                    <span className="ml-auto bg-muted text-muted-foreground rounded-full px-2 py-0.5 text-xs">
                      {topic.questions.length}
                    </span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="md:col-span-3 space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>{currentTopic?.title} Questions</CardTitle>
                  <CardDescription>Manage questions for this topic</CardDescription>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button onClick={resetForm}>
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Add Question
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>{editingQuestion ? "Edit Question" : "Add New Question"}</DialogTitle>
                      <DialogDescription>
                        {editingQuestion
                          ? "Update the question details below"
                          : "Fill in the details to create a new question"}
                      </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <label htmlFor="question" className="text-sm font-medium">
                          Question
                        </label>
                        <Textarea
                          id="question"
                          name="question"
                          placeholder="Enter the question text"
                          value={formData.question}
                          onChange={handleInputChange}
                          rows={3}
                        />
                      </div>

                      <div className="space-y-4">
                        <label className="text-sm font-medium">Answer Options</label>
                        {formData.options.map((option, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <Input
                              placeholder={`Option ${index + 1}`}
                              value={option}
                              onChange={(e) => handleOptionChange(index, e.target.value)}
                            />
                            <Select
                              value={formData.correctAnswer === index ? "true" : "false"}
                              onValueChange={(value) => {
                                if (value === "true") {
                                  handleCorrectAnswerChange(index.toString())
                                }
                              }}
                            >
                              <SelectTrigger className="w-[120px]">
                                <SelectValue placeholder="Correct?" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="true">Correct</SelectItem>
                                <SelectItem value="false">Incorrect</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        ))}
                      </div>
                    </div>

                    <DialogFooter>
                      <Button variant="outline" onClick={resetForm}>
                        Cancel
                      </Button>
                      <Button onClick={handleSaveQuestion}>
                        <Save className="mr-2 h-4 w-4" />
                        {editingQuestion ? "Update Question" : "Add Question"}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                {currentTopic?.questions.length === 0 ? (
                  <div className="text-center py-12 border rounded-lg">
                    <h3 className="text-xl font-medium mb-2">No questions yet</h3>
                    <p className="text-muted-foreground mb-6">Add your first question to get started.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {currentTopic?.questions.map((question, index) => (
                      <Card key={question.id} className="overflow-hidden">
                        <CardHeader className="bg-muted/50 pb-2">
                          <div className="flex justify-between items-start">
                            <CardTitle className="text-base">Question {index + 1}</CardTitle>
                            <div className="flex gap-2">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button variant="ghost" size="sm" onClick={() => handleEditQuestion(question)}>
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-2xl">
                                  <DialogHeader>
                                    <DialogTitle>Edit Question</DialogTitle>
                                    <DialogDescription>Update the question details below</DialogDescription>
                                  </DialogHeader>

                                  <div className="space-y-4 py-4">
                                    <div className="space-y-2">
                                      <label htmlFor="question" className="text-sm font-medium">
                                        Question
                                      </label>
                                      <Textarea
                                        id="question"
                                        name="question"
                                        placeholder="Enter the question text"
                                        value={formData.question}
                                        onChange={handleInputChange}
                                        rows={3}
                                      />
                                    </div>

                                    <div className="space-y-4">
                                      <label className="text-sm font-medium">Answer Options</label>
                                      {formData.options.map((option, index) => (
                                        <div key={index} className="flex items-center gap-2">
                                          <Input
                                            placeholder={`Option ${index + 1}`}
                                            value={option}
                                            onChange={(e) => handleOptionChange(index, e.target.value)}
                                          />
                                          <Select
                                            value={formData.correctAnswer === index ? "true" : "false"}
                                            onValueChange={(value) => {
                                              if (value === "true") {
                                                handleCorrectAnswerChange(index.toString())
                                              }
                                            }}
                                          >
                                            <SelectTrigger className="w-[120px]">
                                              <SelectValue placeholder="Correct?" />
                                            </SelectTrigger>
                                            <SelectContent>
                                              <SelectItem value="true">Correct</SelectItem>
                                              <SelectItem value="false">Incorrect</SelectItem>
                                            </SelectContent>
                                          </Select>
                                        </div>
                                      ))}
                                    </div>
                                  </div>

                                  <DialogFooter>
                                    <Button variant="outline" onClick={resetForm}>
                                      Cancel
                                    </Button>
                                    <Button onClick={handleSaveQuestion}>
                                      <Save className="mr-2 h-4 w-4" />
                                      Update Question
                                    </Button>
                                  </DialogFooter>
                                </DialogContent>
                              </Dialog>
                              <Button variant="ghost" size="sm" onClick={() => handleDeleteQuestion(question.id)}>
                                <Trash2 className="h-4 w-4 text-destructive" />
                              </Button>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="pt-4">
                          <p className="mb-4">{question.question}</p>
                          <div className="grid grid-cols-1 gap-2">
                            {question.options.map((option, optionIndex) => (
                              <div
                                key={optionIndex}
                                className={`p-2 rounded-md ${
                                  optionIndex === question.correctAnswer
                                    ? "bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-800"
                                    : "bg-muted"
                                }`}
                              >
                                {option}
                                {optionIndex === question.correctAnswer && (
                                  <span className="ml-2 text-green-600 dark:text-green-400 text-sm">(Correct)</span>
                                )}
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
