import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface User {
  name: string
  phone: string
  role: "patient" | "admin"
}

interface UserState extends User {
  isAuthenticated: boolean
  setUser: (user: User) => void
  updateUser: (userData: Partial<User>) => void
  logout: () => void
  clearUser: () => void
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      name: "",
      phone: "",
      role: "patient",
      isAuthenticated: false,

      setUser: (user: User) => {
        set({
          name: user.name,
          phone: user.phone,
          role: user.role,
          isAuthenticated: true,
        })
      },

      updateUser: (userData: Partial<User>) => {
        set((state) => ({
          ...state,
          ...userData,
        }))
      },

      logout: async () => {
        try {
          // Call logout endpoint to clear httpOnly cookie
          await fetch("http://localhost:5000/api/auth/logout", {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          })
        } catch (error) {
          // Fail silently - we still want to clear local state
          if (process.env.NODE_ENV === "development") {
            console.warn("Logout request failed:", error)
          }
        } finally {
          // Clear user state regardless of API call result
          set({
            name: "",
            phone: "",
            role: "patient",
            isAuthenticated: false,
          })
        }
      },

      clearUser: () => {
        set({
          name: "",
          phone: "",
          role: "patient",
          isAuthenticated: false,
        })
      },
    }),
    {
      name: "vesta-user",
      // Don't persist sensitive data - only basic user info
      partialize: (state) => ({
        name: state.name,
        phone: state.phone,
        role: state.role,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
)
