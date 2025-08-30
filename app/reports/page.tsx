import { Suspense } from "react"
import { redirect } from "next/navigation"
import { getCurrentUser } from "@/lib/auth"
import { ReportsOverview } from "@/components/reports/reports-overview"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"

export default async function ReportsPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/login")
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader user={user} />

      <div className="container mx-auto p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Reports</h1>
            <p className="text-muted-foreground">Generate and export team performance reports</p>
          </div>
        </div>

        <Suspense fallback={<div className="text-foreground">Loading reports...</div>}>
          <ReportsOverview />
        </Suspense>
      </div>
    </div>
  )
}
