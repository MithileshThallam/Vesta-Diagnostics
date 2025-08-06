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
import Cart from "./pages/Cart";
import AdminPanel from "@/pages/AdminPanel";
import Header from "./components/Header";
import Footer from "./components/Footer";
import NotFound from "@/pages/NotFound";
import { useAuthFetch } from "@/hooks/useAuthFetch";
import { useUserStore } from "@/stores/userStore";

const queryClient = new QueryClient();

const AppContent = () => {
  const location = useLocation();
  const { role, isAuthenticated } = useUserStore();
  const hideHeaderPaths = ["/login", "/signup", "/admin"];
  const shouldShowHeader = !hideHeaderPaths.includes(location.pathname);

  // This will run on first load and whenever auth state changes
  useAuthFetch();

  return (
    <>
      {shouldShowHeader && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={isAuthenticated ? <Navigate to="/" replace /> : <Login />} />
        <Route path="/signup" element={isAuthenticated ? <Navigate to="/" replace /> : <Signup />} />
        <Route path="/tests" element={<Tests />} />
        <Route path="/franchise" element={<Franchise />} />
        <Route path="/contactus" element={<Contact />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/admin" element={<AdminPanel />} />
        {/* <Route 
          path="/admin" 
          element={
            isAuthenticated && (role === "admin" || role === "sub-admin") 
              ? <AdminPanel /> 
              : <Navigate to="/login" state={{ from: location }} replace />
          } 
        /> */}
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
        <AppContent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;