"use client"

import type React from "react"
import { useState } from "react"
import TestCard from "./TestCard"
import TestModal from "./TestDetailsModal"
import InstantBookingModal from "../InstantBookingModal"
import type { MedicalTest, TestCategory } from "@/types/test"

interface TestsGridProps {
  groupedTests: { [key: string]: MedicalTest[] }
  categories: TestCategory[]
  isVisible: boolean
  onClearAllFilters: () => void
}

const TestsGrid: React.FC<TestsGridProps> = ({ groupedTests, categories, isVisible, onClearAllFilters }) => {
  const [selectedTest, setSelectedTest] = useState<MedicalTest | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false)

  const handleTestClick = (test: MedicalTest) => {
    setSelectedTest(test)
    setIsModalOpen(true)
  }

  const handleInstantBook = (test: MedicalTest) => {
    setSelectedTest(test)
    setIsBookingModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedTest(null)
  }

  const getCategoryInfo = (categoryId: string) => {
    return categories.find((cat) => cat.id === categoryId) || { name: categoryId, icon: "🔬", color: "blue" }
  }

  const hasTests = Object.keys(groupedTests).length > 0

  if (!hasTests) {
    return (
      <div className="text-center py-16">
        <div className="max-w-md mx-auto">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-2xl font-bold text-slate-900 mb-4">No tests found</h3>
          <p className="text-slate-600 mb-6">
            We couldn't find any tests matching your criteria. Try adjusting your search or filters.
          </p>
          <button
            onClick={onClearAllFilters}
            className="px-6 py-3 bg-gradient-to-r from-vesta-orange to-vesta-navy text-white rounded-lg hover:shadow-lg transition-all duration-300"
          >
            Clear All Filters
          </button>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="space-y-12">
        {Object.entries(groupedTests).map(([categoryId, tests]) => {
          const categoryInfo = getCategoryInfo(categoryId)
          return (
            <div key={categoryId} className="space-y-6">
              {/* Category Header */}
              <div className="flex items-center gap-4">
                <div className="text-3xl">{categoryInfo.icon}</div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 capitalize">{categoryInfo.name}</h2>
                  <p className="text-slate-600">
                    {tests.length} test{tests.length !== 1 ? "s" : ""} available
                  </p>
                </div>
              </div>

              {/* Horizontal Scrollable Row (Scrollbar Hidden) */}
              <div className="overflow-hidden">
                <div className="flex gap-6 overflow-x-auto pb-4 hide-scrollbar">
                  <div className="flex gap-6 min-w-max">
                    {tests.map((test, index) => (
                      <TestCard
                        key={test.id}
                        test={test}
                        index={index}
                        isVisible={isVisible}
                        onTestClick={handleTestClick}
                        onInstantBook={handleInstantBook}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Test Details Modal */}
      <TestModal test={selectedTest} isOpen={isModalOpen} onClose={closeModal} />

      {/* Instant Booking Modal */}
      <InstantBookingModal
        test={selectedTest}
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        availableLocations={selectedTest?.locations || []}
      />
    </>
  )
}

export default TestsGrid