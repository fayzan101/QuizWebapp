"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useUser } from "@/contexts/user-context"
import { BookOpen, Lock } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function SignInPage() {
  const [studentName, setStudentName] = useState("")
  const [adminName, setAdminName] = useState("")
  const [adminPassword, setAdminPassword] = useState("")
  const [errors, setErrors] = useState({ studentName: "", adminName: "", adminPassword: "" })
  const [activeTab, setActiveTab] = useState("student")
  const { signIn } = useUser()
  const router = useRouter()

  // Admin password - in a real app, this would be handled securely on the server
  const ADMIN_PASSWORD = "googleit0!"

  const validateStudentForm = () => {
    let valid = true
    const newErrors = { ...errors, studentName: "" }

    if (!studentName.trim()) {
      newErrors.studentName = "Name is required"
      valid = false
    }

    setErrors(newErrors)
    return valid
  }

  const validateAdminForm = () => {
    let valid = true
    const newErrors = { ...errors, adminName: "", adminPassword: "" }

    if (!adminName.trim()) {
      newErrors.adminName = "Name is required"
      valid = false
    }

    if (!adminPassword) {
      newErrors.adminPassword = "Password is required"
      valid = false
    } else if (adminPassword !== ADMIN_PASSWORD) {
      newErrors.adminPassword = "Invalid password"
      valid = false
    }

    setErrors(newErrors)
    return valid
  }

  const handleStudentSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (validateStudentForm()) {
      signIn(studentName, false)
      router.push("/")
    }
  }

  const handleAdminSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (validateAdminForm()) {
      signIn(adminName, true)
      router.push("/admin/dashboard")
    }
  }

  return (
    <div className="container mx-auto px-4 py-12 flex items-center justify-center min-h-[calc(100vh-4rem)]">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit mb-4">
            <BookOpen className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-2xl">Sign In to Quiz Webapp</CardTitle>
          <CardDescription>Enter your information to start taking quizzes</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="student" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="student">Student</TabsTrigger>
              <TabsTrigger value="admin">Admin</TabsTrigger>
            </TabsList>
            <TabsContent value="student">
              <form onSubmit={handleStudentSubmit} className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="studentName">Your Name</Label>
                  <Input
                    id="studentName"
                    placeholder="Enter your name"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                  />
                  {errors.studentName && <p className="text-sm text-red-500">{errors.studentName}</p>}
                </div>
                <Button type="submit" className="w-full">
                  Sign In as Student
                </Button>
              </form>
            </TabsContent>
            <TabsContent value="admin">
              <form onSubmit={handleAdminSubmit} className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="adminName">Admin Name</Label>
                  <Input
                    id="adminName"
                    placeholder="Enter admin name"
                    value={adminName}
                    onChange={(e) => setAdminName(e.target.value)}
                  />
                  {errors.adminName && <p className="text-sm text-red-500">{errors.adminName}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="adminPassword">Admin Password</Label>
                  <div className="relative">
                    <Input
                      id="adminPassword"
                      type="password"
                      placeholder="Enter admin password"
                      value={adminPassword}
                      onChange={(e) => setAdminPassword(e.target.value)}
                    />
                    <Lock className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  </div>
                  {errors.adminPassword && <p className="text-sm text-red-500">{errors.adminPassword}</p>}
                </div>
                <Button type="submit" className="w-full">
                  Sign In as Admin
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
