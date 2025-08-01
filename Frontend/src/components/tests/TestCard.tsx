"use client"

import type React from "react"
import { Clock, MapPin, ChevronRight, Plus, Check, Activity, Zap } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useTestCartStore } from "@/store/testCartStore"
import type { MedicalTest } from "@/types/test"

interface TestCardProps {
  test: MedicalTest
  index: number
  isVisible: boolean
  onTestClick: (test: MedicalTest) => void
}

const TestCard: React.FC<TestCardProps> = ({ test, index, isVisible, onTestClick }) => {
  const { addTest, removeTest, isTestInCart } = useTestCartStore()
  const inCart = isTestInCart(test.id)

  const handleCartAction = (e: React.MouseEvent) => {
    e.stopPropagation()
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
      return `${Math.floor(hours / 24)} days`
    } else {
      return `${Math.floor(hours / 168)} weeks`
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

    if (locationIds.length >= 8) return "All Locations"
    return locationIds.map((id) => locationMap[id] || id).join(", ")
  }

  return (
    <Card
      className={`group hover:shadow-xl border-2 border-gray-200 mt-4 shadow-soft bg-white/90 backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 test-card cursor-pointer flex-shrink-0 w-80 flex flex-col h-[400px] ${
        isVisible ? "test-card--visible" : ""
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
      role="article"
      aria-labelledby={`test-${test.id}-title`}
      onClick={() => onTestClick(test)}
    >
      <CardHeader className="pb-4">
        {/* Package Title and Highlights */}
        <div className="flex flex-col gap-2">
          <CardTitle
            id={`test-${test.id}-title`}
            className="text-xl font-bold text-slate-900 group-hover:text-vesta-orange transition-colors duration-300 leading-tight"
          >
            {test.name}
          </CardTitle>
          
          {/* Highlights section */}
          <div className="flex flex-col gap-1 text-sm text-slate-700">
            <div className="flex items-center">
              <Zap className="w-4 h-4 mr-2 text-vesta-orange" />
              <span>Reports in {formatReportTime(test.reportIn)}</span>
            </div>
            <div className="flex items-center">
              <Activity className="w-4 h-4 mr-2 text-vesta-orange" />
              <span>{test.parameterCount} Parameters</span>
            </div>
          </div>
        </div>

        {/* Badges */}
        <div className="flex gap-2 mt-3">
          {test.popular && (
            <span className="bg-gradient-to-r from-vesta-orange to-vesta-navy text-white text-xs px-3 py-1 rounded-full font-medium">
              Popular
            </span>
          )}
        </div>

        <CardDescription className="text-sm text-slate-600 leading-relaxed line-clamp-2 mt-2">
          {test.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="pt-0 flex flex-col flex-grow">
        {/* Test Details */}
        <div className="space-y-4 mb-4">
          {/* Price Section */}
          <div className="flex items-center">
            <span className="text-2xl font-bold text-slate-900">{test.priceDisplay}</span>
          </div>

          <div className="space-y-3">
            <div className="flex items-center text-sm text-slate-600">
              <Clock className="w-4 h-4 mr-2 text-blue-600" />
              <span>{test.duration}</span>
            </div>
            <div className="flex items-start text-sm text-slate-600">
              <MapPin className="w-4 h-4 mr-2 text-red-600 mt-0.5 flex-shrink-0" />
              <span className="line-clamp-1">{getLocationNames(test.locations)}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons - Pushed to bottom */}
        <div className="mt-auto pt-4 pb-2">
          <div className="flex gap-2">
            <Button
              onClick={handleCartAction}
              variant={inCart ? "default" : "outline"}
              className={`flex-1 transition-all duration-300 ${
                inCart
                  ? "bg-vesta-orange text-white border-vesta-orange hover:bg-vesta-orange/90"
                  : "group-hover:bg-vesta-orange group-hover:text-white group-hover:border-vesta-orange bg-transparent border-slate-200 hover:shadow-md"
              }`}
              aria-label={inCart ? `Remove ${test.name} from cart` : `Add ${test.name} to cart`}
            >
              {inCart ? (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  <span>Added</span>
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4 mr-2" />
                  <span>Add to Cart</span>
                </>
              )}
            </Button>

            <Button
              variant="outline"
              size="sm"
              className="px-3 bg-transparent border-slate-200 hover:shadow-md"
              aria-label={`View details for ${test.name}`}
              onClick={(e) => {
                e.stopPropagation()
                onTestClick(test)
              }}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default TestCard