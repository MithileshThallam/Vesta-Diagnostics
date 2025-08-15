"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { useState, useCallback, useMemo } from "react"
import UserProfile from "./UserProfile"
import { useUserStore } from "@/stores/userStore"
import { Link } from "react-router-dom"

// Static data moved outside component
const NAV_ITEMS = [
  { name: "Home", href: "/" },
  { name: "Tests", href: "/tests" },
  { name: "Franchise", href: "/franchise" },
  { name: "Contact", href: "/contactus" },
]

const TESTS_BY_CATEGORY = [
  {
    category: "endocrinology",
    tests: ["T3, T4, TSH", "LH", "FSH", "Testosterone", "Prolactin"],
  },
  {
    category: "haematology",
    tests: [
      "Complete Blood Count",
      "Erythrocyte Sedimentation Rate",
      "RBC Count",
      "WBC Count",
      "Platelet Count",
      "Blood Group",
    ],
  },
  {
    category: "microbiology",
    tests: ["Sputum for A+B", "Blood Cultures", "Urine Cultures", "Fungal Test (Skin)", "Fungal Test (Nail)"],
  },
  {
    category: "cardiology",
    tests: [
      "Lipoprotein",
      "Apolipoprotein A",
      "Apolipoprotein B",
      "High Sensitivity C-Reactive Protein",
      "ApoB/ApoA Ratio",
    ],
  },
  {
    category: "serology",
    tests: [
      "Widal Test",
      "Dengue Serology",
      "NDRL",
      "C-Reactive Protein",
      "ASO Titer",
      "Rheumatoid Factor",
      "PNT Test",
      "HCV Antibody",
      "HIV Test",
      "Malaria Parasite Antigen",
      "HBsAg",
    ],
  },
  {
    category: "immunology",
    tests: ["ANA Profile", "Anti-CCP Antibodies"],
  },
  {
    category: "biochemistry",
    tests: [
      "Random Blood Sugar",
      "Blood Urea",
      "Serum Creatinine",
      "Serum Uric Acid",
      "Serum Calcium",
      "Iron",
      "Cholesterol",
      "Triglycerides",
      "Serum Bilirubin",
      "SGOT (AST)",
      "SGPT (ALT)",
      "Serum Electrolytes",
      "Serum Proteins",
      "HbA1c",
      "Vitamin B12",
      "Vitamin D3",
      "Alkaline Phosphatase",
      "Gamma-Glutamyl Transferase",
      "Ferritin",
      "Total Iron-Binding Capacity",
    ],
  },
]

