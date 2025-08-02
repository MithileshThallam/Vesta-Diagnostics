import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { User, Booking, AdminStats } from "@/types/admin"
import type { MedicalTest } from "@/types/test"

interface AdminState {
  // UI State
  isUserMode: boolean
  activeSection: string

  // Data
  users: User[]
  bookings: Booking[]
  stats: AdminStats

  // Actions
  toggleUserMode: () => void
  setActiveSection: (section: string) => void

  // User Management
  addUser: (user: Omit<User, "id" | "createdAt">) => void
  updateUser: (id: string, updates: Partial<User>) => void
  deleteUser: (id: string) => void

  // Booking Management
  addBooking: (booking: Omit<Booking, "id" | "createdAt">) => void
  updateBooking: (id: string, updates: Partial<Booking>) => void
  deleteBooking: (id: string) => void

  // Test Management (extends existing test data)
  addTest: (test: Omit<MedicalTest, "id">) => void
  updateTest: (id: string, updates: Partial<MedicalTest>) => void
  deleteTest: (id: string) => void

  // Stats
  updateStats: () => void
}

// Mock data for demonstration
const mockUsers: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    phone: "+91 9876543210",
    role: "user",
    createdAt: "2024-01-15T10:30:00Z",
    lastLogin: "2024-02-01T14:20:00Z",
    status: "active",
  },
  {
    id: "2",
    name: "Sarah Wilson",
    email: "sarah@example.com",
    phone: "+91 9876543211",
    role: "sub-admin",
    createdAt: "2024-01-10T09:15:00Z",
    lastLogin: "2024-02-01T16:45:00Z",
    status: "active",
  },
  {
    id: "3",
    name: "Mike Johnson",
    email: "mike@example.com",
    phone: "+91 9876543212",
    role: "user",
    createdAt: "2024-01-20T11:00:00Z",
    lastLogin: "2024-01-31T12:30:00Z",
    status: "inactive",
  },
]

const mockBookings: Booking[] = [
  {
    id: "1",
    userId: "1",
    userName: "John Doe",
    testId: "complete-blood-count",
    testName: "Complete Blood Count (CBC)",
    price: 450,
    priceDisplay: "₹450",
    status: "confirmed",
    bookingDate: "2024-02-01T10:00:00Z",
    testDate: "2024-02-05T09:00:00Z",
    location: "Mumbai",
    createdAt: "2024-02-01T10:00:00Z",
  },
  {
    id: "2",
    userId: "3",
    userName: "Mike Johnson",
    testId: "mri-brain",
    testName: "MRI Brain Scan",
    price: 8500,
    priceDisplay: "₹8,500",
    status: "pending",
    bookingDate: "2024-02-01T14:30:00Z",
    testDate: "2024-02-08T11:00:00Z",
    location: "Delhi NCR",
    createdAt: "2024-02-01T14:30:00Z",
  },
]

export const useAdminStore = create<AdminState>()(
  persist(
    (set, get) => ({
      // Initial state
      isUserMode: false,
      activeSection: "dashboard",
      users: mockUsers,
      bookings: mockBookings,
      stats: {
        totalUsers: 0,
        totalSubAdmins: 0,
        totalBookings: 0,
        totalTests: 0,
        recentBookings: 0,
        pendingBookings: 0,
      },

      // UI Actions
      toggleUserMode: () => set((state) => ({ isUserMode: !state.isUserMode })),
      setActiveSection: (section) => set({ activeSection: section }),

      // User Management
      addUser: (userData) => {
        const newUser: User = {
          ...userData,
          id: Date.now().toString(),
          createdAt: new Date().toISOString(),
        }
        set((state) => ({
          users: [...state.users, newUser],
        }))
        get().updateStats()
      },

      updateUser: (id, updates) => {
        set((state) => ({
          users: state.users.map((user) => (user.id === id ? { ...user, ...updates } : user)),
        }))
        get().updateStats()
      },

      deleteUser: (id) => {
        set((state) => ({
          users: state.users.filter((user) => user.id !== id),
          bookings: state.bookings.filter((booking) => booking.userId !== id),
        }))
        get().updateStats()
      },

      // Booking Management
      addBooking: (bookingData) => {
        const newBooking: Booking = {
          ...bookingData,
          id: Date.now().toString(),
          createdAt: new Date().toISOString(),
        }
        set((state) => ({
          bookings: [...state.bookings, newBooking],
        }))
        get().updateStats()
      },

      updateBooking: (id, updates) => {
        set((state) => ({
          bookings: state.bookings.map((booking) => (booking.id === id ? { ...booking, ...updates } : booking)),
        }))
        get().updateStats()
      },

      deleteBooking: (id) => {
        set((state) => ({
          bookings: state.bookings.filter((booking) => booking.id !== id),
        }))
        get().updateStats()
      },

      // Test Management (placeholder - would integrate with existing test data)
      addTest: (testData) => {
        // This would integrate with the existing test management system
        console.log("Adding test:", testData)
        get().updateStats()
      },

      updateTest: (id, updates) => {
        // This would integrate with the existing test management system
        console.log("Updating test:", id, updates)
      },

      deleteTest: (id) => {
        // This would integrate with the existing test management system
        console.log("Deleting test:", id)
        get().updateStats()
      },

      // Stats calculation
      updateStats: () => {
        const { users, bookings } = get()
        const now = new Date()
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)

        set({
          stats: {
            totalUsers: users.filter((u) => u.role === "user").length,
            totalSubAdmins: users.filter((u) => u.role === "sub-admin").length,
            totalBookings: bookings.length,
            totalTests: 25, // This would come from the test data
            recentBookings: bookings.filter((b) => new Date(b.createdAt) > weekAgo).length,
            pendingBookings: bookings.filter((b) => b.status === "pending").length,
          },
        })
      },
    }),
    {
      name: "vesta-admin-store",
      partialize: (state) => ({
        users: state.users,
        bookings: state.bookings,
        isUserMode: state.isUserMode,
        activeSection: state.activeSection,
      }),
    },
  ),
)

// Initialize stats on store creation
setTimeout(() => {
  useAdminStore.getState().updateStats()
}, 100)
