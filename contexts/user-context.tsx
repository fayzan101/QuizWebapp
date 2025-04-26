"use client"

import { createContext, useContext, useState, useEffect, type ReactNode, Dispatch, SetStateAction } from "react"
import { onSnapshot, collection, query } from "firebase/firestore"
import { db } from "@/lib/firebase/firebase"

type UserRole = "student" | "admin"

type User = {
  name: string
  role: UserRole
} | null

type QuizResult = {
  id: string
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
  addQuizResult: (result: QuizResult) => void
  getAllResults: () => QuizResult[]
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>(null)
  const [quizResults, setQuizResults] = useState<QuizResult[]>([])
  const [allResults, setAllResults] = useState<QuizResult[]>([])

  // Load user data on initial render
  useEffect(() => {
    const q = query(collection(db, "quizResults"))
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const results: QuizResult[] = []
      querySnapshot.forEach((doc) => {
        const data = doc.data()
        const id = doc.id
        ;(data.results as QuizResult[]).forEach((result: QuizResult) => {
          results.push({ ...result, id, userId: doc.id })
        })
      })
      setAllResults(results)
    })

    return () => unsubscribe()
  }, [user])

  const getUserResults = async (name: string, setQuizResults: Dispatch<SetStateAction<QuizResult[]>>) => {
    const userResults = allResults.filter((result) => result.userName === name)
    setQuizResults(userResults)
  }

  useEffect(() => {
    if (user) {
      getUserResults(user.name, setQuizResults)
    }
  }, [user, allResults])

  const signIn = (name: string, isAdmin: boolean) => {
    const role = isAdmin ? "admin" : "student"
    setUser({ name, role })

    const userResults = allResults.filter((result) => result.userName === name)
    setQuizResults(userResults)
  }

  const signOut = () => {
    setUser(null)
    setQuizResults([])
  }

  const addQuizResult = (result: QuizResult) => {
    if (!user) return

    const fullResult: QuizResult = {
        ...result,
      userName: user.name,
    }

    setQuizResults((prev) => [...prev, fullResult])
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
