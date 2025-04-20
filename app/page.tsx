"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { BookOpen, Code, Cpu, ActivityIcon as Function } from "lucide-react"
import { useUser } from "@/contexts/user-context"

export default function Home() {
  const { isAuthenticated, isAdmin } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/sign-in")
      return
    }

    // Redirect admins to the dashboard
    if (isAdmin) {
      router.push("/admin/dashboard")
    }
  }, [isAuthenticated, isAdmin, router])

  if (!isAuthenticated || isAdmin) {
    return null // Don't render anything while redirecting
  }

  const topics = [
    {
      id: "mvc",
      title: "Multivariable Calculus",
      description: "Test your knowledge of partial derivatives, double integrals, gradient, and more.",
      icon: <Function className="h-8 w-8" />,
      color: "bg-blue-100 dark:bg-blue-900",
      textColor: "text-blue-500 dark:text-blue-300",
    },
    {
      id: "pf",
      title: "Programming Fundamentals",
      description: "Questions on variables, loops, conditionals, arrays, functions, and recursion.",
      icon: <Code className="h-8 w-8" />,
      color: "bg-green-100 dark:bg-green-900",
      textColor: "text-green-500 dark:text-green-300",
    },
    {
      id: "oop",
      title: "Object-Oriented Programming",
      description: "Explore classes, objects, inheritance, polymorphism, encapsulation, and abstraction.",
      icon: <BookOpen className="h-8 w-8" />,
      color: "bg-purple-100 dark:bg-purple-900",
      textColor: "text-purple-500 dark:text-purple-300",
    },
    {
      id: "dld",
      title: "Digital Logic Design",
      description: "Test your knowledge of logic gates, flip-flops, truth tables, and Boolean algebra.",
      icon: <Cpu className="h-8 w-8" />,
      color: "bg-orange-100 dark:bg-orange-900",
      textColor: "text-orange-500 dark:text-orange-300",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Quiz Webapp</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Test your knowledge in various Computer Science and Mathematics topics with our interactive quizzes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {topics.map((topic) => (
          <Card key={topic.id} className="overflow-hidden">
            <CardHeader className={`${topic.color}`}>
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-full bg-white dark:bg-gray-800 ${topic.textColor}`}>{topic.icon}</div>
                <div>
                  <CardTitle className="text-xl">{topic.title}</CardTitle>
                  <CardDescription className="text-gray-700 dark:text-gray-300">
                    10 multiple-choice questions
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="text-muted-foreground">{topic.description}</p>
            </CardContent>
            <CardFooter>
              <Link href={`/quiz/${topic.id}`} className="w-full">
                <Button className="w-full">Start Quiz</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
