import React, { useState, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User, Phone, ArrowRight, Shield, Check, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import signupImage from '/HeroSlider/hero-5.png';

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    phone: '',
    email: '',
    hasWhatsApp: false,
    otp: '',
    username: '',
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [otpSent, setOtpSent] = useState(false);

  const togglePassword = useCallback(() => {
    setShowPassword(prev => !prev);
  }, []);

  const toggleConfirmPassword = useCallback(() => {
    setShowConfirmPassword(prev => !prev);
  }, []);

  const handleInputChange = useCallback((field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  }, []);

  const handleNext = useCallback(() => {
    if (step < 3) {
      setStep(prev => prev + 1);
    }
  }, [step]);

  const handleBack = useCallback(() => {
    if (step > 1) {
      setStep(prev => prev - 1);
    }
  }, [step]);

  const sendOtp = useCallback(() => {
    // Simulate OTP sending
    setIsLoading(true);
    setTimeout(() => {
      setOtpSent(true);
      setIsLoading(false);
    }, 1000);
  }, []);

  const verifyOtp = useCallback(() => {
    // Simulate OTP verification
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      handleNext();
    }, 1000);
  }, [handleNext]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsLoading(false);
  }, []);

  const floatingElements = useMemo(() => (
    <>
      <div className="absolute top-16 right-20 w-14 h-14 bg-gradient-primary rounded-full opacity-15 animate-pulse" 
           style={{ animationDelay: '0s', animationDuration: '4s' }} />
      <div className="absolute top-32 left-16 w-10 h-10 bg-gradient-primary rounded-full opacity-20 animate-pulse"
           style={{ animationDelay: '1.5s', animationDuration: '3s' }} />
      <div className="absolute bottom-24 right-12 w-18 h-18 bg-gradient-primary rounded-full opacity-10 animate-pulse"
           style={{ animationDelay: '2.5s', animationDuration: '5s' }} />
      <div className="absolute bottom-48 left-24 w-6 h-6 bg-gradient-primary rounded-full opacity-25 animate-pulse"
           style={{ animationDelay: '1s', animationDuration: '3.5s' }} />
    </>
  ), []);

  const progressWidth = useMemo(() => (step / 3) * 100, [step]);

  return (
    <div className="min-h-screen bg-white flex">
      {/* Image Section - Will be hidden on mobile */}
      <div className="hidden lg:flex flex-1 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-vesta-navy/70 to-transparent z-10" />
        <img 
          src={signupImage} 
          alt="Medical team discussing diagnosis" 
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
        <div className="absolute inset-0 bg-gradient-to-tr from-vesta-navy/5 via-transparent to-vesta-orange/5 pointer-events-none" />
        
        {/* Main Container */}
        <div className="w-full max-w-lg relative z-10">
          {/* Glassmorphism Card */}
          <div className="backdrop-blur-xl bg-white/85 border border-white/30 rounded-2xl shadow-2xl p-8 transform transition-all duration-700 hover:shadow-3xl">
            
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-full mb-4 transform transition-all duration-500 hover:rotate-12 hover:scale-110">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-text-dark mb-2 bg-gradient-primary bg-clip-text text-transparent">
                Join Vesta
              </h1>
              <p className="text-text-dark/70">Create your secure health account</p>
            </div>

            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between text-sm text-text-dark/60 mb-2">
                <span className={step >= 1 ? 'text-vesta-orange font-medium' : ''}>Contact</span>
                <span className={step >= 2 ? 'text-vesta-orange font-medium' : ''}>Verification</span>
                <span className={step >= 3 ? 'text-vesta-orange font-medium' : ''}>Security</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                <div 
                  className="h-full bg-gradient-primary rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${progressWidth}%` }}
                />
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {step === 1 ? (
                // Step 1: Contact Information
                <div className="space-y-6 animate-fade-in">
                  {/* Phone Number */}
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-text-dark font-medium">Phone Number</Label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                        <Phone className="h-5 w-5 text-text-dark/40 group-focus-within:text-vesta-orange transition-colors duration-300" />
                      </div>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        placeholder="+1 (555) 123-4567"
                        className="pl-12 h-12 border-2 border-gray-200 bg-white/50 backdrop-blur-sm focus:border-vesta-orange focus:bg-white focus:shadow-glow transition-all duration-300 hover:border-gray-300"
                        required
                      />
                    </div>
                  </div>

                  {/* Email (Optional) */}
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-text-dark font-medium">
                      Email Address <span className="text-text-dark/50">(Optional)</span>
                    </Label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                        <Mail className="h-5 w-5 text-text-dark/40 group-focus-within:text-vesta-orange transition-colors duration-300" />
                      </div>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="your.email@example.com"
                        className="pl-12 h-12 border-2 border-gray-200 bg-white/50 backdrop-blur-sm focus:border-vesta-orange focus:bg-white focus:shadow-glow transition-all duration-300 hover:border-gray-300"
                      />
                    </div>
                  </div>

                  {/* WhatsApp Checkbox */}
                  <div className="space-y-2">
                    <label className="flex items-center space-x-3 cursor-pointer group">
                      <div className="relative">
                        <input 
                          type="checkbox" 
                          checked={formData.hasWhatsApp}
                          onChange={(e) => handleInputChange('hasWhatsApp', e.target.checked)}
                          className="sr-only"
                        />
                        <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-300 ${
                          formData.hasWhatsApp 
                            ? 'bg-vesta-orange border-vesta-orange' 
                            : 'border-gray-300 group-hover:border-vesta-orange'
                        }`}>
                          {formData.hasWhatsApp && <Check className="w-3 h-3 text-white" />}
                        </div>
                      </div>
                      <div className="flex items-center">
                        <MessageSquare className="w-5 h-5 text-text-dark/60 mr-2" />
                        <span className="text-text-dark/70 group-hover:text-text-dark transition-colors duration-300">
                          I have WhatsApp on this number
                        </span>
                      </div>
                    </label>
                  </div>

                  {/* Next Button */}
                  <Button
                    type="button"
                    onClick={handleNext}
                    className="w-full h-12 bg-gradient-primary text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-[1.02] group"
                  >
                    <div className="flex items-center space-x-2">
                      <span>Continue</span>
                      <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </Button>
                </div>
              ) : step === 2 ? (
                // Step 2: OTP Verification
                <div className="space-y-6 animate-fade-in">
                  <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center w-14 h-14 bg-vesta-orange/10 rounded-full mb-4">
                      <Mail className="w-6 h-6 text-vesta-orange" />
                    </div>
                    <h2 className="text-xl font-semibold text-text-dark mb-2">Verify Your Phone</h2>
                    <p className="text-text-dark/70">
                      We've sent a 6-digit code to {formData.phone}
                    </p>
                  </div>

                  {/* OTP Input */}
                  <div className="space-y-2">
                    <Label htmlFor="otp" className="text-text-dark font-medium">Verification Code</Label>
                    <div className="relative group">
                      <Input
                        id="otp"
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        maxLength={6}
                        value={formData.otp}
                        onChange={(e) => handleInputChange('otp', e.target.value)}
                        placeholder="Enter 6-digit code"
                        className="text-center tracking-widest text-xl h-14 border-2 border-gray-200 bg-white/50 backdrop-blur-sm focus:border-vesta-orange focus:bg-white focus:shadow-glow transition-all duration-300 hover:border-gray-300"
                        required
                      />
                    </div>
                  </div>

                  {/* Resend OTP */}
                  <div className="text-center text-sm">
                    <button 
                      type="button"
                      onClick={sendOtp}
                      disabled={isLoading}
                      className="text-vesta-orange hover:text-vesta-navy font-medium transition-colors duration-300 disabled:opacity-50"
                    >
                      {isLoading ? 'Sending...' : 'Resend Code'}
                    </button>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-4">
                    <Button
                      type="button"
                      onClick={handleBack}
                      variant="outline"
                      className="flex-1 h-12 border-2 hover:border-vesta-orange hover:bg-vesta-orange/5 transition-all duration-300"
                    >
                      Back
                    </Button>
                    <Button
                      type="button"
                      onClick={verifyOtp}
                      disabled={isLoading || formData.otp.length < 6}
                      className="flex-1 h-12 bg-gradient-primary text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed group"
                    >
                      {isLoading ? (
                        <div className="flex items-center space-x-2">
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Verifying...</span>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2">
                          <span>Verify</span>
                          <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" />
                        </div>
                      )}
                    </Button>
                  </div>
                </div>
              ) : (
                // Step 3: Account Security
                <div className="space-y-6 animate-fade-in">
                  {/* Username */}
                  <div className="space-y-2">
                    <Label htmlFor="username" className="text-text-dark font-medium">Username</Label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                        <User className="h-5 w-5 text-text-dark/40 group-focus-within:text-vesta-orange transition-colors duration-300" />
                      </div>
                      <Input
                        id="username"
                        type="text"
                        value={formData.username}
                        onChange={(e) => handleInputChange('username', e.target.value)}
                        placeholder="Choose a username"
                        className="pl-12 h-12 border-2 border-gray-200 bg-white/50 backdrop-blur-sm focus:border-vesta-orange focus:bg-white focus:shadow-glow transition-all duration-300 hover:border-gray-300"
                        required
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-text-dark font-medium">Password</Label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                        <Lock className="h-5 w-5 text-text-dark/40 group-focus-within:text-vesta-orange transition-colors duration-300" />
                      </div>
                      <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        value={formData.password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                        placeholder="Create a strong password"
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

                  {/* Confirm Password */}
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-text-dark font-medium">Confirm Password</Label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                        <Lock className="h-5 w-5 text-text-dark/40 group-focus-within:text-vesta-orange transition-colors duration-300" />
                      </div>
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={formData.confirmPassword}
                        onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                        placeholder="Confirm your password"
                        className="pl-12 pr-12 h-12 border-2 border-gray-200 bg-white/50 backdrop-blur-sm focus:border-vesta-orange focus:bg-white focus:shadow-glow transition-all duration-300 hover:border-gray-300"
                        required
                      />
                      <button
                        type="button"
                        onClick={toggleConfirmPassword}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center z-10 text-text-dark/40 hover:text-vesta-orange transition-colors duration-300"
                      >
                        {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>

                  {/* Terms Agreement */}
                  <div className="space-y-4">
                    <label className="flex items-start space-x-3 cursor-pointer group">
                      <input 
                        type="checkbox" 
                        className="w-4 h-4 mt-1 text-vesta-orange border-gray-300 rounded focus:ring-vesta-orange transition-colors duration-300" 
                        required 
                      />
                      <span className="text-sm text-text-dark/70 group-hover:text-text-dark transition-colors duration-300">
                        I agree to the{' '}
                        <Link to="/terms" className="text-vesta-orange hover:text-vesta-navy font-medium">Terms of Service</Link>
                        {' '}and{' '}
                        <Link to="/privacy" className="text-vesta-orange hover:text-vesta-navy font-medium">Privacy Policy</Link>
                      </span>
                    </label>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-4">
                    <Button
                      type="button"
                      onClick={handleBack}
                      variant="outline"
                      className="flex-1 h-12 border-2 hover:border-vesta-orange hover:bg-vesta-orange/5 transition-all duration-300"
                    >
                      Back
                    </Button>
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="flex-1 h-12 bg-gradient-primary text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed group"
                    >
                      {isLoading ? (
                        <div className="flex items-center space-x-2">
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Creating Account...</span>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2">
                          <span>Create Account</span>
                          <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" />
                        </div>
                      )}
                    </Button>
                  </div>
                </div>
              )}
            </form>

            {/* Sign In Link */}
            <div className="text-center mt-8">
              <p className="text-text-dark/70">
                Already have an account?{' '}
                <Link 
                  to="/login" 
                  className="text-vesta-orange hover:text-vesta-navy font-semibold transition-colors duration-300 hover:underline"
                >
                  Sign in here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;