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
  id: string;
  name: string;
  category: string;
  duration: string;
  locations: string[];
  description: string;
  popular: boolean;
  keywords: string[];
  parts: string[];
  parameterCount: number;
  parameters: string[];
  about: string;
}


export interface FilterState {
  activeCategory: string
  searchQuery: string
  location: string
  sortBy: string
}
