import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X } from "lucide-react";

interface BookingFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const districts = [
  "Dhaka",
  "Chittagong", 
  "Rajshahi",
  "Khulna",
  "Barisal",
  "Sylhet",
  "Rangpur",
  "Mymensingh"
];

const testsByDistrict: Record<string, string[]> = {
  "Dhaka": ["Blood Test", "X-Ray", "MRI", "CT Scan", "Ultrasound", "ECG"],
  "Chittagong": ["Blood Test", "X-Ray", "Ultrasound", "ECG"],
  "Rajshahi": ["Blood Test", "X-Ray", "MRI", "Ultrasound"],
  "Khulna": ["Blood Test", "X-Ray", "CT Scan", "ECG"],
  "Barisal": ["Blood Test", "X-Ray", "Ultrasound"],
  "Sylhet": ["Blood Test", "X-Ray", "MRI", "ECG"],
  "Rangpur": ["Blood Test", "X-Ray", "Ultrasound"],
  "Mymensingh": ["Blood Test", "X-Ray", "CT Scan", "Ultrasound"]
};

const BookingForm = ({ isOpen, onClose }: BookingFormProps) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    district: "",
    test: ""
  });
  const [availableTests, setAvailableTests] = useState<string[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
      document.body.style.overflow = 'hidden';
    } else {
      // Start exit animation before unmounting
      setIsAnimating(false);
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    if (formData.district) {
      setAvailableTests(testsByDistrict[formData.district] || []);
      // Reset test when district changes
      setFormData(prev => ({ ...prev, test: "" }));
    } else {
      setAvailableTests([]);
    }
  }, [formData.district]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    onClose();
    setFormData({ name: "", phone: "", district: "", test: "" });
  };

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  // Don't unmount immediately - wait for animation to complete
  if (!isOpen && !isAnimating) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Simplified Backdrop */}
      <div
        className={`absolute inset-0 bg-black/70 transition-opacity duration-300 ${
          isAnimating ? "opacity-100" : "opacity-0"
        }`}
        onClick={handleClose}
      />
      
      {/* Form Container - removed will-change */}
      <div
        className={`relative w-full max-w-md mx-4 transform transition-all duration-300 ease-out ${
          isAnimating 
            ? "opacity-100 translate-y-0 scale-100" 
            : "opacity-0 translate-y-8 scale-95"
        }`}
      >
        <div className="bg-white rounded-2xl shadow-lg border border-primary/10 overflow-hidden">
          {/* Header */}
          <div 
            className="p-6 text-white"
            style={{ background: 'linear-gradient(135deg, hsl(15 96% 53%) 0%, hsl(248 81% 20%) 100%)' }}
          >
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold font-display">Book Your Slot</h2>
                <p className="text-white/90 mt-1 font-medium">Quick & Easy Appointment</p>
              </div>
              <button
                onClick={handleClose}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors duration-200"
                aria-label="Close booking form"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Name Field */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-bold text-gray-800 font-display">
                Full Name
              </Label>
              <Input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Enter your full name"
                required
                className="border-2 border-orange-200 rounded-lg font-body focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-colors duration-200"
              />
            </div>

            {/* Phone Field */}
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-sm font-bold text-gray-800 font-display">
                Phone Number
              </Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                placeholder="Enter your phone number"
                required
                className="border-2 border-orange-200 rounded-lg font-body focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-colors duration-200"
              />
            </div>

            {/* District Field */}
            <div className="space-y-2">
              <Label htmlFor="district" className="text-sm font-bold text-gray-800 font-display">
                District
              </Label>
              <Select
                value={formData.district}
                onValueChange={(value) => setFormData(prev => ({ ...prev, district: value }))}
                required
              >
                <SelectTrigger className="border-2 border-orange-200 rounded-lg font-body focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-colors duration-200">
                  <SelectValue placeholder="Select your district" />
                </SelectTrigger>
                <SelectContent className="bg-white border-2 border-gray-200 rounded-lg shadow-lg z-50">
                  {districts.map((district) => (
                    <SelectItem 
                      key={district} 
                      value={district}
                      className="cursor-pointer font-body hover:bg-orange-50 focus:bg-orange-100"
                    >
                      {district}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Test Field */}
            <div className="space-y-2">
              <Label htmlFor="test" className="text-sm font-bold text-gray-800 font-display">
                Test Type
              </Label>
              <Select
                value={formData.test}
                onValueChange={(value) => setFormData(prev => ({ ...prev, test: value }))}
                disabled={!formData.district}
                required
              >
                <SelectTrigger 
                  className="border-2 border-orange-200 rounded-lg font-body focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-colors duration-200 disabled:opacity-50"
                >
                  <SelectValue 
                    placeholder={
                      formData.district 
                        ? "Select test type" 
                        : "Select district first"
                    } 
                  />
                </SelectTrigger>
                <SelectContent className="bg-white border-2 border-gray-200 rounded-lg shadow-lg z-50">
                  {availableTests.map((test) => (
                    <SelectItem 
                      key={test} 
                      value={test}
                      className="cursor-pointer font-body hover:bg-orange-50 focus:bg-orange-100"
                    >
                      {test}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              size="lg"
              className="w-full py-4 text-lg font-bold rounded-lg shadow-md hover:shadow-lg transform hover:scale-[1.01] transition-all duration-200 text-white bg-gradient-to-r from-orange-500 to-indigo-900"
            >
              Confirm Booking
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;