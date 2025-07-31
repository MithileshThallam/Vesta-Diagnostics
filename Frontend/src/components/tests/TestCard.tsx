"use client"

import React, { useMemo } from "react"
import { Clock, MapPin, ChevronRight, Plus, Check } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useTestCartStore } from "@/store/testCartStore"
import { useToast } from "@/hooks/use-toast"
import type { MedicalTest } from "@/types/test"

interface TestCardProps {
  test: MedicalTest
  index: number
  isVisible: boolean
}

const TestCard: React.FC<TestCardProps> = ({ test, index, isVisible }) => {
  const { addTest, removeTest, isTestInCart } = useTestCartStore()
  const { toast } = useToast()

  const inCart = useMemo(() => isTestInCart(test.id), [test.id, isTestInCart])

  const handleCartAction = () => {
    if (inCart) {
      removeTest(test.id)
      toast({
        title: "Test removed",
        description: `${test.name} has been removed from your cart`,
        variant: "default",
      })
    } else {
      addTest({
        id: test.id,
        name: test.name,
        price: test.price,
        priceDisplay: test.priceDisplay,
        category: test.category,
        duration: test.duration,
      })
      toast({
        title: "Test added",
        description: `${test.name} has been added to your cart`,
        variant: "default",
      })
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleCartAction()
    }
  }

  return (
    <Card
      className={`group hover:shadow-lg border-0 shadow-soft bg-white/90 backdrop-blur-sm transform transition-transform duration-300 hover:-translate-y-2 test-card ${
        isVisible ? "test-card--visible" : ""
      } ${inCart ? "ring-2 ring-vesta-orange/50" : ""}`}
      style={{ animationDelay: `${index * 80}ms` }}
      role="article"
      aria-labelledby={`test-${test.id}-title`}
    >
      <div className="relative overflow-hidden rounded-t-lg">
        <img
          src={test.image || "/placeholder.svg"}
          alt={`${test.name} diagnostic procedure`}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105 will-change-transform"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

        <span
          className={`absolute top-3 right-3 text-white text-xs px-3 py-1 rounded-full font-medium shadow-lg transition-opacity duration-300 ${
            test.popular ? "bg-gradient-to-r from-vesta-orange to-vesta-navy opacity-100" : "opacity-0"
          }`}
        >
          Popular
        </span>

        <div
          className={`absolute top-3 left-3 bg-vesta-orange text-white rounded-full p-1.5 shadow-lg transition-opacity duration-300 ${
            inCart ? "opacity-100" : "opacity-0"
          }`}
        >
          <Check className="w-4 h-4" />
        </div>
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

        <div className="flex gap-2">
          <Button
            onClick={handleCartAction}
            onKeyDown={handleKeyDown}
            variant={inCart ? "default" : "outline"}
            className={`flex-1 transition-all duration-300 ${
              inCart
                ? "bg-vesta-orange text-white border-vesta-orange hover:bg-vesta-orange/90"
                : "group-hover:bg-vesta-orange group-hover:text-white group-hover:border-vesta-orange bg-transparent border-slate-200 hover:shadow-md"
            } active:scale-95`}
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
            aria-label={`Book ${test.name} test`}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default React.memo(TestCard)