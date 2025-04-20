"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { Home, User, LogOut, BarChart, FileQuestion } from "lucide-react"
import { useUser } from "@/contexts/user-context"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export default function Navbar() {
  const pathname = usePathname()
  const isHome = pathname === "/"
  const { user, signOut, isAuthenticated, isAdmin } = useUser()
  const router = useRouter()

  const handleSignOut = () => {
    signOut()
    router.push("/sign-in")
  }

  return (
    <header className="fixed top-0 w-full border-b bg-background z-10">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href={isAdmin ? "/admin/dashboard" : "/"} className="font-bold text-xl flex items-center gap-2">
          <span className="hidden sm:inline">Quiz Webapp</span>
        </Link>

        <div className="flex items-center gap-4">
          {!isHome && !isAdmin && (
            <Link href="/">
              <Button variant="ghost" size="icon">
                <Home className="h-5 w-5" />
                <span className="sr-only">Home</span>
              </Button>
            </Link>
          )}

          {isAdmin && (
            <>
              <Link href="/admin/dashboard">
                <Button variant="ghost" size="icon">
                  <BarChart className="h-5 w-5" />
                  <span className="sr-only">Dashboard</span>
                </Button>
              </Link>
              <Link href="/admin/questions">
                <Button variant="ghost" size="icon">
                  <FileQuestion className="h-5 w-5" />
                  <span className="sr-only">Questions</span>
                </Button>
              </Link>
            </>
          )}

          <ModeToggle />

          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuLabel className="font-normal text-xs truncate">
                  {user?.name} {isAdmin && "(Admin)"}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {!isAdmin && (
                  <Link href="/results">
                    <DropdownMenuItem>
                      <User className="mr-2 h-4 w-4" />
                      <span>My Results</span>
                    </DropdownMenuItem>
                  </Link>
                )}
                {isAdmin && (
                  <>
                    <Link href="/admin/dashboard">
                      <DropdownMenuItem>
                        <BarChart className="mr-2 h-4 w-4" />
                        <span>Dashboard</span>
                      </DropdownMenuItem>
                    </Link>
                    <Link href="/admin/questions">
                      <DropdownMenuItem>
                        <FileQuestion className="mr-2 h-4 w-4" />
                        <span>Manage Questions</span>
                      </DropdownMenuItem>
                    </Link>
                  </>
                )}
                <DropdownMenuItem onClick={handleSignOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/sign-in">
              <Button size="sm">Sign In</Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}
