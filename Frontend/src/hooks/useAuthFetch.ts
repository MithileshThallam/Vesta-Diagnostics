"use client"

import { useEffect } from "react"
import { useUserStore } from "@/store/userStore"

export const useAuthFetch = () => {
  const setUser = useUserStore((state) => state.setUser)
  const clearUser = useUserStore((state) => state.clearUser)

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch("/api/auth/user", {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        })

        if (response.ok) {
          const userData = await response.json()

          // Validate required fields
          if (userData.name && userData.phone && userData.role) {
            setUser({
              name: userData.name,
              phone: userData.phone,
              role: userData.role,
            })

            if (process.env.NODE_ENV === "development") {
              console.log("User authenticated successfully:", userData.name)
            }
          } else {
            throw new Error("Invalid user data structure")
          }
        } else {
          // Not authenticated or invalid token - clear any stale user data
          clearUser()

          if (process.env.NODE_ENV === "development") {
            console.log("User not authenticated or token invalid")
          }
        }
      } catch (error) {
        // Clear user data on any error
        clearUser()

        // Only log in development
        if (process.env.NODE_ENV === "development") {
          console.warn("Auth fetch failed:", error)
        }
      }
    }

    fetchUserDetails()
  }, [setUser, clearUser])
}
