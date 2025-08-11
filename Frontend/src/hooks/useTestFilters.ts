"use client"

import { useMemo } from "react"
import type { MedicalTest, FilterState } from "@/types/test"

export const useTestFilters = (tests: MedicalTest[], searchResults: MedicalTest[], filters: FilterState) => {
  const filteredAndSortedTests = useMemo(() => {
    let filtered = searchResults

    // Filter by category
    if (filters.activeCategory !== "all") {
      filtered = filtered.filter((test) => test.category === filters.activeCategory)
    }

    // Filter by location
    if (filters.location !== "all") {
      filtered = filtered.filter((test) => test.locations.includes(filters.location))
    }

    // Sort tests
    const sorted = [...filtered].sort((a, b) => {
      switch (filters.sortBy) {
        case "name":
        default:
          return a.name.localeCompare(b.name)
      }
    })

    return sorted
  }, [searchResults, filters])

  // Group tests by category for display
  const groupedTests = useMemo(() => {
    const groups: { [key: string]: MedicalTest[] } = {}

    filteredAndSortedTests.forEach((test) => {
      if (!groups[test.category]) {
        groups[test.category] = []
      }
      groups[test.category].push(test)
    })

    return groups
  }, [filteredAndSortedTests])

  return {
    filteredAndSortedTests,
    groupedTests,
  }
}
