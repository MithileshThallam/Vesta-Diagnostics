"use client"

import { useState, useEffect } from "react"
import { X, Calendar, MapPin, User, Phone, TestTube2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useUserStore } from "@/stores/userStore"
import type { MedicalTest } from "@/types/test"

interface BookingFormData {
  name: string
  phone: string
  location: string
  date: string
  testName: string
}

interface InstantBookingModalProps {
  test: MedicalTest | null
  isOpen: boolean
  onClose: () => void
  availableLocations: string[];
}

const InstantBookingModal: React.FC<InstantBookingModalProps> = ({
  test,
  isOpen,
  onClose,
  availableLocations // Add this prop
}) => {
  const { name: userName, phone: userPhone, isAuthenticated } = useUserStore()
  const [submitting, setSubmitting] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  const [formData, setFormData] = useState<BookingFormData>({
    name: "",
    phone: "",
    location: "",
    date: "",
    testName: "",
  })

  const locationNameMap: Record<string, string> = {
    mumbai: "Mumbai",
    delhi: "Delhi NCR",
    bangalore: "Bangalore",
    hyderabad: "Hyderabad",
    chennai: "Chennai",
    pune: "Pune",
    kolkata: "Kolkata",
    ahmedabad: "Ahmedabad",
  };

  // const locations = [
  //   { id: "mumbai", name: "Mumbai" },
  //   { id: "delhi", name: "Delhi NCR" },
  //   { id: "bangalore", name: "Bangalore" },
  //   { id: "hyderabad", name: "Hyderabad" },
  // ]

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true)
      document.body.style.overflow = 'hidden'
    } else {
      setIsAnimating(false)
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  // Prefill form data
  useEffect(() => {
    if (isAuthenticated) {
      setFormData(prev => ({
        ...prev,
        name: userName || "",
        phone: userPhone || ""
      }))
    }
    if (test) {
      setFormData(prev => ({
        ...prev,
        testName: test.name
      }))
    }
  }, [isAuthenticated, userName, userPhone, test])

  const handleInputChange = (field: keyof BookingFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      console.log("Booking submitted:", formData)
      alert("Booking confirmed! You'll receive a confirmation shortly.")
      onClose()
    } catch (error) {
      console.error("Booking error:", error)
    } finally {
      setSubmitting(false)
    }
  }

  const getTomorrowDate = () => {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    return tomorrow.toISOString().split("T")[0]
  }

  const handleClose = () => {
    setIsAnimating(false)
    setTimeout(() => {
      onClose()
    }, 300)
  }

  if (!isOpen && !isAnimating) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-black/70 transition-opacity duration-300 ${isAnimating ? "opacity-100" : "opacity-0"
          }`}
        onClick={handleClose}
      />

      {/* Form Container */}
      <div
        className={`relative w-full max-w-md mx-4 transform transition-all duration-300 ease-out ${isAnimating
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
                <h2 className="text-2xl font-bold font-display">Book Your Test</h2>
                <p className="text-white/90 mt-1 font-medium">Complete the form to schedule your appointment</p>
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
            {/* Test Info */}
            <div className="p-4 bg-blue-50 rounded-lg flex items-start">
              <TestTube2 className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-gray-900">{test?.name}</h3>
                <p className="text-sm text-gray-600 mt-1">Selected test</p>
              </div>
            </div>

            {/* Name Field */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-bold text-gray-800 font-display flex items-center">
                <User className="w-4 h-4 mr-2 text-gray-500" />
                Full Name
              </Label>
              <Input
                id="name"
                type="text"
                required
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="John Doe"
                className="rounded-lg font-body"
              />
            </div>

            {/* Phone Field */}
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-sm font-bold text-gray-800 font-display flex items-center">
                <Phone className="w-4 h-4 mr-2 text-gray-500" />
                Phone Number
              </Label>
              <Input
                id="phone"
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                placeholder="+91 98765 43210"
                className="rounded-lg font-body"
              />
            </div>

            {/* Location Field */}
            <div className="space-y-2">
              <Label htmlFor="location" className="text-sm font-bold text-gray-800 font-display flex items-center">
                <MapPin className="w-4 h-4 mr-2 text-gray-500" />
                Location
              </Label>
              <Select
                value={formData.location}
                onValueChange={(value) => handleInputChange("location", value)}
                required
              >
                <SelectTrigger className="rounded-lg font-body duration-200">
                  <SelectValue placeholder="Select your city" />
                </SelectTrigger>
                <SelectContent className="bg-white rounded-lg shadow-lg z-50">
                  {availableLocations?.map((locationId) => (
                    <SelectItem
                      key={locationId}
                      value={locationId}
                      className="cursor-pointer font-body hover:bg-orange-500 focus:bg-orange-500"
                    >
                      {locationNameMap[locationId] || locationId}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Date Field */}
            <div className="space-y-2">
              <Label htmlFor="date" className="text-sm font-bold text-gray-800 font-display flex items-center">
                <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                Preferred Date
              </Label>
              <Input
                id="date"
                type="date"
                required
                min={getTomorrowDate()}
                value={formData.date}
                onChange={(e) => handleInputChange("date", e.target.value)}
                className="rounded-lg font-body"
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              size="lg"
              disabled={submitting}
              className="w-full py-4 text-lg font-bold rounded-lg shadow-md hover:shadow-lg transform hover:scale-[1.01] transition-all duration-200 text-white bg-gradient-to-r from-orange-500 to-indigo-900"
            >
              {submitting ? "Processing..." : "Confirm Booking"}
            </Button>

            {/* Cancel Button */}
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              className="w-full border-gray-300 hover:bg-gray-50"
            >
              Cancel
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default InstantBookingModal