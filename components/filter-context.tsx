"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

interface FilterState {
  priceRange: [number, number]
  selectedBrands: string[]
  selectedCategories: string[]
  selectedSubcategories: string[]
  selectedFeatures: string[]
}

interface FilterContextType extends FilterState {
  setPriceRange: (range: [number, number]) => void
  setSelectedBrands: (brands: string[]) => void
  setSelectedCategories: (categories: string[]) => void
  setSelectedSubcategories: (subcategories: string[]) => void
  setSelectedFeatures: (features: string[]) => void
  clearAllFilters: () => void
  hasActiveFilters: boolean
  activeFiltersCount: number
}

const FilterContext = createContext<FilterContextType | null>(null)

const initialState: FilterState = {
  priceRange: [0, 300000],
  selectedBrands: [],
  selectedCategories: [],
  selectedSubcategories: [],
  selectedFeatures: [],
}

export function FilterProvider({ children }: { children: ReactNode }) {
  const [priceRange, setPriceRange] = useState<[number, number]>(initialState.priceRange)
  const [selectedBrands, setSelectedBrands] = useState<string[]>(initialState.selectedBrands)
  const [selectedCategories, setSelectedCategories] = useState<string[]>(initialState.selectedCategories)
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>(initialState.selectedSubcategories)
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>(initialState.selectedFeatures)

  const clearAllFilters = () => {
    setPriceRange(initialState.priceRange)
    setSelectedBrands(initialState.selectedBrands)
    setSelectedCategories(initialState.selectedCategories)
    setSelectedSubcategories(initialState.selectedSubcategories)
    setSelectedFeatures(initialState.selectedFeatures)
  }

  const hasActiveFilters =
    selectedBrands.length > 0 ||
    selectedCategories.length > 0 ||
    selectedSubcategories.length > 0 ||
    selectedFeatures.length > 0 ||
    priceRange[0] > 0 ||
    priceRange[1] < 300000

  const activeFiltersCount =
    selectedBrands.length +
    selectedCategories.length +
    selectedSubcategories.length +
    selectedFeatures.length +
    (priceRange[0] > 0 || priceRange[1] < 300000 ? 1 : 0)

  return (
    <FilterContext.Provider
      value={{
        priceRange,
        selectedBrands,
        selectedCategories,
        selectedSubcategories,
        selectedFeatures,
        setPriceRange,
        setSelectedBrands,
        setSelectedCategories,
        setSelectedSubcategories,
        setSelectedFeatures,
        clearAllFilters,
        hasActiveFilters,
        activeFiltersCount,
      }}
    >
      {children}
    </FilterContext.Provider>
  )
}

export function useFilters() {
  const context = useContext(FilterContext)
  if (!context) {
    throw new Error("useFilters must be used within a FilterProvider")
  }
  return context
}
