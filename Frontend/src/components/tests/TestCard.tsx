import type React from "react"
import { Clock, MapPin, ChevronRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { MedicalTest } from "@/types/test"

interface TestCardProps {
  test: MedicalTest
  index: number
  isVisible: boolean
}

const TestCard: React.FC<TestCardProps> = ({ test, index, isVisible }) => {
  return (
    <Card
      className={`group hover:shadow-xl border-0 shadow-soft bg-white/90 backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 test-card ${
        isVisible ? "test-card--visible" : ""
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
      role="article"
      aria-labelledby={`test-${test.id}-title`}
    >
      {/* Test Image */}
      <div className="relative overflow-hidden rounded-t-lg">
        <img
          src={test.image || "/placeholder.svg"}
          alt={`${test.name} diagnostic procedure`}
          className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        {test.popular && (
          <span className="absolute top-3 right-3 bg-gradient-to-r from-vesta-orange to-vesta-navy text-white text-xs px-3 py-1 rounded-full font-medium shadow-lg">
            Popular
          </span>
        )}
      </div>

      <CardHeader className="pb-4">
        <CardTitle
          id={`test-${test.id}-title`}
          className="text-lg font-semibold text-slate-900 group-hover:text-vesta-orange transition-colors duration-300 leading-tight"
        >
          {test.name}
        </CardTitle>
        <CardDescription className="text-sm text-slate-600 leading-relaxed">{test.description}</CardDescription>
      </CardHeader>

      <CardContent className="pt-0">
        {/* Test Details */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center text-sm text-slate-600">
            <span className="w-4 h-4 mr-2 text-green-600 font-bold">₹</span>
            <span className="font-semibold text-slate-900">{test.priceDisplay}</span>
          </div>
          <div className="flex items-center text-sm text-slate-600">
            <Clock className="w-4 h-4 mr-2 text-blue-600" />
            <span>{test.duration}</span>
          </div>
          <div className="flex items-start text-sm text-slate-600">
            <MapPin className="w-4 h-4 mr-2 text-red-600 mt-0.5 flex-shrink-0" />
            <span>{test.locationNames.join(", ")}</span>
          </div>
        </div>

        {/* Action Button */}
        <Button
          variant="outline"
          className="w-full group-hover:bg-vesta-orange group-hover:text-white group-hover:border-vesta-orange transition-all duration-300 bg-transparent border-slate-200 hover:shadow-md"
          aria-label={`Book ${test.name} test`}
        >
          <span>Book Test</span>
          <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
        </Button>
      </CardContent>
    </Card>
  )
}

export default TestCard
