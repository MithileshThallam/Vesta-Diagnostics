"use client"

import type React from "react"
import { X, Clock, MapPin, FileText, Timer, Activity, Plus, Check, Calendar, Stethoscope, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useTestCartStore } from "@/store/testCartStore"
import type { MedicalTest } from "@/types/test"

interface TestModalProps {
  test: MedicalTest | null
  isOpen: boolean
  onClose: () => void
}

const TestModal: React.FC<TestModalProps> = ({ test, isOpen, onClose }) => {
  const { addTest, removeTest, isTestInCart } = useTestCartStore()

  if (!isOpen || !test) return null

  const inCart = isTestInCart(test.id)

  const handleCartAction = () => {
    if (inCart) {
      removeTest(test.id)
    } else {
      addTest({
        id: test.id,
        name: test.name,
        price: test.price,
        priceDisplay: test.priceDisplay,
        category: test.category,
        duration: test.duration,
      })
    }
  }

  const formatReportTime = (hours: number) => {
    if (hours < 24) {
      return `${hours} hours`
    } else if (hours < 168) {
      const days = Math.floor(hours / 24)
      return `${days} day${days > 1 ? "s" : ""}`
    } else {
      const weeks = Math.floor(hours / 168)
      return `${weeks} week${weeks > 1 ? "s" : ""}`
    }
  }

  const getLocationNames = (locationIds: string[]) => {
    const locationMap: { [key: string]: string } = {
      mumbai: "Mumbai",
      delhi: "Delhi NCR",
      bangalore: "Bangalore",
      chennai: "Chennai",
      hyderabad: "Hyderabad",
      pune: "Pune",
      kolkata: "Kolkata",
      ahmedabad: "Ahmedabad",
    }

    if (locationIds.length >= 8) return ["All Locations"]
    return locationIds.map((id) => locationMap[id] || id)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/90 hover:bg-white shadow-lg transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5 text-slate-600" />
        </button>

        {/* Header Section */}
        <div className="p-6 pb-4 border-b border-slate-100">
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-start">
              <h1 className="text-3xl font-bold text-slate-900">{test.name}</h1>
              <div className="text-2xl font-bold text-vesta-orange">₹{test.priceDisplay}</div>
            </div>

            {/* Highlights */}
            <div className="flex flex-wrap gap-2">
              <div className="flex items-center text-sm text-slate-700 bg-slate-100 px-3 py-1.5 rounded-full">
                <Zap className="w-4 h-4 mr-2 text-vesta-orange" />
                <span>Reports in {formatReportTime(test.reportIn)}</span>
              </div>
              <div className="flex items-center text-sm text-slate-700 bg-slate-100 px-3 py-1.5 rounded-full">
                <Activity className="w-4 h-4 mr-2 text-vesta-orange" />
                <span>{test.parameterCount} Parameters</span>
              </div>
              {test.popular && (
                <div className="flex items-center text-sm text-white bg-gradient-to-r from-vesta-orange to-vesta-navy px-3 py-1.5 rounded-full">
                  <span>Popular Choice</span>
                </div>
              )}
            </div>

            <p className="text-lg text-slate-600 leading-relaxed">{test.description}</p>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* About Section */}
              <Card className="border-0 shadow-soft bg-slate-50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <Stethoscope className="w-5 h-5 text-vesta-orange" />
                    About This Test
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-700 leading-relaxed">{test.about}</p>
                </CardContent>
              </Card>

              {/* Parameters Section */}
              <Card className="border-0 shadow-soft">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <FileText className="w-5 h-5 text-blue-600" />
                    Parameters Tested ({test.parameterCount})
                  </CardTitle>
                  <CardDescription>Key measurements and analyses included in this test</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {test.parameters.map((parameter, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
                      >
                        <div className="w-2 h-2 bg-vesta-orange rounded-full flex-shrink-0" />
                        <span className="text-slate-700">{parameter}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Info */}
              <Card className="border-0 shadow-soft bg-gradient-to-br from-vesta-orange/5 to-vesta-navy/5">
                <CardHeader>
                  <CardTitle className="text-lg">Test Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-blue-600" />
                    <div>
                      <div className="font-medium text-slate-900">Duration</div>
                      <div className="text-sm text-slate-600">{test.duration}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Activity className="w-5 h-5 text-purple-600" />
                    <div>
                      <div className="font-medium text-slate-900">Body Parts</div>
                      <div className="text-sm text-slate-600">{test.parts.join(", ")}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Timer className="w-5 h-5 text-green-600" />
                    <div>
                      <div className="font-medium text-slate-900">Report Ready</div>
                      <div className="text-sm text-slate-600">In {formatReportTime(test.reportIn)}</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-red-600 mt-0.5" />
                    <div>
                      <div className="font-medium text-slate-900">Available At</div>
                      <div className="text-sm text-slate-600">
                        {getLocationNames(test.locations).map((location, index) => (
                          <span
                            key={index}
                            className="inline-block bg-slate-200 text-slate-700 px-2 py-1 rounded-md text-xs mr-1 mb-1"
                          >
                            {location}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Button
                  onClick={handleCartAction}
                  variant={inCart ? "default" : "premium"}
                  size="lg"
                  className="w-full text-lg h-12"
                >
                  {inCart ? (
                    <>
                      <Check className="w-5 h-5 mr-2" />
                      Added to Cart
                    </>
                  ) : (
                    <>
                      <Plus className="w-5 h-5 mr-2" />
                      Add to Cart
                    </>
                  )}
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  className="w-full text-lg h-12 bg-transparent border-slate-200 hover:bg-slate-50"
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  Book Now
                </Button>
              </div>

              {/* Trust Indicators */}
              <Card className="border-0 shadow-soft bg-slate-50">
                <CardContent className="p-4">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-2xl mb-1">🔒</div>
                      <div className="text-xs text-slate-600">Secure & Safe</div>
                    </div>
                    <div>
                      <div className="text-2xl mb-1">✅</div>
                      <div className="text-xs text-slate-600">NABL Certified</div>
                    </div>
                    <div>
                      <div className="text-2xl mb-1">🏥</div>
                      <div className="text-xs text-slate-600">Expert Analysis</div>
                    </div>
                    <div>
                      <div className="text-2xl mb-1">📱</div>
                      <div className="text-xs text-slate-600">Digital Reports</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TestModal