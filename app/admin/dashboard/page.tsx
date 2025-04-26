"use client"

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useUser } from "@/contexts/user-context"
import { format } from "date-fns"
import { AlertTriangle, CheckCircle, XCircle, Search, Download, FileQuestion } from "lucide-react"
import Link from "next/link"
import { quizData } from "@/lib/quiz-data"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

import { getAllQuizResults } from "@/lib/firebase/firebase";
export default async function AdminDashboardPage() {
  const { isAuthenticated, isAdmin, getAllResults } = useUser()
    const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [topicFilter, setTopicFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [sortBy, setSortBy] = useState("date")
  const [sortOrder, setSortOrder] = useState("desc")

  useEffect(() => {
    if (!isAuthenticated || !isAdmin) {
      router.push("/sign-in")
    }
  }, [isAuthenticated, isAdmin, router])

    const quizResults = await getAllQuizResults()
    console.log(quizResults)

    if (!isAuthenticated || !isAdmin) {
    return null
  }

  const allResults = getAllResults()

  // Get topic title from ID
  const getTopicTitle = (topicId: string) => {
    const topic = quizData.find((t) => t.id === topicId)
    return topic ? topic.title : topicId
  }

  // Filter and sort results
  const filteredResults = allResults.filter((result) => {
    const matchesSearch = result.userName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesTopic = topicFilter === "all" || result.topicId === topicFilter
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "passed" && result.score / result.totalQuestions >= 0.7 && !result.disqualified) ||
      (statusFilter === "failed" && result.score / result.totalQuestions < 0.7 && !result.disqualified) ||
      (statusFilter === "disqualified" && result.disqualified)

    return matchesSearch && matchesTopic && matchesStatus
  })

  // Sort results
  const sortedResults = [...filteredResults].sort((a, b) => {
    if (sortBy === "date") {
      return sortOrder === "asc"
        ? new Date(a.date).getTime() - new Date(b.date).getTime()
        : new Date(b.date).getTime() - new Date(a.date).getTime()
    } else if (sortBy === "name") {
      return sortOrder === "asc" ? a.userName.localeCompare(b.userName) : b.userName.localeCompare(a.userName)
    } else if (sortBy === "score") {
      const scoreA = a.disqualified ? -1 : a.score / a.totalQuestions
      const scoreB = b.disqualified ? -1 : b.score / b.totalQuestions
      return sortOrder === "asc" ? scoreA - scoreB : scoreB - scoreA
    }
    return 0
  })

  // Calculate statistics
  const totalQuizzes = allResults.length
  const totalStudents = [...new Set(allResults.map((r) => r.userName))].length
  const passedQuizzes = allResults.filter((r) => !r.disqualified && r.score / r.totalQuestions >= 0.7).length
  const disqualifiedQuizzes = allResults.filter((r) => r.disqualified).length

  // Export results as CSV
  const exportCSV = () => {
    const headers = ["Student Name", "Topic", "Score", "Total Questions", "Percentage", "Status", "Date"]
    const rows = sortedResults.map((r) => [
      r.userName,
      getTopicTitle(r.topicId),
      r.disqualified ? "0" : r.score.toString(),
      r.totalQuestions.toString(),
      r.disqualified ? "0%" : `${Math.round((r.score / r.totalQuestions) * 100)}%`,
      r.disqualified ? "Disqualified" : r.score / r.totalQuestions >= 0.7 ? "Passed" : "Failed",
      format(new Date(r.date), "MMM d, yyyy 'at' h:mm a"),
    ])

    const csvContent = [headers.join(","), ...rows.map((row) => row.join(","))].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.setAttribute("href", url)
    link.setAttribute("download", `quiz_results_${format(new Date(), "yyyy-MM-dd")}.csv`)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-7xl mx-auto">
        Quiz Results:
        <div>{JSON.stringify(quizResults)}</div>
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <Link href="/admin/questions">
            <Button>
              <FileQuestion className="mr-2 h-4 w-4" />
              Manage Questions
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Quizzes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalQuizzes}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Students</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalStudents}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Passed Quizzes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{passedQuizzes}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Disqualified</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{disqualifiedQuizzes}</div>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Quiz Results</CardTitle>
            <CardDescription>View and filter all student quiz results</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by student name"
                  className="pl-9"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Select value={topicFilter} onValueChange={setTopicFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by topic" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Topics</SelectItem>
                    {quizData.map((topic) => (
                      <SelectItem key={topic.id} value={topic.id}>
                        {topic.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="passed">Passed</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                    <SelectItem value="disqualified">Disqualified</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" onClick={exportCSV}>
                  <Download className="h-4 w-4 mr-2" />
                  Export CSV
                </Button>
              </div>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead
                      className="w-[200px] cursor-pointer"
                      onClick={() => {
                        setSortBy("name")
                        setSortOrder(sortOrder === "asc" && sortBy === "name" ? "desc" : "asc")
                      }}
                    >
                      Student Name {sortBy === "name" && (sortOrder === "asc" ? "↑" : "↓")}
                    </TableHead>
                    <TableHead>Topic</TableHead>
                    <TableHead
                      className="cursor-pointer"
                      onClick={() => {
                        setSortBy("score")
                        setSortOrder(sortOrder === "asc" && sortBy === "score" ? "desc" : "asc")
                      }}
                    >
                      Score {sortBy === "score" && (sortOrder === "asc" ? "↑" : "↓")}
                    </TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead
                      className="cursor-pointer"
                      onClick={() => {
                        setSortBy("date")
                        setSortOrder(sortOrder === "asc" && sortBy === "date" ? "desc" : "asc")
                      }}
                    >
                      Date {sortBy === "date" && (sortOrder === "asc" ? "↑" : "↓")}
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedResults.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-4">
                        No results found
                      </TableCell>
                    </TableRow>
                  ) : (
                    sortedResults.map((result, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{result.userName}</TableCell>
                        <TableCell>{getTopicTitle(result.topicId)}</TableCell>
                        <TableCell>
                          {result.disqualified ? (
                            "0"
                          ) : (
                            <>
                              {result.score}/{result.totalQuestions} (
                              {Math.round((result.score / result.totalQuestions) * 100)}%)
                            </>
                          )}
                        </TableCell>
                        <TableCell>
                          {result.disqualified ? (
                            <Badge variant="destructive" className="flex items-center gap-1 w-fit">
                              <AlertTriangle className="h-3 w-3" />
                              Disqualified
                            </Badge>
                          ) : result.score / result.totalQuestions >= 0.7 ? (
                            <Badge variant="default" className="bg-green-500 flex items-center gap-1 w-fit">
                              <CheckCircle className="h-3 w-3" />
                              Passed
                            </Badge>
                          ) : (
                            <Badge variant="secondary" className="flex items-center gap-1 w-fit">
                              <XCircle className="h-3 w-3" />
                              Failed
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell>{format(new Date(result.date), "MMM d, yyyy 'at' h:mm a")}</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
