"use client"

import { Users, Calendar, TestTube, BarChart3, UserPlus, Activity, TrendingUp } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useAdminStore } from "@/stores/adminStore"
import { useState } from "react"
import { CreateSubAdminModal } from "./CreateSubAdminModal"
import { updateStats } from "@/utils/updateStats"

const AdminDashboard = () => {
  const { stats, setActiveSection } = useAdminStore()
  const [showCreateSubAdmin, setShowCreateSubAdmin] = useState(false)

  const quickActions = [
    {
      title: "Create Test",
      description: "Add new diagnostic test",
      icon: TestTube,
      action: () => setActiveSection("tests"),
      color: "from-[hsl(15_96%_53%)] to-[hsl(15_96%_43%)]",
    },
    {
      title: "Add Sub-admin",
      description: "Create sub-admin account",
      icon: UserPlus,
      action: () => setShowCreateSubAdmin(true),
      color: "from-[hsl(248_81%_20%)] to-[hsl(248_81%_15%)]",
    },
    {
      title: "View Bookings",
      description: "Monitor all bookings",
      icon: Calendar,
      action: () => setActiveSection("bookings"),
      color: "from-[hsl(248_81%_20%)] to-[hsl(15_96%_53%)]",
    },
  ]

  const metrics = [
    {
      title: "Total Users",
      value: stats.totalUsers,
      icon: Users,
      change: "+12%",
      changeType: "positive" as const,
      color: "from-[hsl(15_96%_53%)] to-[hsl(15_96%_43%)]",
    },
    {
      title: "Sub-Admins",
      value: stats.totalSubAdmins,
      icon: UserPlus,
      change: "+2",
      changeType: "positive" as const,
      color: "from-[hsl(248_81%_20%)] to-[hsl(248_81%_15%)]",
    },
    {
      title: "Total Bookings",
      value: stats.totalBookings,
      icon: Calendar,
      change: "+8%",
      changeType: "positive" as const,
      color: "from-[hsl(15_96%_53%/0.8)] to-[hsl(248_81%_20%/0.8)]",
    },
    {
      title: "Available Tests",
      value: stats.totalTests,
      icon: TestTube,
      change: "+3",
      changeType: "positive" as const,
      color: "from-[hsl(248_81%_20%)] to-[hsl(15_96%_53%)]",
    },
  ]

  return (
    <div className="space-y-4 min-h-screen p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-[hsl(15_96%_53%)] to-[hsl(248_81%_20%)] bg-clip-text text-transparent">
            Mission Control
          </h1>
          <p className="text-[hsl(0_0%_45%)] dark:text-[hsl(0_0%_60%)] mt-1">Advanced diagnostic system oversight</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-[hsl(120_60%_50%)]">
            <div className="w-2 h-2 bg-[hsl(120_60%_50%)] rounded-full animate-pulse" />
            <span className="text-sm">System Online</span>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        {metrics.map((metric) => (
          <Card
            key={metric.title}
            className="relative overflow-hidden border-0 bg-[hsl(0_0%_100%)] dark:bg-[hsl(220_15%_8%)] border border-[hsl(0_0%_90%)] dark:border-[hsl(215_15%_25%)] hover:border-[hsl(15_96%_53%/0.5)] transition-all duration-500 group shadow-soft hover:shadow-medium"
          >
            <div
              className="absolute inset-0 bg-gradient-to-br opacity-10 group-hover:opacity-20 transition-opacity duration-500"
              style={{
                background: `linear-gradient(135deg, hsl(15_96%_53%), hsl(248_81%_20%))`,
              }}
            />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 p-3 relative z-10">
              <CardTitle className="text-xs font-medium text-[hsl(0_0%_45%)] dark:text-[hsl(0_0%_60%)]">
                {metric.title}
              </CardTitle>
              <div className={`p-1.5 rounded-lg bg-gradient-to-r ${metric.color} shadow-lg`}>
                <metric.icon className="h-3 w-3 text-white" />
              </div>
            </CardHeader>
            <CardContent className="relative z-10 p-3 pt-0">
              <div className="text-2xl font-bold text-[hsl(0_0%_20%)] dark:text-[hsl(0_0%_95%)] mb-1">
                {metric.value}
              </div>
              <div
                className={`text-xs flex items-center gap-1 ${
                  metric.changeType === "positive" ? "text-[hsl(120_60%_50%)]" : "text-[hsl(0_84%_60%)]"
                }`}
              >
                <TrendingUp className="h-2.5 w-2.5" />
                {metric.change} from last month
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card className="border-0 bg-[hsl(0_0%_100%)] dark:bg-[hsl(220_15%_8%)] border border-[hsl(0_0%_90%)] dark:border-[hsl(215_15%_25%)] shadow-soft mb-4">
        <CardHeader className="pb-2 p-4">
          <CardTitle className="text-lg text-[hsl(0_0%_20%)] dark:text-[hsl(0_0%_95%)] flex items-center gap-2">
            <Activity className="h-4 w-4 text-[hsl(15_96%_53%)]" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {quickActions.map((action) => (
              <Button
                key={action.title}
                onClick={action.action}
                className={`h-auto p-4 bg-gradient-to-r ${action.color} hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl border-0 group`}
                variant="default"
              >
                <div className="flex flex-col items-center gap-2 text-white">
                  <action.icon className="h-6 w-6 group-hover:scale-110 transition-transform duration-300" />
                  <div className="text-center">
                    <div className="font-semibold text-sm">{action.title}</div>
                    <div className="text-xs opacity-90">{action.description}</div>
                  </div>
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Visual Separator */}
      <div className="border-t border-[hsl(0_0%_90%)] dark:border-[hsl(215_15%_25%)] my-4" />

      {/* System Status */}
      <Card className="border-0 bg-[hsl(0_0%_100%)] dark:bg-[hsl(220_15%_8%)] border border-[hsl(0_0%_90%)] dark:border-[hsl(215_15%_25%)] shadow-soft flex-1">
        <CardHeader className="pb-2 p-4">
          <CardTitle className="text-lg text-[hsl(0_0%_20%)] dark:text-[hsl(0_0%_95%)] flex items-center gap-2">
            <BarChart3 className="h-4 w-4 text-[hsl(248_81%_20%)]" />
            System Status
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[hsl(0_0%_45%)] dark:text-[hsl(0_0%_60%)] text-sm">Database</span>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[hsl(120_60%_50%)] rounded-full animate-pulse" />
                <span className="text-[hsl(120_60%_50%)] text-sm">Online</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[hsl(0_0%_45%)] dark:text-[hsl(0_0%_60%)] text-sm">API Services</span>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[hsl(120_60%_50%)] rounded-full animate-pulse" />
                <span className="text-[hsl(120_60%_50%)] text-sm">Operational</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[hsl(0_0%_45%)] dark:text-[hsl(0_0%_60%)] text-sm">Payment Gateway</span>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[hsl(45_100%_50%)] rounded-full animate-pulse" />
                <span className="text-[hsl(45_100%_50%)] text-sm">Maintenance</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[hsl(0_0%_45%)] dark:text-[hsl(0_0%_60%)] text-sm">Notification Service</span>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[hsl(120_60%_50%)] rounded-full animate-pulse" />
                <span className="text-[hsl(120_60%_50%)] text-sm">Active</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <CreateSubAdminModal
        open={showCreateSubAdmin}
        onClose={() => setShowCreateSubAdmin(false)}
        onSuccess={() => {
          updateStats()
        }}
      />
    </div>
  )
}

export default AdminDashboard
