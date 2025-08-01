"use client"

import type React from "react"
import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import TestCard from "./TestCard"
import TestModal from "./TestDetailsModal"
import type { TestCategory, MedicalTest } from "@/types/test"

interface TestsGridProps {
  groupedTests: { [key: string]: MedicalTest[] }
  categories: TestCategory[]
  isVisible: boolean
  onClearAllFilters: () => void
}

const TestsGrid: React.FC<TestsGridProps> = ({ groupedTests, categories, isVisible, onClearAllFilters }) => {
  const [selectedTest, setSelectedTest] = useState<MedicalTest | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const scrollRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})

  const hasResults = Object.keys(groupedTests).length > 0

  const handleTestClick = (test: MedicalTest) => {
    setSelectedTest(test)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedTest(null)
  }

  const scrollLeft = (categoryId: string) => {
    const container = scrollRefs.current[categoryId]
    if (container) {
      container.scrollBy({ left: -320, behavior: "smooth" })
    }
  }

  const scrollRight = (categoryId: string) => {
    const container = scrollRefs.current[categoryId]
    if (container) {
      container.scrollBy({ left: 320, behavior: "smooth" })
    }
  }

  if (!hasResults) {
    return (
      <div className="text-center py-16" role="status" aria-live="polite">
        <div className="text-6xl mb-4">🔍</div>
        <h3 className="text-2xl font-semibold text-slate-900 mb-2">No tests found</h3>
        <p className="text-slate-600 mb-6">
          Try adjusting your search or filter criteria. You can search by test names, categories, or symptoms.
        </p>
        <Button onClick={onClearAllFilters} variant="premium">
          Clear All Filters
        </Button>
      </div>
    )
  }

  return (
    <>
      <div className="space-y-12">
        {Object.entries(groupedTests).map(([categoryId, tests]) => {
          const category = categories.find((cat) => cat.id === categoryId)
          if (!category) return null

          return (
            <div key={categoryId} className="space-y-6">
              {/* Category Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${category.color} p-4 flex items-center justify-center text-2xl shadow-lg`}
                  >
                    {category.icon}
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-slate-900">{category.name}</h2>
                    <p className="text-slate-600">{category.description}</p>
                    <p className="text-sm text-slate-500 mt-1">
                      {tests.length} test{tests.length !== 1 ? "s" : ""} available
                    </p>
                  </div>
                </div>

                {/* Navigation Buttons */}
                {tests.length > 3 && (
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => scrollLeft(categoryId)}
                      className="p-2 bg-white/80 hover:bg-white shadow-sm"
                      aria-label={`Scroll ${category.name} tests left`}
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => scrollRight(categoryId)}
                      className="p-2 bg-white/80 hover:bg-white shadow-sm"
                      aria-label={`Scroll ${category.name} tests right`}
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </div>

              {/* Horizontal Scrollable Tests */}
              <div className="relative">
                <div
                  ref={(el) => {
                    if (el) {
                      scrollRefs.current[categoryId] = el
                    }
                  }}
                  className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 scroll-smooth"
                  style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                >
                  {tests.map((test, index) => (
                    <TestCard
                      key={test.id}
                      test={test}
                      index={index}
                      isVisible={isVisible}
                      onTestClick={handleTestClick}
                    />
                  ))}
                </div>

                {/* Gradient Fade Effects */}
                <div className="absolute top-0 left-0 w-8 h-full bg-gradient-to-r from-white to-transparent pointer-events-none z-10" />
                <div className="absolute top-0 right-0 w-8 h-full bg-gradient-to-l from-white to-transparent pointer-events-none z-10" />
              </div>
            </div>
          )
        })}
      </div>

      {/* Test Detail Modal */}
      <TestModal test={selectedTest} isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  )
}

export default TestsGrid
