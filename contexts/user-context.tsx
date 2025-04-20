"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type UserRole = "student" | "admin"

type User = {
  name: string
  role: UserRole
} | null

type QuizResult = {
  userId: string
  userName: string
  topicId: string
  score: number
  totalQuestions: number
  date: string
  completed: boolean
  disqualified: boolean
}

interface UserContextType {
  user: User
  signIn: (name: string, isAdmin: boolean) => void
  signOut: () => void
  isAuthenticated: boolean
  isAdmin: boolean
  quizResults: QuizResult[]
  addQuizResult: (result: Omit<QuizResult, "userId" | "userName">) => void
  getAllResults: () => QuizResult[]
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>(null)
  const [quizResults, setQuizResults] = useState<QuizResult[]>([])
  const [allResults, setAllResults] = useState<QuizResult[]>([])

  // Load user data from localStorage on initial render
  useEffect(() => {
    const storedUser = localStorage.getItem("quizUser")
    const storedResults = localStorage.getItem("quizResults")
    const storedAllResults = localStorage.getItem("allQuizResults")

    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }

    if (storedResults) {
      setQuizResults(JSON.parse(storedResults))
    }

    if (storedAllResults) {
      setAllResults(JSON.parse(storedAllResults))
    }
  }, [])

  // Save user data to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("quizUser", JSON.stringify(user))
    } else {
      localStorage.removeItem("quizUser")
    }
  }, [user])

  // Save quiz results to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("quizResults", JSON.stringify(quizResults))
  }, [quizResults])

  // Save all results to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("allQuizResults", JSON.stringify(allResults))
  }, [allResults])

  const signIn = (name: string, isAdmin: boolean) => {
    const role = isAdmin ? "admin" : "student"
    setUser({ name, role })

    // If signing in as admin, load all results
    if (isAdmin) {
      // For admin, we load their personal results (if any) plus all results
      const personalResults = quizResults.filter((result) => result.userName === name)
      setQuizResults(personalResults)
    } else {
      // For students, filter to only show their results
      const userResults = allResults.filter((result) => result.userName === name)
      setQuizResults(userResults)
    }
  }

  const signOut = () => {
    setUser(null)
    setQuizResults([])
  }

  const addQuizResult = (result: Omit<QuizResult, "userId" | "userName">) => {
    if (!user) return

    const fullResult: QuizResult = {
      ...result,
      userId: user.name, // Using name as ID for simplicity
      userName: user.name,
    }

    // Add to user's personal results
    setQuizResults((prev) => [...prev, fullResult])

    // Add to all results for admin view
    setAllResults((prev) => [...prev, fullResult])
  }

  const getAllResults = () => {
    return allResults
  }

  return (
    <UserContext.Provider
      value={{
        user,
        signIn,
        signOut,
        isAuthenticated: !!user,
        isAdmin: user?.role === "admin",
        quizResults,
        addQuizResult,
        getAllResults,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
}
