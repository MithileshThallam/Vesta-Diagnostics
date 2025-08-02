"use client"

import { useEffect } from "react"
import { useUserStore } from "@/stores/userStore"

export const useAuthFetch = () => {
  const setUser = useUserStore((state) => state.setUser)
  const clearUser = useUserStore((state) => state.clearUser)

  useEffect(() => {
    const controller = new AbortController()
    const signal = controller.signal
    
    let isMounted = true

    const fetchUserDetails = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/details/profile", {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          signal
        })

        if (!isMounted) return

        if (response.ok) {
          const userData = await response.json()

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
          clearUser()
          if (process.env.NODE_ENV === "development") {
            console.log("User not authenticated or token invalid")
          }
        }
      } catch (error) {
        // Proper error type checking
        if (error instanceof Error) {
          if (error.name === 'AbortError') {
            return // expected abort, no need to handle
          }
          
          if (isMounted) {
            clearUser()
          }

          if (process.env.NODE_ENV === "development") {
            console.warn("Auth fetch failed:", error.message)
          }
        } else {
          // Handle non-Error objects
          if (isMounted) {
            clearUser()
          }

          if (process.env.NODE_ENV === "development") {
            console.warn("Auth fetch failed with unknown error type")
          }
        }
      }
    }

    fetchUserDetails()

    return () => {
      isMounted = false
      controller.abort()
    }
  }, [setUser, clearUser])
}