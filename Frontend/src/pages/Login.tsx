import React, { useState, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, Phone, Lock, ArrowRight, Stethoscope } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import loginImage from '/Features.webp';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { useUserStore } from '@/stores/userStore';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const togglePassword = useCallback(() => {
    setShowPassword(prev => !prev);
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Request data: ", phone, password);

    setIsLoading(true);

    try {
      let response = await fetch("https://vesta-diagnostics.vercel.app//api/auth/login", {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({ phone, password }),
        headers: {
          "Content-Type": "application/json"
        },
      });

      let res = await response.json();

      console.log("Response received: ", res);

      if (response.ok) {
        // Update user store with the received data
        useUserStore.getState().setUser({
          name: res.user.name,
          phone: res.user.phone,
          role: res.user.role
        });
        console.log("User details: ", res.user)

        toast({
          title: "Welcome Back!",
          className: "bg-white text-black",
        });

        // Wait for state to update before navigating
        await new Promise(resolve => setTimeout(resolve, 100));
        navigate('/');
      } else {
        toast({
          title: "Login Failed",
          description: res.message || "Invalid credentials",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred during login",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [navigate, toast, phone, password]);


  const floatingElements = useMemo(() => (
    <>
      <div className="absolute top-20 left-10 w-16 h-16 bg-gradient-primary rounded-full opacity-20 animate-pulse"
        style={{ animationDelay: '0s', animationDuration: '3s' }} />
      <div className="absolute top-40 right-16 w-12 h-12 bg-gradient-primary rounded-full opacity-15 animate-pulse"
        style={{ animationDelay: '1s', animationDuration: '4s' }} />
      <div className="absolute bottom-32 left-20 w-20 h-20 bg-gradient-primary rounded-full opacity-10 animate-pulse"
        style={{ animationDelay: '2s', animationDuration: '5s' }} />
    </>
  ), []);

  return (
    <div className="h-screen bg-white flex overflow-hidden">
      {/* Image Section */}
      <div className="hidden lg:flex flex-1 relative">
        <div className="absolute inset-0 bg-gradient-to-t from-vesta-navy/70 to-transparent z-10" />
        <img
          src={loginImage}
          alt="Doctor reviewing medical scans"
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-8 left-8 z-20 text-white">
          <h2 className="text-4xl font-bold mb-2">Vesta Diagnostics</h2>
          <p className="text-xl opacity-90">Experts who care</p>
        </div>
      </div>

      {/* Form Section */}
      <div className="flex-1 flex items-center justify-center p-6 relative overflow-hidden">
        {/* Animated Background Elements */}
        {floatingElements}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-vesta-orange/5 via-transparent to-vesta-navy/5 pointer-events-none" />

        {/* Main Container */}
        <div className="w-full max-w-md relative z-10">
          {/* Glassmorphism Card */}
          <div className="backdrop-blur-xl bg-white/80 border border-white/20 rounded-2xl shadow-2xl p-8">

            {/* Header */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-primary rounded-full mb-3">
                <Stethoscope className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold mb-1 bg-gradient-primary bg-clip-text text-transparent">
                Welcome Back
              </h1>
              <p className="text-text-dark/70 text-sm">Sign in to access your health dashboard</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Phone Number Field */}
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-text-dark font-medium text-sm">Phone Number</Label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                    <Phone className="h-4 w-4 text-text-dark/40 group-focus-within:text-vesta-orange transition-colors duration-300" />
                  </div>
                  <Input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="98xxxxxxxxx"
                    className="pl-10 h-11 text-sm border-2 border-gray-200 bg-white/50 focus:border-vesta-orange focus:bg-white transition-all duration-300 hover:border-gray-300"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-text-dark font-medium text-sm">Password</Label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                    <Lock className="h-4 w-4 text-text-dark/40 group-focus-within:text-vesta-orange transition-colors duration-300" />
                  </div>
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="pl-10 pr-10 h-11 text-sm border-2 border-gray-200 bg-white/50 focus:border-vesta-orange focus:bg-white transition-all duration-300 hover:border-gray-300"
                    required
                  />
                  <button
                    type="button"
                    onClick={togglePassword}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center z-10 text-text-dark/40 hover:text-vesta-orange transition-colors duration-300"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-11 bg-gradient-primary text-white font-semibold rounded-xl text-sm hover:shadow-md transform transition-all duration-300 hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed group"
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Signing In...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <span>Sign In</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                )}
              </Button>
            </form>

            {/* Divider */}
            <div className="my-6 relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-2 bg-white text-text-dark/60"></span>
              </div>
            </div>

           

            {/* Sign Up Link */}
            <div className="text-center mt-6">
              <p className="text-text-dark/70 text-xs">
                Don't have an account?{' '}
                <Link
                  to="/signup"
                  className="text-vesta-orange hover:text-vesta-navy font-semibold transition-colors duration-300 hover:underline"
                >
                  Sign up for free
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
