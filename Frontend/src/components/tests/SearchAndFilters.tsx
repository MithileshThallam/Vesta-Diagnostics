"use client"

import type React from "react"
import { Search, MapPin, Filter, SortAsc, X } from "lucide-react"
import type { TestLocation, FilterState } from "@/types/test"

interface SearchAndFiltersProps {
  filters: FilterState
  locations: TestLocation[]
  resultsCount: number
  showFilters: boolean
  searchInputRef: React.RefObject<HTMLInputElement | null>; 
  onSearchChange: (value: string) => void
  onLocationChange: (value: string) => void
  onSortChange: (value: string) => void
  onToggleFilters: () => void
  onClearSearch: () => void
  onClearAllFilters: () => void
}

const SearchAndFilters: React.FC<SearchAndFiltersProps> = ({
  filters,
  locations,
  resultsCount,
  showFilters,
  searchInputRef,
  onSearchChange,
  onLocationChange,
  onSortChange,
  onToggleFilters,
  onClearSearch,
  onClearAllFilters,
}) => {
  const hasActiveFilters =
    filters.searchQuery ||
    filters.activeCategory !== "all" ||
    filters.selectedLocation !== "all" ||
    filters.sortBy !== "name"

  return (
    <div className="max-w-4xl mx-auto">
      {/* Search Bar */}
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
        <input
          ref={searchInputRef}
          type="text"
          placeholder="Search tests by name, category, or symptoms (e.g., 'brain', 'heart', 'blood')..."
          value={filters.searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-12 pr-16 py-4 rounded-2xl border border-slate-200 bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-vesta-orange/50 focus:border-vesta-orange transition-all duration-300 text-lg"
          aria-label="Search medical tests"
          aria-describedby="search-help"
        />
        {filters.searchQuery && (
          <button
            onClick={onClearSearch}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
            aria-label="Clear search"
          >
            <X className="w-5 h-5" />
          </button>
        )}
        <div id="search-help" className="sr-only">
          Search for medical tests by name, category, or related symptoms and keywords
        </div>
      </div>

      {/* Filter Controls */}
      <div className="flex flex-wrap items-center gap-4 mb-8">
        {/* Mobile Filter Toggle */}
        <button
          onClick={onToggleFilters}
          className="lg:hidden flex items-center space-x-2 px-4 py-2 bg-white/80 rounded-lg border border-slate-200 hover:bg-white transition-colors"
          aria-expanded={showFilters}
          aria-controls="filter-controls"
        >
          <Filter className="w-4 h-4" />
          <span>Filters</span>
        </button>

        {/* Filter Controls */}
        <div
          id="filter-controls"
          className={`${showFilters ? "flex" : "hidden lg:flex"} flex-wrap items-center gap-4 w-full lg:w-auto`}
        >
          {/* Location Filter */}
          <div className="relative">
            <select
              value={filters.selectedLocation}
              onChange={(e) => onLocationChange(e.target.value)}
              className="appearance-none bg-white/80 border border-slate-200 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-vesta-orange/50 transition-all duration-300"
              aria-label="Filter by location"
            >
              <option value="all">All Locations</option>
              {locations.map((location) => (
                <option key={location.id} value={location.id}>
                  {location.name}
                </option>
              ))}
            </select>
            <MapPin className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          </div>

          {/* Sort Options */}
          <div className="relative">
            <select
              value={filters.sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="appearance-none bg-white/80 border border-slate-200 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-vesta-orange/50 transition-all duration-300"
              aria-label="Sort tests"
            >
              <option value="name">Sort by Name</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
            <SortAsc className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          </div>

          {/* Clear Filters */}
          {hasActiveFilters && (
            <button
              onClick={onClearAllFilters}
              className="px-4 py-2 text-sm text-slate-600 hover:text-vesta-orange transition-colors"
              aria-label="Clear all filters"
            >
              Clear All
            </button>
          )}
        </div>

        {/* Results Count */}
        <div className="text-sm text-slate-600 ml-auto">
          {resultsCount} test{resultsCount !== 1 ? "s" : ""} found
        </div>
      </div>
    </div>
  )
}

export default SearchAndFilters