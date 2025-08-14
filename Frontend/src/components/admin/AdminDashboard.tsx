import { Users, Calendar, TestTube, BarChart3, UserPlus, Activity, TrendingUp } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useAdminStore } from "@/stores/adminStore"
import { useState, useEffect } from "react"
import { CreateSubAdminModal } from "./CreateSubAdminModal"
import { adminApiCall } from "@/utils/apiUtils"

export const AdminDashboard = () => {
  const { setActiveSection } = useAdminStore()
  const [showCreateSubAdmin, setShowCreateSubAdmin] = useState(false)
  const [stats, setStats] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true)
      setError(null)
      const res = await adminApiCall("/api/admin/overview")
      if (res.data) {
        setStats(res.data)
      } else {
        setError(res.error || "Failed to fetch dashboard stats")
      }
      setLoading(false)
    }
    fetchStats()
  }, [])

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

  const metrics = stats ? [
    {
      title: "Total Users",
      value: stats.totalUsers,
      icon: Users,
      color: "from-[hsl(15_96%_53%)] to-[hsl(15_96%_43%)]",
    },
    {
      title: "Sub-Admins",
      value: stats.totalSubAdmins,
      icon: UserPlus,
      color: "from-[hsl(248_81%_20%)] to-[hsl(248_81%_15%)]",
    },
    {
      title: "Total Bookings",
      value: stats.totalBookings,
      icon: Calendar,
      color: "from-[hsl(15_96%_53%/0.8)] to-[hsl(248_81%_20%/0.8)]",
    },
    {
      title: "Available Tests",
      value: stats.totalTests,
      icon: TestTube,
      color: "from-[hsl(248_81%_20%)] to-[hsl(15_96%_53%)]",
    },
  ] : []

  return (
    <div className="flex flex-col min-h-[calc(100vh-64px)] p-4 md:p-6 bg-[hsl(0_0%_98%)] dark:bg-[hsl(220_15%_12%)]">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[hsl(15_96%_53%)] to-[hsl(248_81%_20%)] bg-clip-text text-transparent">
            Mission Control
          </h1>
          <p className="text-[hsl(0_0%_45%)] dark:text-[hsl(0_0%_60%)] mt-1 text-sm md:text-base">
            Advanced diagnostic system oversight
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-[hsl(120_60%_50%)]">
            <div className="w-2 h-2 bg-[hsl(120_60%_50%)] rounded-full animate-pulse" />
            <span className="text-xs md:text-sm">System Online</span>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 space-y-4 overflow-y-auto">
        {/* Metrics Grid */}
        {loading ? (
          <div className="text-center py-12 text-[hsl(0_0%_45%)] dark:text-[hsl(0_0%_60%)] ">Loading dashboard...</div>
        ) : error ? (
          <div className="text-center py-12 text-[hsl(0_84%_60%)] border-2 border-red-500">{error}</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {metrics.map((metric) => (
              <Card
                key={metric.title}
                className="relative overflow-hidden bg-[hsl(0_0%_100%)] dark:bg-[hsl(220_15%_8%)] border border-[hsl(0_0%_90%)] dark:border-[hsl(215_15%_25%)] hover:border-[hsl(15_96%_53%/0.5)] transition-all duration-500 group shadow-soft hover:shadow-medium"
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
                  <div className="text-xl md:text-2xl font-bold text-[hsl(0_0%_20%)] dark:text-[hsl(0_0%_95%)] mb-1">
                    {metric.value}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Quick Actions */}
        <Card className="bg-[hsl(0_0%_100%)] dark:bg-[hsl(220_15%_8%)] border border-[hsl(0_0%_90%)] dark:border-[hsl(215_15%_25%)] shadow-soft">
          <CardHeader className="pb-2 p-4">
            <CardTitle className="text-base md:text-lg text-[hsl(0_0%_20%)] dark:text-[hsl(0_0%_95%)] flex items-center gap-2">
              <Activity className="h-4 w-4 text-[hsl(15_96%_53%)]" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {quickActions.map((action) => (
                <Button
                  key={action.title}
                  onClick={action.action}
                  className={`h-auto p-3 md:p-4 bg-gradient-to-r ${action.color} hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl border-0 group`}
                  variant="default"
                >
                  <div className="flex flex-col items-center gap-2 text-white">
                    <action.icon className="h-5 w-5 md:h-6 md:w-6 group-hover:scale-110 transition-transform duration-300" />
                    <div className="text-center">
                      <div className="font-semibold text-xs md:text-sm">{action.title}</div>
                      <div className="text-[10px] md:text-xs opacity-90">{action.description}</div>
                    </div>
                  </div>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* System Status */}
        <Card className="bg-[hsl(0_0%_100%)] dark:bg-[hsl(220_15%_8%)] border border-[hsl(0_0%_90%)] dark:border-[hsl(215_15%_25%)] shadow-soft">
          <CardHeader className="pb-2 p-4">
            <CardTitle className="text-base md:text-lg text-[hsl(0_0%_20%)] dark:text-[hsl(0_0%_95%)] flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-[hsl(248_81%_20%)]" />
              System Status
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="space-y-3">
              {[
                { label: "Database", status: "Online", color: "hsl(120_60%_50%)" },
                { label: "API Services", status: "Operational", color: "hsl(120_60%_50%)" },
                { label: "Payment Gateway", status: "Maintenance", color: "hsl(45_100%_50%)" },
                { label: "Notification Service", status: "Maintenance", color: "hsl(120_60%_50%)" },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between">
                  <span className="text-[hsl(0_0%_45%)] dark:text-[hsl(0_0%_60%)] text-xs md:text-sm">
                    {item.label}
                  </span>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-[hsl(120_60%_50%)] rounded-full animate-pulse" style={{ backgroundColor: item.color }} />
                    <span className="text-xs md:text-sm" style={{ color: item.color }}>
                      {item.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <CreateSubAdminModal
        open={showCreateSubAdmin}
        onClose={() => setShowCreateSubAdmin(false)}
        onSuccess={() => {
          // Optionally re-fetch stats
        }}
      />
    </div>
  )
}