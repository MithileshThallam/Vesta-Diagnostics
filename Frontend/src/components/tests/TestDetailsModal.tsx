"use client"

import React from "react"
import ReactDOM from 'react-dom'
import { X, Clock, MapPin, FileText, Timer, Activity, Calendar, Stethoscope, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { MedicalTest } from "@/types/test"
import { useNavigate } from "react-router-dom"
import { useState, useEffect, useCallback, useMemo } from "react"
import { FixedSizeList } from "react-window"

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

interface TestModalProps {
  test: MedicalTest | null
  isOpen: boolean
  onClose: () => void
}

const ParameterRow = ({ data, index, style }: { data: string[], index: number, style: React.CSSProperties }) => (
  <div style={style} className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg hover:bg-slate-200 transition-colors">
    <div className="w-2 h-2 bg-vesta-orange rounded-full flex-shrink-0" />
    <span className="text-slate-700 text-sm">{data[index]}</span>
  </div>
)

const TestModal: React.FC<TestModalProps> = React.memo(({ test, isOpen, onClose }) => {
  const navigate = useNavigate()
  const [isMounted, setIsMounted] = useState(false)

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

  const handleInstantBook = useCallback(() => {
    navigate("/cart")
  }, [navigate])

  const formatReportTime = useCallback((hours: number) => {
    if (hours < 24) return `${hours} hours`
    if (hours < 168) return `${Math.floor(hours / 24)} day${hours > 48 ? "s" : ""}`
    return `${Math.floor(hours / 168)} week${hours > 336 ? "s" : ""}`
  }, [])

  const getLocationNames = useCallback((locationIds: string[]) => {
    const locationMap: Record<string, string> = {
      mumbai: "Mumbai", delhi: "Delhi NCR", bangalore: "Bangalore",
      chennai: "Chennai", hyderabad: "Hyderabad", pune: "Pune",
      kolkata: "Kolkata", ahmedabad: "Ahmedabad"
    }
    return locationIds.length >= 8 ? ["All Locations"] : locationIds.map(id => locationMap[id] || id)
  }, [])

  // Precompute derived values
  const locations = useMemo(() => test ? getLocationNames(test.locations) : [], [test, getLocationNames])
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

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      {renderModalContent()}
    </div>,
    portalRoot!
  )
})

export default TestModal