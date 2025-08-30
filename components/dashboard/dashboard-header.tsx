"use client"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { LogOut, Settings, User, Users, BarChart3, CheckSquare, TrendingUp, FileText } from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import type { User as UserType } from "@/lib/auth"
// import { GlobalSearch } from "@/components/search/global-search"

interface DashboardHeaderProps {
  user: UserType
}

export function DashboardHeader({ user }: DashboardHeaderProps) {
  const router = useRouter()

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" })
    router.push("/login")
    router.refresh()
  }

  console.log("[v0] DashboardHeader rendering with user:", user)

  return (
    <header className="border-b border-border bg-card">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <Link href="/dashboard" className="text-xl font-semibold text-card-foreground hover:text-primary">
            Team Management
          </Link>
          <nav className="flex items-center space-x-4">
            <Link
              href="/dashboard"
              className="text-sm text-muted-foreground hover:text-foreground flex items-center space-x-1"
            >
              <BarChart3 className="h-4 w-4" />
              <span>Dashboard</span>
            </Link>
            <Link
              href="/teams"
              className="text-sm text-muted-foreground hover:text-foreground flex items-center space-x-1"
            >
              <Users className="h-4 w-4" />
              <span>Teams</span>
            </Link>
            <Link
              href="/tasks"
              className="text-sm text-muted-foreground hover:text-foreground flex items-center space-x-1"
            >
              <CheckSquare className="h-4 w-4" />
              <span>Tasks</span>
            </Link>
            {(user.role === "admin" || user.role === "manager") && (
              <Link
                href="/analytics"
                className="text-sm text-muted-foreground hover:text-foreground flex items-center space-x-1"
              >
                <TrendingUp className="h-4 w-4" />
                <span>Analytics</span>
              </Link>
            )}
            {(user.role === "admin" || user.role === "manager") && (
              <Link
                href="/reports"
                className="text-sm text-muted-foreground hover:text-foreground flex items-center space-x-1"
              >
                <FileText className="h-4 w-4" />
                <span>Reports</span>
              </Link>
            )}
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          {/* <GlobalSearch className="w-80" /> */}

          <span className="text-sm bg-accent text-accent-foreground px-2 py-1 rounded-md capitalize">{user.role}</span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>
                    {user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
              <DropdownMenuItem asChild>
                <Link href="/profile" className="flex items-center">
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/settings" className="flex items-center">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
