"use client"

import React from 'react'
import { useState, useEffect, useRef, useCallback, useMemo } from "react"
import Header from "@/components/Header"
import TestsHeroSection from "@/components/tests/TestsHeroSection"
import SearchAndFilters from "@/components/tests/SearchAndFilters"
import CategoryFilter from "@/components/tests/CategoryFilter"
import TestsGrid from "@/components/tests/TestsGrid"
import { useTestSearch } from "@/hooks/useTestSearch"
import { useTestFilters } from "@/hooks/useTestFilters"
import { testCategories as allTestCategories, locations as allLocations } from "@/data/testData"
import type { FilterState, MedicalTest } from "@/types/test"
import debounce from "lodash.debounce"

// Memoize static data to prevent re-renders
const testCategories = allTestCategories
const locations = allLocations

const Tests = () => {
  // Filter state
  const [filters, setFilters] = useState<FilterState>({
    activeCategory: "all",
    searchQuery: "",
    location: "all",
    sortBy: "name",
  })

  // UI state
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("")
  const [isVisible, setIsVisible] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const [medicalTests, setMedicalTests] = useState<MedicalTest[]>([])

  // Memoized debounce function
  const debounceSearch = useMemo(
    () => debounce((query: string) => setDebouncedSearchQuery(query), 300),
    []
  )

  useEffect(() => {
    return () => debounceSearch.cancel()
  }, [debounceSearch])

  // Debounce search query for performance
  useEffect(() => {
    debounceSearch(filters.searchQuery)
  }, [filters.searchQuery, debounceSearch])

  // Intersection observer for visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
        if (entry.isIntersecting) {
          observer.disconnect()
        }
      },
      { threshold: 0.1, rootMargin: '100px' }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  // Memoized fetch function with AbortController
  const fetchTests = useCallback(async () => {
    const controller = new AbortController()
    const signal = controller.signal

    try {
      const res = await fetch("http://localhost:5000/api/tests/all", {
        method: 'GET',
        signal
      })
      const response = await res.json()
      
      if (response.tests) {
        setMedicalTests(response.tests)
      }
    } catch (error: any) {
      if (error.name !== 'AbortError') {
        console.error("Failed to fetch tests:", error)
      }
    }

    return () => controller.abort()
  }, [])

  useEffect(() => {
    fetchTests()
  }, [fetchTests])

  // Custom hooks for search and filtering with memoization
  const { searchTests } = useTestSearch(medicalTests, testCategories)
  const searchResults = useMemo(
    () => searchTests(debouncedSearchQuery),
    [debouncedSearchQuery, searchTests]
  )

  const { filteredAndSortedTests, groupedTests } = useTestFilters(
    medicalTests,
    searchResults,
    filters
  )

  // Memoize filtered results
  const memoizedFilteredTests = useMemo(
    () => filteredAndSortedTests,
    [filteredAndSortedTests]
  )
  const memoizedGroupedTests = useMemo(
    () => groupedTests,
    [groupedTests]
  )

  // Memoized event handlers
  const handleSearchChange = useCallback((value: string) => {
    setFilters((prev) => ({ ...prev, searchQuery: value }))
  }, [])

  const handleLocationChange = useCallback((value: string) => {
    setFilters((prev) => ({ ...prev, location: value }))
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
      location: "all",
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

      <div className="container mx-auto px-2 mt-10 sm:px-6 lg:px-8">
        <SearchAndFilters
          filters={filters}
          locations={locations}
          resultsCount={memoizedFilteredTests.length}
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
            groupedTests={memoizedGroupedTests}
            categories={testCategories}
            isVisible={isVisible}
            onClearAllFilters={handleClearAllFilters}
          />
        </div>
      </section>
    </div>
  )
}

export default React.memo(Tests)