// Extracted dropdown component
const TestsDropdown = React.memo(({
  isVisible,
  hoveredCategory,
  onMouseEnter,
  onMouseLeave,
  onCategoryHover
}: {
  isVisible: boolean
  hoveredCategory: string | null
  onMouseEnter: () => void
  onMouseLeave: () => void
  onCategoryHover: (category: string) => void
}) => {
  const selectedTests = useMemo(() => {
    return hoveredCategory
      ? TESTS_BY_CATEGORY.find((cat) => cat.category === hoveredCategory)?.tests || []
      : []
  }, [hoveredCategory])

  return (
    <div
      className={`absolute top-6 -left-[300px] mt-2 w-[800px] bg-white shadow-dropdown rounded-lg border border-gray-200 z-50 ${isVisible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        } transition-opacity duration-200`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="flex h-[400px]">
        {/* Left Panel - Categories */}
        <CategoryList
          hoveredCategory={hoveredCategory}
          onCategoryHover={onCategoryHover}
        />

        {/* Right Panel - Tests */}
        <div className="w-2/3 p-4">
          {hoveredCategory ? (
            <div>
              <h3 className="text-lg font-semibold text-primary mb-4 capitalize">
                {hoveredCategory} Tests
              </h3>
              <div className="max-h-[320px] overflow-y-auto">
                <ul className="space-y-2">
                  {selectedTests.map((test) => (
                    <li key={test}>
                      <a
                        href="#"
                        className="block px-3 py-2 text-sm text-gray-700 hover:text-primary hover:bg-gray-50 rounded-md transition-colors"
                        onClick={(e) => e.preventDefault()}
                      >
                        {test}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <PlaceholderContent />
          )}
        </div>
      </div>
    </div>
  )
})

// Extracted category list component
const CategoryList = React.memo(({
  hoveredCategory,
  onCategoryHover
}: {
  hoveredCategory: string | null
  onCategoryHover: (category: string) => void
}) => {
  return (
    <div className="w-1/3 border-r border-gray-200 p-4">
      <h3 className="text-lg font-semibold text-primary mb-4">Test Categories</h3>
      <ul className="space-y-2">
        {TESTS_BY_CATEGORY.map((categoryData) => (
          <li key={categoryData.category}>
            <button
              className={`w-full text-left px-3 py-2 rounded-md text-sm capitalize transition-colors ${hoveredCategory === categoryData.category
                  ? "bg-primary/10 text-primary"
                  : "text-gray-700 hover:bg-gray-50"
                }`}
              onMouseEnter={() => onCategoryHover(categoryData.category)}
            >
              {categoryData.category}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
})

// Extracted placeholder component
const PlaceholderContent = React.memo(() => (
  <div className="flex items-center justify-center h-full text-center">
    <div>
      <div className="text-gray-400 mb-2">
        <svg
          className="w-12 h-12 mx-auto"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      </div>
      <p className="text-gray-500 text-sm">Hover over a category to view available tests</p>
    </div>
  </div>
))

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isTestsHovered, setIsTestsHovered] = useState(false)
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null)

  const { role } = useUserStore()
  const isAdmin = role === 'admin' || role === 'sub-admin'

  // Memoized event handlers
  const handleTestsMouseEnter = useCallback(() => setIsTestsHovered(true), [])
  const handleTestsMouseLeave = useCallback(() => {
    setIsTestsHovered(false)
    setHoveredCategory(null)
  }, [])

  const handleCategoryHover = useCallback((category: string) => {
    setHoveredCategory(category)
  }, [])

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prev => !prev)
  }, [])

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false)
  }, [])

  return (
    <header className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-sm shadow-soft border-b border-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a href="/" className="flex items-center space-x-3 flex-shrink-0">
            <img
              src="/logo.png"
              alt="Vesta Logo"
              width={48}
              height={48}
              className="h-10 w-10 lg:h-12 lg:w-12 object-contain rounded-xl"
            />
            <h1 className="text-xl lg:text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Vesta Diagnostics
            </h1>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8 relative">
            {NAV_ITEMS.map((item) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={item.name === "Tests" ? handleTestsMouseEnter : undefined}
                onMouseLeave={item.name === "Tests" ? handleTestsMouseLeave : undefined}
              >
                <Button variant="nav" size="sm" asChild className="text-base">
                  <a href={item.href}>{item.name}</a>
                </Button>

                {item.name === "Tests" && (
                  <TestsDropdown
                    isVisible={isTestsHovered}
                    hoveredCategory={hoveredCategory}
                    onMouseEnter={handleTestsMouseEnter}
                    onMouseLeave={handleTestsMouseLeave}
                    onCategoryHover={handleCategoryHover}
                  />
                )}
              </div>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            {isAdmin && (
              <Button
                variant="outline"
                size="sm"
                asChild
                className="text-primary border-primary hover:bg-primary/10"
              >
                <Link to={role === 'admin' ? '/admin' : '/sub-admin'}>
                  Admin Panel
                </Link>
              </Button>
            )}
            <UserProfile />
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6 text-foreground" /> : <Menu className="h-6 w-6 text-foreground" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-sm shadow-soft border-b border-gray-100">
            <div className="px-4 py-6 space-y-4">
              {NAV_ITEMS.map((item) => (
                <Button
                  key={item.name}
                  variant="nav"
                  size="lg"
                  asChild
                  className="w-full justify-start text-left"
                >
                  <a href={item.href} onClick={closeMenu}>
                    {item.name}
                  </a>
                </Button>
              ))}
              <div className="pt-4 border-t border-gray-100">
                {isAdmin && (
                  <Button
                    variant="outline"
                    size="lg"
                    asChild
                    className="w-full justify-start text-left border-primary text-primary hover:bg-primary/10"
                  >
                    <a
                      href={role === 'admin' ? '/admin' : '/sub-admin'}
                      onClick={closeMenu}
                    >
                      Admin Panel
                    </a>
                  </Button>
                )}
                <UserProfile />
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header