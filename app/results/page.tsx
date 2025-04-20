"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useUser } from "@/contexts/user-context"
import { format } from "date-fns"
import { AlertTriangle, CheckCircle, XCircle } from "lucide-react"
import Link from "next/link"
import { quizData } from "@/lib/quiz-data"

export default function ResultsPage() {
  const { isAuthenticated, quizResults } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/sign-in")
    }
  }, [isAuthenticated, router])

  if (!isAuthenticated) {
    return null
  }

  // Sort results by date (newest first)
  const sortedResults = [...quizResults].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  // Get topic title from ID
  const getTopicTitle = (topicId: string) => {
    const topic = quizData.find((t) => t.id === topicId)
    return topic ? topic.title : topicId
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">My Quiz Results</h1>

        {sortedResults.length === 0 ? (
          <div className="text-center py-12 border rounded-lg">
            <h3 className="text-xl font-medium mb-2">No quiz results yet</h3>
            <p className="text-muted-foreground mb-6">You haven't taken any quizzes yet.</p>
            <Link href="/">
              <Button>Take a Quiz</Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {sortedResults.map((result, index) => (
              <Card key={index}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-xl">{getTopicTitle(result.topicId)}</CardTitle>
                    <div className="text-sm text-muted-foreground">
                      {format(new Date(result.date), "MMM d, yyyy 'at' h:mm a")}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="flex items-center gap-2">
                      {result.disqualified ? (
                        <AlertTriangle className="h-5 w-5 text-red-500" />
                      ) : result.score / result.totalQuestions >= 0.7 ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : (
                        <XCircle className="h-5 w-5 text-orange-500" />
                      )}
                      <div>
                        {result.disqualified ? (
                          <p className="font-medium text-red-500">Disqualified</p>
                        ) : (
                          <p className="font-medium">
                            Score: {result.score}/{result.totalQuestions} (
                            {Math.round((result.score / result.totalQuestions) * 100)}%)
                          </p>
                        )}
                        <p className="text-sm text-muted-foreground">
                          {result.disqualified
                            ? "Quiz terminated due to tab switching"
                            : result.completed
                              ? "Quiz completed successfully"
                              : "Quiz not completed"}
                        </p>
                      </div>
                    </div>
                    <Link href={`/quiz/${result.topicId}`}>
                      <Button variant="outline" size="sm">
                        Retry Quiz
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
