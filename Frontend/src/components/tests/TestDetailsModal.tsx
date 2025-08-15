"use client"

import React from "react"
import ReactDOM from 'react-dom'
import { X, Clock, MapPin, FileText, Timer, Activity, Calendar, Stethoscope, Zap, User, Phone, TestTube2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { MedicalTest } from "@/types/test"
import { useState, useEffect, useCallback, useMemo } from "react"
import { FixedSizeList } from "react-window"
import { useUserStore } from "@/stores/userStore"

// Memoize frequently used icons
const MemoizedX = React.memo(X)
const MemoizedClock = React.memo(Clock)
const MemoizedMapPin = React.memo(MapPin)
const MemoizedFileText = React.memo(FileText)
const MemoizedTimer = React.memo(Timer)
const MemoizedActivity = React.memo(Activity)
const MemoizedCalendar = React.memo(Calendar)
const MemoizedStethoscope = React.memo(Stethoscope)
const MemoizedZap = React.memo(Zap)
const MemoizedUser = React.memo(User)
const MemoizedPhone = React.memo(Phone)
const MemoizedTestTube2 = React.memo(TestTube2)

interface TestModalProps {
  test: MedicalTest | null
  isOpen: boolean
  onClose: () => void
}

interface BookingFormData {
  name: string
  phone: string
  location: string
  date: string
  test: string
}

const ParameterRow = ({ data, index, style }: { data: string[], index: number, style: React.CSSProperties }) => (
  <div style={style} className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg hover:bg-slate-200 transition-colors">
    <div className="w-2 h-2 bg-vesta-orange rounded-full flex-shrink-0" />
    <span className="text-slate-700 text-sm">{data[index]}</span>
  </div>
)

const TestModal: React.FC<TestModalProps> = React.memo(({ test, isOpen, onClose }) => {
  const { name: userName, phone: userPhone, isAuthenticated } = useUserStore()
  const [isMounted, setIsMounted] = useState(false)
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  const [formData, setFormData] = useState<BookingFormData>({
    name: "",
    phone: "",
    location: "",
    date: "",
    test: "",
  })

  // Create a portal target element
  const portalRoot = useMemo(() => {
    if (typeof document !== 'undefined') {
      const element = document.createElement('div')
      element.id = 'modal-root'
      return element
    }
    return null
  }, [])

  useEffect(() => {
    if (isOpen && portalRoot) {
      document.body.appendChild(portalRoot)
      setIsMounted(true)
      return () => {
        document.body.removeChild(portalRoot)
        setIsMounted(false)
      }
    }
  }, [isOpen, portalRoot])

  // Disable scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = 'auto'
      }
    }
  }, [isOpen])

  // Handle booking modal animations
  useEffect(() => {
    if (isBookingModalOpen) {
      setIsAnimating(true)
      document.body.style.overflow = 'hidden'
    } else {
      setIsAnimating(false)
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isBookingModalOpen])

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
        test: test.id || "",
        location: "anantpur" // Always use Anantpur as specified
      }))
    }
  }, [isAuthenticated, userName, userPhone, test])

  const handleInstantBook = useCallback(() => {
    setIsBookingModalOpen(true)
  }, [])

  const handleCloseBookingModal = useCallback(() => {
    setIsAnimating(false)
    setTimeout(() => {
      setIsBookingModalOpen(false)
    }, 300)
  }, [])

  const handleInputChange = useCallback((field: keyof BookingFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }, [])

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    console.log(formData)
  
    try {
      const response = await fetch('https://vesta-diagnostics-w7rb.vercel.app/api/bookings/create-booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(formData)
      })
  
      if (!response.ok) {
        const errorData = await response.json()
        console.log(errorData)
        throw new Error(errorData.message || 'Booking failed')
      }
  
      const result = await response.json()
      console.log("Booking submitted:", result)
      alert("Booking confirmed!")
      handleCloseBookingModal()
    } catch (error: any) {
      console.error("Error:", error)
      alert(error.message || "Failed to submit booking")
    } finally {
      setSubmitting(false)
    }
  }, [formData, handleCloseBookingModal])

  const getTomorrowDate = useCallback(() => {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    return tomorrow.toISOString().split("T")[0]
  }, [])

  const formatReportTime = useCallback((hours: number) => {
    if (hours < 24) return `${hours} hours`
    if (hours < 168) return `${Math.floor(hours / 24)} day${hours > 48 ? "s" : ""}`
    return `${Math.floor(hours / 168)} week${hours > 336 ? "s" : ""}`
  }, [])

  const getLocationNames = useCallback(() => {
    return ["Anantpur"]
  }, [])

  // Precompute derived values
  const locations = useMemo(() => test ? getLocationNames() : [], [test, getLocationNames])
  const reportTime = useMemo(() => test ? formatReportTime(test.reportIn) : '', [test, formatReportTime])
  const bodyParts = useMemo(() => test ? test.parts.join(", ") : '', [test])

  if (!isOpen || !test || !isMounted) return null

  // Virtualized list for parameters with optimized item size
  const ParameterList = () => (
    <FixedSizeList
      height={200}  // Increased height for better visibility
      width="100%"
      itemCount={test.parameters.length}
      itemSize={45}  // Slightly larger item size for better readability
      itemData={test.parameters}
    >
      {ParameterRow}
    </FixedSizeList>
  )

  const renderModalContent = () => (
    <div className="relative w-full max-w-4xl max-h-[85vh] bg-white rounded-xl shadow-xl flex flex-col overflow-hidden">
      <button
        onClick={onClose}
        className="absolute top-3 right-3 z-20 p-1.5 rounded-full bg-white hover:bg-slate-100 shadow-md border border-slate-200"
      >
        <MemoizedX className="w-4 h-4 text-slate-800" />
      </button>

      <div className="p-4 md:p-6 border-b border-slate-100">
        <div className="flex flex-col gap-3">
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900">{test.name}</h1>
          
          <div className="flex flex-wrap gap-1.5">
            <div className="flex items-center text-xs text-slate-700 bg-slate-100 px-2 py-1 rounded-full">
              <MemoizedZap className="w-3 h-3 mr-1 text-vesta-orange" />
              <span>Reports in {reportTime}</span>
            </div>
            <div className="flex items-center text-xs text-slate-700 bg-slate-100 px-2 py-1 rounded-full">
              <MemoizedActivity className="w-3 h-3 mr-1 text-vesta-orange" />
              <span>{test.parameterCount} Parameters</span>
            </div>
            {test.popular && (
              <div className="flex items-center text-xs text-white bg-gradient-to-r from-vesta-orange to-vesta-navy px-2 py-1 rounded-full">
                <span>Popular Choice</span>
              </div>
            )}
          </div>

          <p className="text-base text-slate-600 line-clamp-2">{test.description}</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 md:p-6">
        <div className="flex flex-col lg:grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <Card className="border-0 shadow-sm">
              <CardHeader className="p-4">
                <CardTitle className="flex items-center gap-1.5 text-lg">
                  <MemoizedStethoscope className="w-5 h-5 text-vesta-orange" />
                  <span>About This Test</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <p className="text-base text-slate-700 line-clamp-4">{test.about}</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardHeader className="p-4">
                <CardTitle className="flex items-center gap-1.5 text-lg">
                  <MemoizedFileText className="w-5 h-5 text-blue-600" />
                  <span>Parameters ({test.parameterCount})</span>
                </CardTitle>
                <CardDescription className="text-sm">Key measurements</CardDescription>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <ParameterList />
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            <Card className="border-0 shadow-sm bg-gradient-to-br from-vesta-orange/5 to-vesta-navy/5">
              <CardHeader className="p-4">
                <CardTitle className="text-base">Test Information</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0 space-y-3">
                <div className="flex items-center gap-3">
                  <MemoizedClock className="w-5 h-5 text-blue-600" />
                  <div>
                    <div className="text-sm font-medium text-slate-900">Duration</div>
                    <div className="text-sm text-slate-600">{test.duration}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <MemoizedActivity className="w-5 h-5 text-purple-600" />
                  <div>
                    <div className="text-sm font-medium text-slate-900">Body Parts</div>
                    <div className="text-sm text-slate-600">{bodyParts}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <MemoizedTimer className="w-5 h-5 text-green-600" />
                  <div>
                    <div className="text-sm font-medium text-slate-900">Report Ready</div>
                    <div className="text-sm text-slate-600">In {reportTime}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MemoizedMapPin className="w-5 h-5 text-red-600 mt-0.5" />
                  <div>
                    <div className="text-sm font-medium text-slate-900">Available At</div>
                    <div className="flex flex-wrap gap-1.5 mt-1.5">
                      {locations.map((location, index) => (
                        <span key={index} className="inline-flex bg-slate-200 text-slate-700 px-2 py-1 rounded text-sm">
                          {location}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Button
              variant="outline"
              size="default"
              className="w-full text-base min-h-12 py-3 bg-transparent border-slate-200 hover:bg-slate-50"
              onClick={handleInstantBook}
            >
              <MemoizedCalendar className="w-5 h-5 mr-2" />
              Instant Book
            </Button>
          </div>
        </div>
      </div>
    </div>
  )

  // Booking Modal JSX
  const renderBookingModal = () => {
    if (!isBookingModalOpen && !isAnimating) return null

    return ReactDOM.createPortal(
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-black/70 transition-opacity duration-300 ${isAnimating ? "opacity-100" : "opacity-0"}`}
          onClick={handleCloseBookingModal}
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
                  onClick={handleCloseBookingModal}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors duration-200"
                  aria-label="Close booking form"
                >
                  <MemoizedX className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Test Info */}
              <div className="p-4 bg-blue-50 rounded-lg flex items-start">
                <MemoizedTestTube2 className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-gray-900">{test?.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">Selected test</p>
                </div>
              </div>

              {/* Name Field */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-bold text-gray-800 font-display flex items-center">
                  <MemoizedUser className="w-4 h-4 mr-2 text-gray-500" />
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
                  <MemoizedPhone className="w-4 h-4 mr-2 text-gray-500" />
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
                  <MemoizedMapPin className="w-4 h-4 mr-2 text-gray-500" />
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
                    <SelectItem
                      value="anantpur"
                      className="cursor-pointer font-body hover:bg-orange-500 focus:bg-orange-500"
                    >
                      Anantpur
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Date Field */}
              <div className="space-y-2">
                <Label htmlFor="date" className="text-sm font-bold text-gray-800 font-display flex items-center">
                  <MemoizedCalendar className="w-4 h-4 mr-2 text-gray-500" />
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
                onClick={handleCloseBookingModal}
                className="w-full border-gray-300 hover:bg-gray-50"
              >
                Cancel
              </Button>
            </form>
          </div>
        </div>
      </div>,
      portalRoot!
    )
  }

  return (
    <>
      {ReactDOM.createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          {renderModalContent()}
        </div>,
        portalRoot!
      )}
      {renderBookingModal()}
    </>
  )
})

export default TestModal