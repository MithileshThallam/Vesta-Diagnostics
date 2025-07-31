import { Toaster } from "./components/ui/toaster"
import { Toaster as Sonner } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from '@/pages/Home'
import Login from "@/pages/Login";
import Signup from "@/pages/SignUp";
import Test from "./pages/Test";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import Header from "./components/Header";
import NotFound from "@/pages/NotFound"
import {useEffect} from 'react';

const queryClient = new QueryClient();

const AppContent = () => {
  const location = useLocation();
  const hideHeaderPaths = ['/login', '/signup'];
  const shouldShowHeader = !hideHeaderPaths.includes(location.pathname);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/details/profile', {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!res.ok) {
          throw new Error('Failed to fetch user details');
        }

        const data = await res.json();
        console.log("Details fetched from backend: ", data);
      } catch (err) {
        console.error('Error fetching user:', err);
      }
    }
    fetchDetails();
  }, [])

  return (
    <>
      {shouldShowHeader && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/tests" element={<Test />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contactus" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
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