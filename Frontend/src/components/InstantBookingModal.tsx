"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { X, Calendar, MapPin, Clock, FileText, User, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useUserStore } from "@/stores/userStore"
import type { MedicalTest } from "@/types/test"

interface BookingFormData {
  name: string
  phone: string
  location: string
  date: string
  testCategory: string
  testName: string
}

interface TestDetails {
  name: string
  version: string
  description: string
  prep: string
  price: string
  sampleReportUrl: string
}

interface InstantBookingModalProps {
  test: MedicalTest | null
  isOpen: boolean
  onClose: () => void
}

const InstantBookingModal: React.FC<InstantBookingModalProps> = ({ test, isOpen, onClose }) => {
  const { name: userName, phone: userPhone, isAuthenticated } = useUserStore()
  const [testDetails, setTestDetails] = useState<TestDetails | null>(null)
  const [loading, setLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const [formData, setFormData] = useState<BookingFormData>({
    name: "",
    phone: "",
    location: "",
    date: "",
    testCategory: "",
    testName: "",
  })

  const locations = [
    { id: "mumbai", name: "Mumbai" },
    { id: "delhi", name: "Delhi NCR" },
    { id: "bangalore", name: "Bangalore" },
    { id: "chennai", name: "Chennai" },
    { id: "hyderabad", name: "Hyderabad" },
    { id: "pune", name: "Pune" },
    { id: "kolkata", name: "Kolkata" },
    { id: "ahmedabad", name: "Ahmedabad" },
  ]

  const testCategories = [
    { id: "neurological", name: "Neurological" },
    { id: "cardiology", name: "Cardiology" },
    { id: "laboratory", name: "Laboratory" },
    { id: "radiology", name: "Radiology" },
    { id: "genetic", name: "Genetic" },
    { id: "preventive", name: "Preventive" },
  ]

  // Prefill form data when user is authenticated
  useEffect(() => {
    if (isAuthenticated && userName && userPhone) {
      setFormData((prev) => ({
        ...prev,
        name: userName,
        phone: userPhone,
      }))
    }
  }, [isAuthenticated, userName, userPhone])

  // Prefill test data when test is selected
  useEffect(() => {
    if (test) {
      setFormData((prev) => ({
        ...prev,
        testCategory: test.category,
        testName: test.name,
      }))
    }
  }, [test])

  // Fetch test details from API
  useEffect(() => {
    if (test && isOpen) {
      fetchTestDetails(test.id)
    }
  }, [test, isOpen])

  const fetchTestDetails = async (testId: string) => {
    setLoading(true)
    try {
      // Simulate API call - replace with actual API endpoint
      const response = await fetch(`/api/tests/${testId}`)
      if (response.ok) {
        const details = await response.json()
        setTestDetails(details)
        console.log("Test details fetched:", details)
      } else {
        // Fallback to test data if API fails
        setTestDetails({
          name: test?.name || "",
          version: "v1.0",
          description: test?.description || "",
          prep: "No special preparation required",
          price: test?.priceDisplay || "",
          sampleReportUrl: "/sample-report.pdf",
        })
      }
    } catch (error) {
      console.error("Error fetching test details:", error)
      // Fallback data
      setTestDetails({
        name: test?.name || "",
        version: "v1.0",
        description: test?.description || "",
        prep: "No special preparation required",
        price: test?.priceDisplay || "",
        sampleReportUrl: "/sample-report.pdf",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field: keyof BookingFormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      console.log("Booking data being submitted:", {
        ...formData,
        testId: test?.id,
        testPrice: test?.price,
        timestamp: new Date().toISOString(),
      })

      // Simulate API call - replace with actual booking API endpoint
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          testId: test?.id,
          testPrice: test?.price,
        }),
      })

      if (response.ok) {
        const result = await response.json()
        console.log("Booking successful:", result)
        alert("Booking confirmed! You will receive a confirmation message shortly.")
        onClose()
        // Reset form
        setFormData({
          name: isAuthenticated ? userName : "",
          phone: isAuthenticated ? userPhone : "",
          location: "",
          date: "",
          testCategory: "",
          testName: "",
        })
      } else {
        throw new Error("Booking failed")
      }
    } catch (error) {
      console.error("Booking error:", error)
      alert("Booking failed. Please try again.")
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
      <div className="relative w-full max-w-6xl max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/90 hover:bg-white shadow-lg"
        >
          <X className="w-5 h-5 text-slate-600" />
        </button>

        <div className="flex h-full max-h-[90vh]">
          {/* Left Column - Test Details */}
          <div className="w-1/2 p-6 border-r border-slate-200 overflow-y-auto">
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Test Details</h2>
                <div className="w-12 h-1 bg-gradient-to-r from-vesta-orange to-vesta-navy rounded-full"></div>
              </div>

              {loading ? (
                <div className="space-y-4">
                  <div className="animate-pulse">
                    <div className="h-4 bg-slate-200 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-slate-200 rounded w-1/2"></div>
                  </div>
                </div>
              ) : testDetails ? (
                <div className="space-y-6">
                  <Card className="border-0 shadow-soft bg-slate-50">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <FileText className="w-5 h-5 text-vesta-orange" />
                        {testDetails.name}
                      </CardTitle>
                      <p className="text-sm text-slate-600">Version: {testDetails.version}</p>
                    </CardHeader>
                    <CardContent>
                      <p className="text-slate-700 leading-relaxed">{testDetails.description}</p>
                    </CardContent>
                  </Card>

                  <Card className="border-0 shadow-soft">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <Clock className="w-5 h-5 text-blue-600" />
                        Preparation Instructions
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-slate-700">{testDetails.prep}</p>
                    </CardContent>
                  </Card>

                  <Card className="border-0 shadow-soft bg-gradient-to-br from-vesta-orange/5 to-vesta-navy/5">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-semibold text-slate-900">Test Price</span>
                        <span className="text-2xl font-bold text-vesta-orange">{testDetails.price}</span>
                      </div>
                    </CardContent>
                  </Card>

                  {testDetails.sampleReportUrl && (
                    <Button
                      variant="outline"
                      className="w-full bg-transparent"
                      onClick={() => window.open(testDetails.sampleReportUrl, "_blank")}
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      View Sample Report
                    </Button>
                  )}
                </div>
              ) : null}
            </div>
          </div>

          {/* Right Column - Booking Form */}
          <div className="w-1/2 p-6 overflow-y-auto">
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Book Your Test</h2>
                <div className="w-12 h-1 bg-gradient-to-r from-vesta-orange to-vesta-navy rounded-full"></div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      <User className="w-4 h-4 inline mr-1" />
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-vesta-orange/50 focus:border-vesta-orange"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      <Phone className="w-4 h-4 inline mr-1" />
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-vesta-orange/50 focus:border-vesta-orange"
                      placeholder="Enter your phone number"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      <MapPin className="w-4 h-4 inline mr-1" />
                      Location *
                    </label>
                    <select
                      required
                      value={formData.location}
                      onChange={(e) => handleInputChange("location", e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-vesta-orange/50 focus:border-vesta-orange"
                    >
                      <option value="">Select location</option>
                      {locations.map((location) => (
                        <option key={location.id} value={location.id}>
                          {location.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      <Calendar className="w-4 h-4 inline mr-1" />
                      Preferred Date *
                    </label>
                    <input
                      type="date"
                      required
                      min={getTomorrowDate()}
                      value={formData.date}
                      onChange={(e) => handleInputChange("date", e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-vesta-orange/50 focus:border-vesta-orange"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Test Category *</label>
                    <select
                      required
                      value={formData.testCategory}
                      onChange={(e) => handleInputChange("testCategory", e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-vesta-orange/50 focus:border-vesta-orange"
                    >
                      <option value="">Select category</option>
                      {testCategories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Test Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.testName}
                      onChange={(e) => handleInputChange("testName", e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-vesta-orange/50 focus:border-vesta-orange bg-slate-50"
                      placeholder="Test name"
                      readOnly
                    />
                  </div>
                </div>

                <div className="pt-4 space-y-3">
                  <Button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-gradient-to-r from-vesta-orange to-vesta-navy hover:from-vesta-orange/90 hover:to-vesta-navy/90 text-white font-semibold py-3 text-lg"
                  >
                    {submitting ? "Booking..." : "Confirm Booking"}
                  </Button>

                  <Button type="button" variant="outline" onClick={onClose} className="w-full bg-transparent">
                    Cancel
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InstantBookingModal
