"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import TestCard from "./TestCard"
import type { TestCategory, MedicalTest } from "@/types/test"

interface TestsGridProps {
  groupedTests: { [key: string]: MedicalTest[] }
  categories: TestCategory[]
  isVisible: boolean
  onClearAllFilters: () => void
}

const TestsGrid: React.FC<TestsGridProps> = ({ groupedTests, categories, isVisible, onClearAllFilters }) => {
  const hasResults = Object.keys(groupedTests).length > 0

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
    <div>
      {Object.entries(groupedTests).map(([categoryId, tests]) => {
        const category = categories.find((cat) => cat.id === categoryId)
        if (!category) return null

        return (
          <div key={categoryId} className="mb-16">
            {/* Category Header */}
            <div className="flex items-center space-x-4 mb-8">
              <div
                className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${category.color} p-4 flex items-center justify-center text-2xl`}
              >
                {category.icon}
              </div>
              <div>
                <h2 className="text-3xl font-bold text-slate-900">{category.name}</h2>
                <p className="text-slate-600">{category.description}</p>
              </div>
            </div>

            {/* Tests Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {tests.map((test, index) => (
                <TestCard key={test.id} test={test} index={index} isVisible={isVisible} />
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default TestsGrid
