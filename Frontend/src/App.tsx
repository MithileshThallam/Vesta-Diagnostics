import { Toaster } from "./components/ui/toaster"
import { Toaster as Sonner } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from '@/pages/Home'
import Login from "@/pages/Login";
import  Signup from "@/pages/SignUp";
import Test from "./pages/Test";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import Header from "./components/Header";
import NotFound from "@/pages/NotFound"

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
      <Header />
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/tests" element={<Test />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contactus" element={<Contact />} />

        <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
