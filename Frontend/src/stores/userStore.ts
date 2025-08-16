import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface User {
  name: string
  phone: string
  role: "user" | "admin" | "sub-admin"
}

interface UserState {
  name: string
  phone: string
  role: "user" | "admin" | "sub-admin"
  isAuthenticated: boolean
  setUser: (user: User) => void
  updateUser: (userData: Partial<User>) => void
  logout: () => Promise<void>
  clearUser: () => void
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      name: "",
      phone: "",
      role: "user",
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
          await fetch("https://vesta-diagnostics.vercel.app//api/auth/logout", {
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
            role: "user",
            isAuthenticated: false,
          })
        }
      },

      clearUser: () => {
        set({
          name: "",
          phone: "",
          role: "user",
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

// Export standalone actions for direct import
export const clearUser = () => useUserStore.getState().clearUser()
export const logout = () => useUserStore.getState().logout()