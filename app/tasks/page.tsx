import { redirect } from "next/navigation"
import { getCurrentUser } from "@/lib/auth"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { TaskBoard } from "@/components/tasks/task-board"
import { CreateTaskButton } from "@/components/tasks/create-task-button"

export default async function TasksPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/login")
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader user={user} />
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Task Management</h1>
              <p className="text-muted-foreground mt-2">Create, assign, and track tasks across your team.</p>
            </div>
            <CreateTaskButton userRole={user.role} />
          </div>

          <TaskBoard userRole={user.role} userId={user.userId} />
        </div>
      </main>
    </div>
  )
}
