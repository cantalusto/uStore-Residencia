import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

interface RecentActivityProps {
  userRole: string
}

export function RecentActivity({ userRole }: RecentActivityProps) {
  // Mock data - replace with real data fetching
  const activities = [
    {
      id: 1,
      user: "John Doe",
      action: "completed task",
      target: "Update user interface",
      time: "2 hours ago",
      type: "task",
    },
    {
      id: 2,
      user: "Sarah Smith",
      action: "joined team",
      target: "Development Team",
      time: "4 hours ago",
      type: "team",
    },
    {
      id: 3,
      user: "Mike Johnson",
      action: "created task",
      target: "Fix login bug",
      time: "6 hours ago",
      type: "task",
    },
    {
      id: 4,
      user: "Emily Davis",
      action: "submitted report",
      target: "Weekly Performance",
      time: "1 day ago",
      type: "report",
    },
  ]

  const getTypeColor = (type: string) => {
    switch (type) {
      case "task":
        return "bg-blue-100 text-blue-800"
      case "team":
        return "bg-green-100 text-green-800"
      case "report":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-center space-x-4">
              <Avatar className="h-8 w-8">
                <AvatarFallback>
                  {activity.user
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <p className="text-sm">
                  <span className="font-medium">{activity.user}</span> {activity.action}{" "}
                  <span className="font-medium">{activity.target}</span>
                </p>
                <p className="text-xs text-muted-foreground">{activity.time}</p>
              </div>
              <Badge variant="secondary" className={getTypeColor(activity.type)}>
                {activity.type}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
