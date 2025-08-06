import { Toaster } from "./components/ui/toaster"
import { Toaster as Sonner } from "./components/ui/sonner"
import { TooltipProvider } from "./components/ui/tooltip"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom"
import Home from "@/pages/Home"
import Login from "@/pages/Login"
import Signup from "@/pages/SignUp"
import Tests from "@/pages/Test"
import Franchise from './pages/Franchise'
import Contact from "./pages/Contact"
import Cart from "./pages/Cart"
import AdminPanel from "@/pages/AdminPanel"
import Header from "./components/Header"
import Footer from "./components/Footer"
import NotFound from "@/pages/NotFound"
import { useAuthFetch } from "@/hooks/useAuthFetch"
import { useUserStore } from "@/stores/userStore"

const queryClient = new QueryClient()

const AppContent = () => {
  const location = useLocation()
  const { role } = useUserStore()
  const hideHeaderPaths = ["/login", "/signup", "/admin"]
  const shouldShowHeader = !hideHeaderPaths.includes(location.pathname)

  // Auto-fetch user on app load
  useAuthFetch()

  return (
    <>
      {shouldShowHeader && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/tests" element={<Tests />} />
        <Route path="/franchise" element={<Franchise />} />
        <Route path="/contactus" element={<Contact />} />
        <Route path="/cart" element={<Cart />} />
        {/* {(role === "admin" || role === "sub-admin") && <Route path="/admin" element={<AdminPanel />} />} */}
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer/>
    </>
  )
}

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
)

export default App
