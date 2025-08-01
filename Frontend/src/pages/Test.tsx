"use client"

import type React from "react"
import { useState, useEffect, useRef, useCallback } from "react"
import Header from "@/components/Header"
import TestsHeroSection from "@/components/tests/TestsHeroSection"
import SearchAndFilters from "@/components/tests/SearchAndFilters"
import CategoryFilter from "@/components/tests/CategoryFilter"
import TestsGrid from "@/components/tests/TestsGrid"
import { useTestSearch } from "@/hooks/useTestSearch"
import { useTestFilters } from "@/hooks/useTestFilters"
import { testCategories, locations, medicalTests } from "@/data/testData"
import type { FilterState } from "@/types/test"

const Tests = () => {
  // Filter state
  const [filters, setFilters] = useState<FilterState>({
    activeCategory: "all",
    searchQuery: "",
    selectedLocation: "all",
    sortBy: "name",
  })

  // UI state
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("")
  const [isVisible, setIsVisible] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Debounce search query for performance
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(filters.searchQuery)
    }, 300)

    return () => clearTimeout(timer)
  }, [filters.searchQuery])

  // Intersection observer for visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  // Custom hooks for search and filtering
  const { searchTests } = useTestSearch(medicalTests, testCategories)
  const searchResults = searchTests(debouncedSearchQuery)
  const { filteredAndSortedTests, groupedTests } = useTestFilters(medicalTests, searchResults, filters)

  // Event handlers
  const handleSearchChange = useCallback((value: string) => {
    setFilters((prev) => ({ ...prev, searchQuery: value }))
  }, [])

  const handleLocationChange = useCallback((value: string) => {
    setFilters((prev) => ({ ...prev, selectedLocation: value }))
  }, [])

  const handleSortChange = useCallback((value: string) => {
    setFilters((prev) => ({ ...prev, sortBy: value }))
  }, [])

  const handleCategoryChange = useCallback((value: string) => {
    setFilters((prev) => ({ ...prev, activeCategory: value }))
  }, [])

  const handleToggleFilters = useCallback(() => {
    setShowFilters((prev) => !prev)
  }, [])

  const handleClearSearch = useCallback(() => {
    setFilters((prev) => ({ ...prev, searchQuery: "" }))
  }, [])

  const handleClearAllFilters = useCallback(() => {
    setFilters({
      activeCategory: "all",
      searchQuery: "",
      selectedLocation: "all",
      sortBy: "name",
    })
  }, [])

  // Keyboard navigation support
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClearSearch()
        setShowFilters(false)
      }
      if (e.key === "/" && e.ctrlKey) {
        e.preventDefault()
        searchInputRef.current?.focus()
      }
    },
    [handleClearSearch],
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50" onKeyDown={handleKeyDown}>
      <Header />

      <TestsHeroSection />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <SearchAndFilters
          filters={filters}
          locations={locations}
          resultsCount={filteredAndSortedTests.length}
          showFilters={showFilters}
          searchInputRef={searchInputRef}
          onSearchChange={handleSearchChange}
          onLocationChange={handleLocationChange}
          onSortChange={handleSortChange}
          onToggleFilters={handleToggleFilters}
          onClearSearch={handleClearSearch}
          onClearAllFilters={handleClearAllFilters}
        />
      </div>

      <CategoryFilter
        categories={testCategories}
        activeCategory={filters.activeCategory}
        onCategoryChange={handleCategoryChange}
      />

      <section ref={sectionRef} className="pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <TestsGrid
            groupedTests={groupedTests}
            categories={testCategories}
            isVisible={isVisible}
            onClearAllFilters={handleClearAllFilters}
          />
        </div>
      </section>
    </div>
  )
}

export default Tests
