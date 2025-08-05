"use client"
import {
  LayoutDashboard,
  Users,
  Calendar,
  TestTube,
  Settings,
  LogOut,
  ToggleLeft,
  ToggleRight,
  Zap,
  Shield,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAdminStore } from "@/stores/adminStore"
import { useUserStore } from "@/stores/userStore"
import AdminDashboard from "@/components/admin/AdminDashboard"
import BookingManagement from "@/components/admin/BookingManagement"
import TestManagement from "@/components/admin/TestManagement"
import Home from "./Home"

const AdminPanel = () => {
  const { isUserMode, activeSection, toggleUserMode, setActiveSection } = useAdminStore()
  const { logout } = useUserStore()

  const menuItems = [
    { id: "dashboard", label: "Mission Control", icon: LayoutDashboard },
    { id: "bookings", label: "Booking Nexus", icon: Calendar },
    { id: "tests", label: "Test Arsenal", icon: TestTube },
  ]

  const renderContent = () => {
    if (isUserMode) {
      return <Home />
    }

    switch (activeSection) {
      case "dashboard":
        return <AdminDashboard />
      case "bookings":
        return <BookingManagement />
      case "tests":
        return <TestManagement />
      default:
        return <AdminDashboard />
    }
  }

  if (isUserMode) {
    return (
      <div className="relative">
        {/* Floating Admin Toggle */}
        <div className="fixed top-4 right-4 z-50">
          <Button
            onClick={toggleUserMode}
            className="bg-gradient-to-r from-[hsl(15_96%_53%)] to-[hsl(248_81%_20%)] hover:from-[hsl(15_96%_48%)] hover:to-[hsl(248_81%_15%)] border-0 shadow-hover transition-all duration-300 rounded-full p-3"
          >
            <Shield className="h-5 w-5" />
          </Button>
        </div>
        <Home />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[hsl(0_0%_98%)] text-[hsl(0_0%_20%)] dark:bg-[hsl(220_15%_8%)] dark:text-[hsl(0_0%_95%)]">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-[hsl(15_96%_53%/0.1)] to-[hsl(248_81%_20%/0.1)] rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-[hsl(15_96%_53%/0.1)] to-[hsl(248_81%_20%/0.1)] rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <div className="flex h-screen relative z-10">
        {/* Sidebar */}
        <div className="w-80 bg-[hsl(0_0%_98%)] dark:bg-[hsl(220_15%_8%)] backdrop-blur-xl border-r border-[hsl(0_0%_90%)] dark:border-[hsl(215_15%_25%)] flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-[hsl(0_0%_90%)] dark:border-[hsl(215_15%_25%)]">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-[hsl(15_96%_53%)] to-[hsl(248_81%_20%)] rounded-xl flex items-center justify-center">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-[hsl(15_96%_53%)] to-[hsl(248_81%_20%)] bg-clip-text text-transparent">
                  VESTA CONTROL
                </h1>
                <p className="text-xs text-[hsl(0_0%_45%)] dark:text-[hsl(0_0%_60%)]">
                  Administrative Interface
                </p>
              </div>
            </div>

            {/* User Mode Toggle */}
            <div className="flex items-center justify-between p-3 bg-[hsl(0_0%_96%)] dark:bg-[hsl(215_15%_20%)] rounded-lg border border-[hsl(0_0%_90%)] dark:border-[hsl(215_15%_25%)]">
              <div className="flex items-center gap-2">
                {isUserMode ? (
                  <ToggleRight className="h-5 w-5 text-[hsl(15_96%_53%)]" />
                ) : (
                  <ToggleLeft className="h-5 w-5 text-[hsl(0_0%_45%)]" />
                )}
                <span className="text-sm font-medium">User Mode</span>
              </div>
              <Button
                onClick={toggleUserMode}
                variant="ghost"
                size="sm"
                className={`text-xs px-3 py-1 rounded-full transition-all duration-300 ${
                  isUserMode
                    ? "bg-[hsl(15_96%_53%/0.2)] text-[hsl(15_96%_53%)] hover:bg-[hsl(15_96%_53%/0.3)]"
                    : "bg-[hsl(0_0%_90%)] text-[hsl(0_0%_45%)] hover:bg-[hsl(0_0%_85%)] dark:bg-[hsl(215_15%_25%)] dark:text-[hsl(0_0%_60%)] dark:hover:bg-[hsl(215_15%_30%)]"
                }`}
              >
                {isUserMode ? "ON" : "OFF"}
              </Button>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex-1 p-4">
            <nav className="space-y-2">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 group ${
                    activeSection === item.id
                      ? "bg-gradient-to-r from-[hsl(15_96%_53%/0.1)] to-[hsl(248_81%_20%/0.1)] border border-[hsl(15_96%_53%/0.3)] text-[hsl(15_96%_53%)] dark:text-[hsl(15_90%_55%)]"
                      : "text-[hsl(0_0%_45%)] hover:text-[hsl(0_0%_20%)] hover:bg-[hsl(0_0%_96%)] border border-transparent dark:text-[hsl(0_0%_60%)] dark:hover:text-[hsl(0_0%_95%)] dark:hover:bg-[hsl(215_15%_20%)]"
                  }`}
                >
                  <item.icon
                    className={`h-5 w-5 transition-transform duration-300 ${
                      activeSection === item.id ? "scale-110" : "group-hover:scale-105"
                    }`}
                  />
                  <span className="font-medium">{item.label}</span>
                  {activeSection === item.id && (
                    <div className="ml-auto w-2 h-2 bg-[hsl(15_96%_53%)] dark:bg-[hsl(15_90%_55%)] rounded-full animate-pulse" />
                  )}
                </button>
              ))}
            </nav>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-[hsl(0_0%_90%)] dark:border-[hsl(215_15%_25%)]">
            <Button
              onClick={logout}
              variant="ghost"
              className="w-full flex items-center gap-3 px-4 py-3 text-[hsl(0_84%_60%)] hover:text-[hsl(0_84%_55%)] hover:bg-[hsl(0_84%_60%/0.1)] transition-all duration-300 dark:text-[hsl(0_62%_50%)] dark:hover:text-[hsl(0_62%_45%)] dark:hover:bg-[hsl(0_62%_50%/0.1)]"
            >
              <LogOut className="h-5 w-5" />
              <span>Disconnect</span>
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          <div className="p-8">{renderContent()}</div>
        </div>
      </div>
    </div>
  )
}

export default AdminPanel