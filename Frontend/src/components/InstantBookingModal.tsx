"use client"

import { useState, useEffect } from "react"
import { X, Calendar, MapPin, User, Phone, TestTube2 } from "lucide-react"
import { Button } from "@/components/ui/button"
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
}

const InstantBookingModal: React.FC<InstantBookingModalProps> = ({ test, isOpen, onClose }) => {
  const { name: userName, phone: userPhone, isAuthenticated } = useUserStore()
  const [submitting, setSubmitting] = useState(false)

  const [formData, setFormData] = useState<BookingFormData>({
    name: "",
    phone: "",
    location: "",
    date: "",
    testName: "",
  })

  const locations = [
    { id: "mumbai", name: "Mumbai" },
    { id: "delhi", name: "Delhi NCR" },
    { id: "bangalore", name: "Bangalore" },
    { id: "hyderabad", name: "Hyderabad" },
  ]

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

  if (!isOpen || !test) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-md bg-white rounded-xl shadow-xl overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Book Your Test</h2>
              <p className="text-sm text-gray-500 mt-1">Complete the form to schedule your appointment</p>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          <div className="mb-6 p-4 bg-blue-50 rounded-lg flex items-start">
            <TestTube2 className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <h3 className="font-medium text-gray-900">{test.name}</h3>
              <p className="text-sm text-gray-600 mt-1">Selected test</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                  <User className="w-4 h-4 mr-2 text-gray-500" />
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                  <Phone className="w-4 h-4 mr-2 text-gray-500" />
                  Phone Number
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="+91 98765 43210"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                  <MapPin className="w-4 h-4 mr-2 text-gray-500" />
                  Location
                </label>
                <select
                  required
                  value={formData.location}
                  onChange={(e) => handleInputChange("location", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select your city</option>
                  {locations.map((location) => (
                    <option key={location.id} value={location.id}>
                      {location.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                  <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                  Preferred Date
                </label>
                <input
                  type="date"
                  required
                  min={getTomorrowDate()}
                  value={formData.date}
                  onChange={(e) => handleInputChange("date", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div className="pt-2 space-y-3">
              <Button
                type="submit"
                disabled={submitting}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3"
              >
                {submitting ? "Processing..." : "Confirm Booking"}
              </Button>

              <Button 
                type="button" 
                variant="outline" 
                onClick={onClose} 
                className="w-full border-gray-300 hover:bg-gray-50"
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default InstantBookingModal