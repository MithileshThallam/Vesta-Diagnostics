import { Toaster } from "./components/ui/toaster";
import { Toaster as Sonner } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Signup from "@/pages/SignUp";
import Tests from "@/pages/Test";
import Franchise from './pages/Franchise';
import Contact from "./pages/Contact";
import AdminPanel from "@/pages/AdminPanel";
import Header from "./components/Header";
import Footer from "./components/Footer";
import NotFound from "@/pages/NotFound";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { AuthErrorBoundary } from "./components/AuthErrorBoundary";
import { useAuthFetch } from "@/hooks/useAuthFetch";

const queryClient = new QueryClient();

const AppContent = () => {
  const location = useLocation();
  const hideHeaderPaths = ["/login", "/signup", "/admin", "/sub-admin"];
  const shouldShowHeader = !hideHeaderPaths.includes(location.pathname);

  useAuthFetch();

  return (
    <>
      {shouldShowHeader && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={<Login />}
        />
        <Route
          path="/signup"
          element={<Signup />}
        />
        <Route path="/tests" element={<Tests />} />
        <Route path="/franchise" element={<Franchise />} />
        <Route path="/contactus" element={<Contact />} />

        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminPanel />
            </ProtectedRoute>
          }
        />
                  <Route path="/admin-dev" element={<AdminPanel />} />

        <Route
          path="/admin/*"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminPanel />
            </ProtectedRoute>
          }
        />

        {/* Sub-Admin Routes */}
        <Route
          path="/sub-admin"
          element={
            <ProtectedRoute allowedRoles={["sub-admin"]}>
              <AdminPanel />
            </ProtectedRoute>
          }
        />
        <Route
          path="/sub-admin/*"
          element={
            <ProtectedRoute allowedRoles={["sub-admin"]}>
              <AdminPanel />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthErrorBoundary>
          <AppContent />
        </AuthErrorBoundary>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
