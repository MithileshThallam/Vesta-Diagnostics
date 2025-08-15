import React, { useMemo, memo } from "react"
import { Clock, MapPin, ChevronRight, Calendar, Activity,} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { MedicalTest } from "@/types/test"

// Memoize Lucide icons to prevent unnecessary re-renders
const MemoClock = memo(Clock)
const MemoMapPin = memo(MapPin)
const MemoChevronRight = memo(ChevronRight)
const MemoCalendar = memo(Calendar)
const MemoActivity = memo(Activity)

interface TestCardProps {
  test: MedicalTest
  index: number
  isVisible: boolean
  onTestClick: (test: MedicalTest) => void
  onInstantBook: (test: MedicalTest & { locationDetails: { id: string; name: string }[] }) => void
}

const TestCard: React.FC<TestCardProps> = ({ test, index, isVisible, onTestClick, onInstantBook }) => {
  // Memoize expensive calculations
  const locationDetails = useMemo(() => {
    const locationMap: Record<string, string> = {
      mumbai: "Mumbai",
      delhi: "Delhi NCR",
      bangalore: "Bangalore",
      hyderabad: "Hyderabad",
      chennai: "Chennai",
      pune: "Pune",
      kolkata: "Kolkata",
      ahmedabad: "Ahmedabad",
    }
    return test.locations.map(id => ({
      id,
      name: locationMap[id] || id
    }))
  }, [test.locations])

  const locationNames = useMemo(() => {
    if (test.locations.length >= 8) return "All Locations"
    return locationDetails.map(loc => loc.name).join(", ")
  }, [locationDetails, test.locations.length])

 

  const handleInstantBook = (e: React.MouseEvent) => {
    e.stopPropagation()
    onInstantBook({
      ...test,
      locationDetails
    })
  }

  const handleCardClick = () => onTestClick(test)
  const handleDetailsClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    onTestClick(test)
  }

  return (
    <Card
      className={`group hover:shadow-2xl border-2 border-gray-200 mt-4 shadow-soft bg-white/90 backdrop-blur-sm transition-all duration-00 hover:translate-y-10 test-card cursor-pointer flex-shrink-0 w-80 flex flex-col h-[400px] ${
        isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
      }`}
      style={{
        transitionDelay: `${index * 100}ms`,
        transform: isVisible ? 'translate3d(0, 0, 0)' : 'translate3d(0, 10px, 0)',
        willChange: 'transform, opacity'
      }}
      role="article"
      aria-labelledby={`test-${test.id}-title`}
      onClick={handleCardClick}
    >
      <CardHeader className="pb-4">
        <div className="flex flex-col gap-2">
          <CardTitle
            id={`test-${test.id}-title`}
            className="text-xl font-bold text-slate-900 group-hover:text-vesta-orange transition-colors duration-100 leading-tight"
          >
            {test.name}
          </CardTitle>

           <div className="flex flex-col gap-1 text-sm text-slate-700">
            <div className="flex items-center">
              <span></span>
            </div>
            <div className="flex items-center">
              <MemoActivity className="w-4 h-4 mr-2 text-vesta-orange" />
              <span>{test.parameterCount} Parameters</span>
            </div>
          </div>
        </div>

        {test.popular && (
          <div className="flex gap-2 mt-3">
            <span 
              className="bg-gradient-to-r from-vesta-orange to-vesta-navy text-white text-xs px-3 py-1 rounded-full font-medium transform transition-all duration-300"
              style={{
                transform: isVisible ? 'translateY(0)' : 'translateY(-10px)',
                opacity: isVisible ? 1 : 0
              }}
            >
              Popular
            </span>
          </div>
        )}

        <CardDescription className="text-sm text-slate-600 leading-relaxed line-clamp-2 mt-2">
          {test.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="pt-0 flex flex-col flex-grow">
        <div className="space-y-4 mb-4">
          <div className="space-y-3">
            <div className="flex items-center text-sm text-slate-600">
              <MemoClock className="w-4 h-4 mr-2 text-blue-600" />
              <span>{test.duration}</span>
            </div>
            <div className="flex items-start text-sm text-slate-600">
              <MemoMapPin className="w-4 h-4 mr-2 text-red-600 mt-0.5 flex-shrink-0" />
              <span className="line-clamp-1">{locationNames}</span>
            </div>
          </div>
        </div>

        <div className="mt-auto pt-4 pb-2">
          <div className="flex gap-2">
            <Button
              onClick={handleInstantBook}
              className="flex-1 bg-gradient-to-r from-vesta-orange to-vesta-navy hover:from-vesta-orange/90 hover:to-vesta-navy/90 text-white border-0 transition-all duration-300"
              aria-label={`Instant book ${test.name}`}
            >
              <MemoCalendar className="w-4 h-4 mr-2" />
              <span>Instant Book</span>
            </Button>

            <Button
              variant="outline"
              size="sm"
              className="px-3 bg-transparent border-slate-200 hover:shadow-md transition-transform duration-300 hover:scale-105"
              aria-label={`View details for ${test.name}`}
              onClick={handleDetailsClick}
            >
              <MemoChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default memo(TestCard)