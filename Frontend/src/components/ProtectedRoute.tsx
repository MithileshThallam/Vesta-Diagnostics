import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useUserStore } from "@/stores/userStore";
import { Loader2 } from "lucide-react";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: ("user" | "admin" | "sub-admin")[];
  redirectTo?: string;
}

export const ProtectedRoute = ({ 
  children, 
  allowedRoles = ["admin", "sub-admin"], 
  redirectTo = "/login" 
}: ProtectedRouteProps) => {
  const { isAuthenticated, role } = useUserStore();
  const [isValidating, setIsValidating] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const validateAuth = async () => {
      try {
        if (!isAuthenticated) {
          setIsValidating(false);
          return;
        }

        const response = await fetch("http://localhost:5000/api/details/auth-check", {
          credentials: "include",
        });

        if (!response.ok) {
          useUserStore.getState().clearUser();
          setIsValidating(false);
          return;
        }

        const data = await response.json();
        
        if (!allowedRoles.includes(data.role)) {
          useUserStore.getState().clearUser();
        }
        
        setIsValidating(false);
      } catch (error) {
        useUserStore.getState().clearUser();
        setIsValidating(false);
      }
    };

    validateAuth();
  }, [isAuthenticated, allowedRoles]);

  if (isValidating) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600">Verifying access...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  if (!allowedRoles.includes(role as any)) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};
