import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useUserStore } from "@/stores/userStore";
import { Loader2 } from "lucide-react";

interface SuperAdminRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
}

export const SuperAdminRoute = ({ 
  children, 
  redirectTo = "/admin" 
}: SuperAdminRouteProps) => {
  const { isAuthenticated, role } = useUserStore();
  const [isLoading, setIsLoading] = useState(true);
  const [isValidating, setIsValidating] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const validateAuth = async () => {
      try {
        // If not authenticated, redirect immediately
        if (!isAuthenticated) {
          setIsLoading(false);
          return;
        }

        // Verify authentication with server
        const response = await fetch("https://vesta-diagnostics-w7rb.vercel.app/api/details/profile", {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          // Token is invalid or expired
          throw new Error("Authentication failed");
        }

        const userData = await response.json();
        
        // Only super admins can access this route
        if (userData.role !== "admin") {
          throw new Error("Super admin access required");
        }

        setIsValidating(false);
      } catch (error) {
        console.error("Super admin validation failed:", error);
        // Clear invalid authentication state if authentication failed
        if (error instanceof Error && error.message === "Authentication failed") {
          useUserStore.getState().clearUser();
        }
        setIsValidating(false);
      } finally {
        setIsLoading(false);
      }
    };

    validateAuth();
  }, [isAuthenticated]);

  // Show loading spinner while validating
  if (isLoading || isValidating) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-red-600" />
          <p className="text-gray-600">Verifying super admin access...</p>
        </div>
      </div>
    );
  }

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If user is not a super admin, redirect to admin panel
  if (role !== "admin") {
    return <Navigate to={redirectTo} replace />;
  }

  // User is authenticated and is a super admin
  return <>{children}</>;
};
