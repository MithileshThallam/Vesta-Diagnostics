import { useEffect } from "react";
import { useUserStore } from "@/stores/userStore";

export const useAuthFetch = () => {
  const { setUser, clearUser, isAuthenticated } = useUserStore();

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    
    let isMounted = true;

    const fetchUserDetails = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/details/profile", {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          signal
        });

        if (!isMounted) return;

        if (response.ok) {
          const userData = await response.json();

          if (userData?.name && userData?.phone && userData?.role) {
            setUser({
              name: userData.name,
              phone: userData.phone,
              role: userData.role,
            });
          } else {
            throw new Error("Invalid user data structure");
          }
        } else {
          clearUser();
        }
      } catch (error) {
        if (error instanceof Error && error.name !== 'AbortError' && isMounted) {
          clearUser();
        }
      }
    };

    // Only fetch if we don't already have authenticated user data
    if (!isAuthenticated) {
      fetchUserDetails();
    }

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [setUser, clearUser, isAuthenticated]);
};