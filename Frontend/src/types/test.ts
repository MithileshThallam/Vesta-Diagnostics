export interface TestLocation {
    id: string
    name: string
  }
  
  export interface TestCategory {
    id: string
    name: string
    icon: string
    color: string
    description: string
    keywords: string[]
  }
  
  export interface MedicalTest {
    id: string
    name: string
    category: string
    price: number
    priceDisplay: string
    duration: string
    locations: string[]
    locationNames: string[]
    description: string
    popular: boolean
    image: string
    keywords: string[]
  }
  
  export interface FilterState {
    activeCategory: string
    searchQuery: string
    selectedLocation: string
    sortBy: string
  }
  