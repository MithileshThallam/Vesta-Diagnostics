import React, { useState, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, ArrowRight, Stethoscope } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import loginImage from '/Features.jpg'; // Replace with your actual image path

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const togglePassword = useCallback(() => {
    setShowPassword(prev => !prev);
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
  }, []);

  const floatingElements = useMemo(() => (
    <>
      <div className="absolute top-20 left-10 w-16 h-16 bg-gradient-primary rounded-full opacity-20 animate-pulse" 
           style={{ animationDelay: '0s', animationDuration: '3s' }} />
      <div className="absolute top-40 right-16 w-12 h-12 bg-gradient-primary rounded-full opacity-15 animate-pulse"
           style={{ animationDelay: '1s', animationDuration: '4s' }} />
      <div className="absolute bottom-32 left-20 w-20 h-20 bg-gradient-primary rounded-full opacity-10 animate-pulse"
           style={{ animationDelay: '2s', animationDuration: '5s' }} />
      <div className="absolute bottom-40 right-10 w-8 h-8 bg-gradient-primary rounded-full opacity-25 animate-pulse"
           style={{ animationDelay: '0.5s', animationDuration: '3.5s' }} />
    </>
  ), []);

  return (
    <div className="min-h-screen bg-white flex">
      {/* Image Section - Will be hidden on mobile */}
      <div className="hidden lg:flex flex-1 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-vesta-navy/70 to-transparent z-10" />
        <img 
          src={loginImage} 
          alt="Doctor reviewing medical scans" 
          className="w-full h-full object-cover transform transition-all duration-1000 hover:scale-105 will-change-transform"
        />
        <div className="absolute bottom-8 left-8 z-20 text-white">
          <h2 className="text-4xl font-bold mb-2">Vesta Diagnostics</h2>
          <p className="text-xl opacity-90">Experts who care</p>
        </div>
      </div>
      
      {/* Form Section */}
      <div className="flex-1 flex items-center justify-center p-8 relative overflow-hidden">
        {/* Animated Background Elements */}
        {floatingElements}
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-vesta-orange/5 via-transparent to-vesta-navy/5 pointer-events-none" />
        
        {/* Main Container */}
        <div className="w-full max-w-md relative z-10">
          {/* Glassmorphism Card */}
          <div className="backdrop-blur-xl bg-white/80 border border-white/20 rounded-2xl shadow-2xl p-8 transform transition-all duration-700 hover:shadow-3xl hover:scale-[1.02]">
            
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-full mb-4 transform transition-all duration-500 hover:rotate-12 hover:scale-110">
                <Stethoscope className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold mb-2 bg-gradient-primary bg-clip-text text-transparent">
                Welcome Back
              </h1>
              <p className="text-text-dark/70">Sign in to access your health dashboard</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-text-dark font-medium">Email Address</Label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                    <Mail className="h-5 w-5 text-text-dark/40 group-focus-within:text-vesta-orange transition-colors duration-300" />
                  </div>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your.email@example.com"
                    className="pl-12 h-12 border-2 border-gray-200 bg-white/50 backdrop-blur-sm focus:border-vesta-orange focus:bg-white focus:shadow-glow transition-all duration-300 hover:border-gray-300"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-text-dark font-medium">Password</Label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                    <Lock className="h-5 w-5 text-text-dark/40 group-focus-within:text-vesta-orange transition-colors duration-300" />
                  </div>
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="pl-12 pr-12 h-12 border-2 border-gray-200 bg-white/50 backdrop-blur-sm focus:border-vesta-orange focus:bg-white focus:shadow-glow transition-all duration-300 hover:border-gray-300"
                    required
                  />
                  <button
                    type="button"
                    onClick={togglePassword}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center z-10 text-text-dark/40 hover:text-vesta-orange transition-colors duration-300"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {/* Remember & Forgot */}
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center space-x-2 cursor-pointer group">
                  <input type="checkbox" className="w-4 h-4 text-vesta-orange border-gray-300 rounded focus:ring-vesta-orange transition-colors duration-300" />
                  <span className="text-text-dark/70 group-hover:text-text-dark transition-colors duration-300">Remember me</span>
                </label>
                <Link 
                  to="/forgot-password" 
                  className="text-vesta-orange hover:text-vesta-navy transition-colors duration-300 font-medium"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 bg-gradient-primary text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed group"
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Signing In...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <span>Sign In</span>
                    <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                )}
              </Button>
            </form>

            {/* Divider */}
            <div className="my-8 relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-text-dark/60">Or continue with</span>
              </div>
            </div>

            {/* Social Login */}
            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="h-12 border-2 hover:border-vesta-orange hover:bg-vesta-orange/5 transition-all duration-300">
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Google
              </Button>
              <Button variant="outline" className="h-12 border-2 hover:border-vesta-orange hover:bg-vesta-orange/5 transition-all duration-300">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Facebook
              </Button>
            </div>

            {/* Sign Up Link */}
            <div className="text-center mt-8">
              <p className="text-text-dark/70">
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