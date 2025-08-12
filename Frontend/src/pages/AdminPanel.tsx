"use client"
import { useState, useEffect } from "react"
import {
  LayoutDashboard,
  Calendar,
  TestTube,
  LogOut,
  ToggleLeft,
  ToggleRight,
  Zap,
  Shield,
  UserPlus,
  Menu,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAdminStore } from "@/stores/adminStore"
import { useUserStore } from "@/stores/userStore"
import { AdminDashboard } from "@/components/admin/AdminDashboard"
import BookingManagement from "@/components/admin/BookingManagement"
import { TestManagement } from "@/components/admin/TestManagement"
import { CreateSubAdminModal } from "@/components/admin/CreateSubAdminModal"
import Home from "./Home"

interface MenuItem {
  id: string
  label: string
  icon: React.ComponentType<{ className?: string }>
  action?: () => void
}

const AdminPanel = () => {
  const { isUserMode, activeSection, toggleUserMode, setActiveSection } = useAdminStore()
  const { logout } = useUserStore()
  const [showCreateSubAdmin, setShowCreateSubAdmin] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const menuItems: MenuItem[] = [
    { id: "dashboard", label: "Mission Control", icon: LayoutDashboard },
    { id: "bookings", label: "Booking Nexus", icon: Calendar },
    { id: "tests", label: "Test Arsenal", icon: TestTube },
    { id: "create-sub-admin", label: "Create Sub-Admin", icon: UserPlus, action: () => setShowCreateSubAdmin(true) },
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

  // Close mobile menu when switching sections on mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

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

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-[hsl(0_0%_98%)] dark:bg-[hsl(220_15%_8%)] border-b border-[hsl(0_0%_90%)] dark:border-[hsl(215_15%_25%)] p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-[hsl(15_96%_53%)] to-[hsl(248_81%_20%)] rounded-xl flex items-center justify-center">
            <Zap className="h-5 w-5 text-white" />
          </div>
          <h1 className="text-lg font-bold bg-gradient-to-r from-[hsl(15_96%_53%)] to-[hsl(248_81%_20%)] bg-clip-text text-transparent">
            VESTA CONTROL
          </h1>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="text-[hsl(0_0%_45%)] dark:text-[hsl(0_0%_60%)]"
        >
          {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      <div className="flex flex-col lg:flex-row h-screen relative z-10 pt-16 lg:pt-0">
        {/* Sidebar - Mobile Overlay */}
        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}

        {/* Sidebar */}
        <div
          className={`fixed lg:static inset-y-0 left-0 z-40 w-72 lg:w-64 xl:w-80 bg-[hsl(0_0%_98%)] dark:bg-[hsl(220_15%_8%)] backdrop-blur-xl border-r border-[hsl(0_0%_90%)] dark:border-[hsl(215_15%_25%)] flex flex-col transition-transform duration-300 ease-in-out ${
            isMobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }`}
        >
          {/* Header */}
          <div className="p-4 lg:p-6 border-b border-[hsl(0_0%_90%)] dark:border-[hsl(215_15%_25%)]">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-[hsl(15_96%_53%)] to-[hsl(248_81%_20%)] rounded-xl flex items-center justify-center">
                <Zap className="h-5 w-5 lg:h-6 lg:w-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg lg:text-xl font-bold bg-gradient-to-r from-[hsl(15_96%_53%)] to-[hsl(248_81%_20%)] bg-clip-text text-transparent">
                  VESTA CONTROL
                </h1>
                <p className="text-xs text-[hsl(0_0%_45%)] dark:text-[hsl(0_0%_60%)]">
                  Administrative Interface
                </p>
              </div>
            </div>

            {/* User Mode Toggle */}
            <div className="flex items-center justify-between p-2 lg:p-3 bg-[hsl(0_0%_96%)] dark:bg-[hsl(215_15%_20%)] rounded-lg border border-[hsl(0_0%_90%)] dark:border-[hsl(215_15%_25%)]">
              <div className="flex items-center gap-2">
                {isUserMode ? (
                  <ToggleRight className="h-4 w-4 lg:h-5 lg:w-5 text-[hsl(15_96%_53%)]" />
                ) : (
                  <ToggleLeft className="h-4 w-4 lg:h-5 lg:w-5 text-[hsl(0_0%_45%)]" />
                )}
                <span className="text-sm font-medium">User Mode</span>
              </div>
              <Button
                onClick={toggleUserMode}
                variant="ghost"
                size="sm"
                className={`text-xs px-2 py-0.5 lg:px-3 lg:py-1 rounded-full transition-all duration-300 ${
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
          <div className="flex-1 p-3 lg:p-4 overflow-y-auto">
            <nav className="space-y-1 lg:space-y-2">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    if (item.action) {
                      item.action()
                    } else {
                      setActiveSection(item.id)
                    }
                    if (window.innerWidth < 1024) setIsMobileMenuOpen(false)
                  }}
                  className={`w-full flex items-center gap-2 lg:gap-3 px-3 py-2 lg:px-4 lg:py-3 rounded-lg transition-all duration-300 group ${
                    activeSection === item.id
                      ? "bg-gradient-to-r from-[hsl(15_96%_53%/0.1)] to-[hsl(248_81%_20%/0.1)] border border-[hsl(15_96%_53%/0.3)] text-[hsl(15_96%_53%)] dark:text-[hsl(15_90%_55%)]"
                      : "text-[hsl(0_0%_45%)] hover:text-[hsl(0_0%_20%)] hover:bg-[hsl(0_0%_96%)] border border-transparent dark:text-[hsl(0_0%_60%)] dark:hover:text-[hsl(0_0%_95%)] dark:hover:bg-[hsl(215_15%_20%)]"
                  }`}
                >
                  <item.icon
                    className={`h-4 w-4 lg:h-5 lg:w-5 transition-transform duration-300 ${
                      activeSection === item.id ? "scale-110" : "group-hover:scale-105"
                    }`}
                  />
                  <span className="font-medium text-sm lg:text-base">{item.label}</span>
                  {activeSection === item.id && (
                    <div className="ml-auto w-1.5 h-1.5 lg:w-2 lg:h-2 bg-[hsl(15_96%_53%)] dark:bg-[hsl(15_90%_55%)] rounded-full animate-pulse" />
                  )}
                </button>
              ))}
            </nav>
          </div>

          {/* Footer */}
          <div className="p-3 lg:p-4 border-t border-[hsl(0_0%_90%)] dark:border-[hsl(215_15%_25%)]">
            <Button
              onClick={logout}
              variant="ghost"
              className="w-full flex items-center gap-2 lg:gap-3 px-3 py-2 lg:px-4 lg:py-3 text-sm lg:text-base text-[hsl(0_84%_60%)] hover:text-[hsl(0_84%_55%)] hover:bg-[hsl(0_84%_60%/0.1)] transition-all duration-300 dark:text-[hsl(0_62%_50%)] dark:hover:text-[hsl(0_62%_45%)] dark:hover:bg-[hsl(0_62%_50%/0.1)]"
            >
              <LogOut className="h-4 w-4 lg:h-5 lg:w-5" />
              <span>Disconnect</span>
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          <div className="p-4 sm:p-6 lg:p-8">{renderContent()}</div>
        </div>
      </div>

      {/* Create Sub-Admin Modal */}
      <CreateSubAdminModal
        open={showCreateSubAdmin}
        onClose={() => setShowCreateSubAdmin(false)}
        onSuccess={() => {
          setShowCreateSubAdmin(false)
          setActiveSection("dashboard")
        }}
      />
    </div>
  )
}

export default AdminPanel