import { redirect } from "next/navigation"
import { getCurrentUser } from "@/lib/auth"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { AnalyticsOverview } from "@/components/analytics/analytics-overview"
import { TaskAnalytics } from "@/components/analytics/task-analytics"
import { TeamPerformance } from "@/components/analytics/team-performance"
import { ProjectProgress } from "@/components/analytics/project-progress"

export default async function AnalyticsPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/login")
  }

  // Only admins and managers can access full analytics
  if (user.role === "member") {
    redirect("/dashboard")
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader user={user} />
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Analytics Dashboard</h1>
            <p className="text-muted-foreground mt-2">Track team performance and project progress.</p>
          </div>

          <AnalyticsOverview userRole={user.role} />
          <TaskAnalytics userRole={user.role} />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <TeamPerformance userRole={user.role} />
            <ProjectProgress userRole={user.role} />
          </div>
        </div>
      </main>
    </div>
  )
}
