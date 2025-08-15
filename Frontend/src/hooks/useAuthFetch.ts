import { useEffect } from "react";
import { useUserStore } from "@/stores/userStore";

export const useAuthFetch = () => {
  const { setUser, clearUser, isAuthenticated } = useUserStore();

  useEffect(() => {
    const controller = new AbortController();
    let isMounted = true;

    const fetchUserDetails = async () => {
      try {
        const response = await fetch("https://vesta-diagnostics-w7rb.vercel.app/api/details/profile", {
          credentials: "include",
          signal: controller.signal
        });

        if (!isMounted) return;

        if (response.ok) {
          const result = await response.json();
          
          if (result.data) {
            setUser({
              name: result.data.name || 'User',
              phone: result.data.phone || '',
              role: result.data.role,
            });
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

    if (!isAuthenticated) {
      fetchUserDetails();
    }

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [setUser, clearUser, isAuthenticated]);
};