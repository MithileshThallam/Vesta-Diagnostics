"use client"

import type React from "react"
import type { TestCategory } from "@/types/test"

interface CategoryFilterProps {
  categories: TestCategory[]
  activeCategory: string
  onCategoryChange: (categoryId: string) => void
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ categories, activeCategory, onCategoryChange }) => {
  return (
    <section className="pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button
            onClick={() => onCategoryChange("all")}
            className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
              activeCategory === "all"
                ? "bg-gradient-primary text-white shadow-lg scale-105"
                : "bg-white/80 text-slate-600 hover:bg-white hover:shadow-md hover:scale-102"
            }`}
            aria-pressed={activeCategory === "all"}
          >
            All Tests
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 flex items-center space-x-2 ${
                activeCategory === category.id
                  ? "bg-gradient-primary text-white shadow-lg scale-105"
                  : "bg-white/80 text-slate-600 hover:bg-white hover:shadow-md hover:scale-102"
              }`}
              aria-pressed={activeCategory === category.id}
            >
              <span>{category.icon}</span>
              <span>{category.name}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CategoryFilter
