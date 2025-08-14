"use client"

import React, { useState, useMemo, useCallback, useRef, useEffect } from "react"
import TestCard from "./TestCard"
import TestModal from "./TestDetailsModal"
import InstantBookingModal from "../InstantBookingModal"
import type { MedicalTest, TestCategory } from "@/types/test"
import { useInView } from "react-intersection-observer"

interface TestsGridProps {
  groupedTests: { [key: string]: MedicalTest[] }
  categories: TestCategory[]
  onClearAllFilters: () => void
}

const TestsGrid: React.FC<TestsGridProps> = ({ groupedTests, categories, onClearAllFilters }) => {
  const [modalState, setModalState] = useState({
    selectedTest: null as MedicalTest | null,
    isModalOpen: false,
    isBookingModalOpen: false
  })

  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [isScrolling, setIsScrolling] = useState(false)
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [containerRef, isContainerInView] = useInView({ threshold: 0.1 })

  // Memoized data
  const categoriesWithTests = useMemo(() => Object.entries(groupedTests), [groupedTests])
  const categoryMap = useMemo(() => new Map(categories.map(cat => [cat.id, cat])), [categories])

  // Memoized handlers
  const handleTestClick = useCallback((test: MedicalTest) => {
    setModalState(prev => ({ ...prev, selectedTest: test, isModalOpen: true }))
  }, [])

  const handleInstantBook = useCallback((test: MedicalTest) => {
    setModalState(prev => ({ ...prev, selectedTest: test, isBookingModalOpen: true }))
  }, [])

  const closeModal = useCallback(() => {
    setModalState(prev => ({ ...prev, isModalOpen: false, selectedTest: null }))
  }, [])

  const closeBookingModal = useCallback(() => {
    setModalState(prev => ({ ...prev, isBookingModalOpen: false, selectedTest: null }))
  }, [])

  // Precompute category info
  const getCategoryInfo = useCallback((categoryId: string) => {
    return categoryMap.get(categoryId) || { name: categoryId, icon: "🔬", color: "blue" }
  }, [categoryMap])

  // Smooth scrolling effect
  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    const handleScroll = () => {
      setIsScrolling(true)
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false)
      }, 100)
    }

    container.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      container.removeEventListener('scroll', handleScroll)
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
    }
  }, [])

  // No results state
  if (!categoriesWithTests.length) {
    return (
      <div className="text-center py-16">
        <div className="max-w-md mx-auto">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-2xl font-bold text-slate-900 mb-4">No tests found</h3>
          <p className="text-slate-600 mb-6">
            We couldn't find any tests matching your criteria.
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
      <div ref={containerRef} className="space-y-12">
        {categoriesWithTests.map(([categoryId, tests]) => {
          const categoryInfo = getCategoryInfo(categoryId)
          return (
            <div key={categoryId} className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="text-3xl">{categoryInfo.icon}</div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 capitalize">{categoryInfo.name}</h2>
                  <p className="text-slate-600">
                    {tests.length} test{tests.length !== 1 ? "s" : ""} available
                  </p>
                </div>
              </div>

              <div className="overflow-hidden" ref={scrollContainerRef}>
                <div className={`flex gap-6 overflow-x-auto pb-4 hide-scrollbar ${isScrolling ? 'scrolling' : ''}`}>
                  <div className="flex gap-6 min-w-max">
                    {tests.map((test, index) => (
                      <MemoizedTestCard
                        key={test.id}
                        test={test}
                        index={index}
                        isVisible={isContainerInView}
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

      {/* Lazy-loaded modals */}
      {modalState.isModalOpen && (
        <TestModal 
          test={modalState.selectedTest} 
          isOpen={modalState.isModalOpen} 
          onClose={closeModal} 
        />
      )}

      {modalState.isBookingModalOpen && (
        <InstantBookingModal
          test={modalState.selectedTest}
          isOpen={modalState.isBookingModalOpen}
          onClose={closeBookingModal}
          availableLocations={modalState.selectedTest?.locations || []}
        />
      )}
    </>
  )
}

// Memoized components
const MemoizedTestCard = React.memo(TestCard, (prevProps, nextProps) => {
  return (
    prevProps.test.id === nextProps.test.id &&
    prevProps.isVisible === nextProps.isVisible
  )
})

export default React.memo(TestsGrid)