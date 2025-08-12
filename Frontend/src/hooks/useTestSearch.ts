"use client"

import { useCallback } from "react"
import type { MedicalTest, TestCategory } from "@/types/test"

export const useTestSearch = (tests: MedicalTest[], categories: TestCategory[]) => {
  const searchTests = useCallback(
    (query: string) => {
      if (!query.trim()) return tests

      const searchTerm = query.toLowerCase().trim()
      const results = new Set<MedicalTest>()

      tests.forEach((test) => {
        // Direct name match (highest priority)
        if (test.name.toLowerCase().includes(searchTerm)) {
          results.add(test)
          return
        }

        // Description match
        if (test.description?.toLowerCase().includes(searchTerm)) {
          results.add(test)
          return
        }

        // Test keywords match (with optional chaining)
        if (test.keywords?.some((keyword) => keyword.toLowerCase().includes(searchTerm))) {
          results.add(test)
          return
        }

        // Category keyword mapping
        const matchingCategory = categories.find((category) =>
          category.keywords?.some((keyword) => keyword.toLowerCase().includes(searchTerm)),
        )

        if (matchingCategory && test.category === matchingCategory.id) {
          results.add(test)
        }
      })

      return Array.from(results)
    },
    [tests, categories],
  )

  return { searchTests }
}
