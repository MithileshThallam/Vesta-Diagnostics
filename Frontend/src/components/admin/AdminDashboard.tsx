"use client"
import { Users, Calendar, TestTube, BarChart3, UserPlus, Activity, TrendingUp, Clock } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useAdminStore } from "@/stores/adminStore"

const AdminDashboard = () => {
  const { stats, setActiveSection } = useAdminStore()

  const quickActions = [
    {
      title: "Create Test",
      description: "Add new diagnostic test",
      icon: TestTube,
      action: () => setActiveSection("tests"),
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Add Sub-admin",
      description: "Create sub-admin account",
      icon: UserPlus,
      action: () => setActiveSection("users"),
      color: "from-purple-500 to-pink-500",
    },
    {
      title: "Manage Users",
      description: "View and manage users",
      icon: Users,
      action: () => setActiveSection("users"),
      color: "from-green-500 to-emerald-500",
    },
    {
      title: "View Bookings",
      description: "Monitor all bookings",
      icon: Calendar,
      action: () => setActiveSection("bookings"),
      color: "from-orange-500 to-red-500",
    },
  ]

  const metrics = [
    {
      title: "Total Users",
      value: stats.totalUsers,
      icon: Users,
      change: "+12%",
      changeType: "positive" as const,
      color: "from-blue-500 to-blue-600",
    },
    {
      title: "Sub-Admins",
      value: stats.totalSubAdmins,
      icon: UserPlus,
      change: "+2",
      changeType: "positive" as const,
      color: "from-purple-500 to-purple-600",
    },
    {
      title: "Total Bookings",
      value: stats.totalBookings,
      icon: Calendar,
      change: "+8%",
      changeType: "positive" as const,
      color: "from-green-500 to-green-600",
    },
    {
      title: "Available Tests",
      value: stats.totalTests,
      icon: TestTube,
      change: "+3",
      changeType: "positive" as const,
      color: "from-orange-500 to-orange-600",
    },
  ]

  const recentActivity = [
    {
      type: "booking",
      message: "New booking for MRI Brain Scan",
      time: "2 minutes ago",
      status: "pending",
    },
    {
      type: "user",
      message: "New user registration",
      time: "15 minutes ago",
      status: "active",
    },
    {
      type: "test",
      message: "Test parameters updated",
      time: "1 hour ago",
      status: "completed",
    },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
            Mission Control
          </h1>
          <p className="text-slate-400 mt-2">Advanced diagnostic system oversight</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-green-400">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-sm">System Online</span>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <Card
            key={metric.title}
            className="relative overflow-hidden border-0 bg-gradient-to-br from-slate-900/50 to-slate-800/50 backdrop-blur-xl border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-500 group"
          >
            <div
              className="absolute inset-0 bg-gradient-to-br opacity-10 group-hover:opacity-20 transition-opacity duration-500"
              style={{
                background: `linear-gradient(135deg, ${metric.color.split(" ")[1]}, ${metric.color.split(" ")[3]})`,
              }}
            />

            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
              <CardTitle className="text-sm font-medium text-slate-300">{metric.title}</CardTitle>
              <div className={`p-2 rounded-lg bg-gradient-to-r ${metric.color} shadow-lg`}>
                <metric.icon className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="text-3xl font-bold text-white mb-1">{metric.value}</div>
              <div
                className={`text-sm flex items-center gap-1 ${
                  metric.changeType === "positive" ? "text-green-400" : "text-red-400"
                }`}
              >
                <TrendingUp className="h-3 w-3" />
                {metric.change} from last month
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card className="border-0 bg-gradient-to-br from-slate-900/50 to-slate-800/50 backdrop-blur-xl border border-slate-700/50">
        <CardHeader>
          <CardTitle className="text-xl text-white flex items-center gap-2">
            <Activity className="h-5 w-5 text-cyan-400" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <Button
                key={action.title}
                onClick={action.action}
                className={`h-auto p-6 bg-gradient-to-r ${action.color} hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl border-0 group`}
                variant="default"
              >
                <div className="flex flex-col items-center gap-3 text-white">
                  <action.icon className="h-8 w-8 group-hover:scale-110 transition-transform duration-300" />
                  <div className="text-center">
                    <div className="font-semibold">{action.title}</div>
                    <div className="text-xs opacity-90">{action.description}</div>
                  </div>
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity & System Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card className="border-0 bg-gradient-to-br from-slate-900/50 to-slate-800/50 backdrop-blur-xl border border-slate-700/50">
          <CardHeader>
            <CardTitle className="text-xl text-white flex items-center gap-2">
              <Clock className="h-5 w-5 text-green-400" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-3 rounded-lg bg-slate-800/50 border border-slate-700/50"
                >
                  <div
                    className={`w-2 h-2 rounded-full ${
                      activity.status === "pending"
                        ? "bg-yellow-400"
                        : activity.status === "active"
                          ? "bg-green-400"
                          : "bg-blue-400"
                    } animate-pulse`}
                  />
                  <div className="flex-1">
                    <p className="text-white text-sm">{activity.message}</p>
                    <p className="text-slate-400 text-xs">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* System Status */}
        <Card className="border-0 bg-gradient-to-br from-slate-900/50 to-slate-800/50 backdrop-blur-xl border border-slate-700/50">
          <CardHeader>
            <CardTitle className="text-xl text-white flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-purple-400" />
              System Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-slate-300">Database</span>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-green-400 text-sm">Online</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-300">API Services</span>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-green-400 text-sm">Operational</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-300">Payment Gateway</span>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
                  <span className="text-yellow-400 text-sm">Maintenance</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-300">Notification Service</span>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-green-400 text-sm">Active</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default AdminDashboard
