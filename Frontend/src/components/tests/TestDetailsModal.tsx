"use client"

import type React from "react"
import { X, Clock, MapPin, FileText, Timer, Activity, Plus, Check, Calendar, Stethoscope, Zap, ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useTestCartStore } from "@/stores/testCartStore"
import type { MedicalTest } from "@/types/test"
import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"

interface TestModalProps {
  test: MedicalTest | null
  isOpen: boolean
  onClose: () => void
}

const TestModal: React.FC<TestModalProps> = ({ test, isOpen, onClose }) => {
  const { addTest, removeTest, isTestInCart, clearCart } = useTestCartStore()
  const navigate = useNavigate()
  const [showParameters, setShowParameters] = useState(false)

  // Disable scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = 'auto'
      }
    }
  }, [isOpen])


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

  const handleInstantBook = () => {
    clearCart();
    handleCartAction();
    navigate("/cart");
  }

  const formatReportTime = (hours: number) => {
    if (hours < 24) return `${hours} hours`
    if (hours < 168) return `${Math.floor(hours / 24)} day${hours > 48 ? "s" : ""}`
    return `${Math.floor(hours / 168)} week${hours > 336 ? "s" : ""}`
  }

  const getLocationNames = (locationIds: string[]) => {
    const locationMap: Record<string, string> = {
      mumbai: "Mumbai", delhi: "Delhi NCR", bangalore: "Bangalore",
      chennai: "Chennai", hyderabad: "Hyderabad", pune: "Pune",
      kolkata: "Kolkata", ahmedabad: "Ahmedabad"
    }
    return locationIds.length >= 8 ? ["All Locations"] : locationIds.map(id => locationMap[id] || id)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm transition-opacity duration-300">
      <div
        className="relative w-full max-w-4xl max-h-[90vh] md:max-h-[85vh] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white hover:bg-slate-100 shadow-lg border border-slate-200"
        >
          <X className="w-5 h-5 text-slate-800" />
        </button>

        <div className="p-4 md:p-6 pb-4 border-b border-slate-100">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2">
              <h1 className="text-2xl md:text-3xl font-bold text-slate-900">{test.name}</h1>
              <div className="text-xl md:text-2xl font-bold text-vesta-orange">{test.priceDisplay}</div>
            </div>

            <div className="flex flex-wrap gap-2">
              <div className="flex items-center text-xs md:text-sm text-slate-700 bg-slate-100 px-2 md:px-3 py-1 md:py-1.5 rounded-full">
                <Zap className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2 text-vesta-orange" />
                <span>Reports in {formatReportTime(test.reportIn)}</span>
              </div>
              <div className="flex items-center text-xs md:text-sm text-slate-700 bg-slate-100 px-2 md:px-3 py-1 md:py-1.5 rounded-full">
                <Activity className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2 text-vesta-orange" />
                <span>{test.parameterCount} Parameters</span>
              </div>
              {test.popular && (
                <div className="flex items-center text-xs md:text-sm text-white bg-gradient-to-r from-vesta-orange to-vesta-navy px-2 md:px-3 py-1 md:py-1.5 rounded-full">
                  <span>Popular Choice</span>
                </div>
              )}
            </div>

            <p className="text-base md:text-lg text-slate-600 leading-relaxed">{test.description}</p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="flex flex-col lg:grid lg:grid-cols-3 gap-6 md:gap-8">
            <div className="lg:col-span-2 space-y-6">
              <Card className="border-0 shadow-md bg-slate-50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
                    <Stethoscope className="w-4 h-4 md:w-5 md:h-5 text-vesta-orange" />
                    About This Test
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-700 leading-relaxed text-sm md:text-base">{test.about}</p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-md relative overflow-visible">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
                      <FileText className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />
                      Parameters Tested ({test.parameterCount})
                    </CardTitle>
                    <button
                      className="lg:hidden flex items-center gap-1 text-sm text-blue-600"
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowParameters(!showParameters);
                      }}
                    >

                    </button>
                  </div>
                  <CardDescription>Key measurements included</CardDescription>
                </CardHeader>
                <CardContent className="lg:block">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {test.parameters.slice(0, 6).map((parameter, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg hover:bg-slate-200 transition-colors">
                        <div className="w-2 h-2 bg-vesta-orange rounded-full flex-shrink-0" />
                        <span className="text-slate-700 text-sm md:text-base">{parameter}</span>
                      </div>
                    ))}
                  </div>

                  {/* Dropdown for mobile that overlaps content */}
                  {/* {showParameters && (
                    <div className="lg:hidden absolute left-0 right-0 z-20 bg-white shadow-lg rounded-b-lg border-t border-slate-200 mt-2 p-4 max-h-[50vh] overflow-y-auto">
                      <div className="grid grid-cols-1 gap-3">
                        {test.parameters.map((parameter, index) => (
                          <div key={index} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg hover:bg-slate-200">
                            <div className="w-2 h-2 bg-vesta-orange rounded-full flex-shrink-0" />
                            <span className="text-slate-700 text-sm">{parameter}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )} */}
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card className="border-0 shadow-md bg-gradient-to-br from-vesta-orange/5 to-vesta-navy/5">
                <CardHeader>
                  <CardTitle className="text-base md:text-lg">Test Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />
                    <div>
                      <div className="font-medium text-slate-900 text-sm md:text-base">Duration</div>
                      <div className="text-xs md:text-sm text-slate-600">{test.duration}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Activity className="w-4 h-4 md:w-5 md:h-5 text-purple-600" />
                    <div>
                      <div className="font-medium text-slate-900 text-sm md:text-base">Body Parts</div>
                      <div className="text-xs md:text-sm text-slate-600">{test.parts.join(", ")}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Timer className="w-4 h-4 md:w-5 md:h-5 text-green-600" />
                    <div>
                      <div className="font-medium text-slate-900 text-sm md:text-base">Report Ready</div>
                      <div className="text-xs md:text-sm text-slate-600">In {formatReportTime(test.reportIn)}</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 md:w-5 md:h-5 text-red-600 mt-0.5" />
                    <div>
                      <div className="font-medium text-slate-900 text-sm md:text-base">Available At</div>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {getLocationNames(test.locations).map((location, index) => (
                          <span key={index} className="inline-flex bg-slate-200 text-slate-700 px-2 py-1 rounded-md text-xs">
                            {location}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-3">
                <Button
                  onClick={handleCartAction}
                  variant={inCart ? "default" : "premium"}
                  size="lg"
                  className="w-full text-base md:text-lg min-h-12 py-3"
                >
                  {inCart ? (
                    <>
                      <Check className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                      Added to Cart
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                      Add to Cart
                    </>
                  )}
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  className="w-full text-base md:text-lg min-h-12 py-3 bg-transparent border-slate-200 hover:bg-slate-50"
                  onClick={handleInstantBook}
                >
                  <Calendar className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                  Instant Book
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TestModal