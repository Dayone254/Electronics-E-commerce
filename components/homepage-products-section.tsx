"use client";
import { Suspense } from "react"
import { UniversalProductGrid } from "@/components/universal-product-grid"
import { LaptopCardSkeleton } from "@/components/laptop-card-skeleton"
import { UniversalFilterSidebar } from "@/components/universal-filter-sidebar"
import { FilterMobileDrawer } from "@/components/filter-mobile-drawer"
import { ActiveFilters } from "@/components/active-filters"
import { SortDropdown } from "@/components/sort-dropdown"
import { electronicsInventory } from "@/lib/electronics-inventory"
import { FilterProvider, useFilters } from "@/components/filter-context"

export function HomepageProductsSection() {
  const totalProducts = electronicsInventory.length
  const inStockProducts = electronicsInventory.filter((product) => product.inStock).length

  // Get category counts
  const categoryStats = electronicsInventory.reduce(
    (acc, product) => {
      acc[product.category] = (acc[product.category] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  return (
    <FilterProvider>
      <div className="bg-gradient-to-br from-gray-50 to-blue-50">
        {/* Header */}
        <div className="bg-white border-b shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-semibold text-gray-900 mb-2">Shop All Electronics</h1>
                <p className="text-sm text-gray-600 mb-3">
                  Discover our complete collection of <span className="font-medium text-blue-600">{totalProducts}</span>{" "}
                  premium electronics (<span className="font-medium text-green-600">{inStockProducts}</span> in stock)
                </p>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(categoryStats).map(([category, count]) => (
                    <div key={category} className="bg-blue-50 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">
                      {count} {category}
                    </div>
                  ))}
                </div>
              </div>
              <div className="hidden lg:block">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3 rounded-lg">
                  <div className="text-xs font-medium">🎯 Universal Filtering</div>
                  <div className="text-xs opacity-90">Find any product instantly</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Desktop Filter Sidebar */}
            <div className="hidden lg:block lg:w-72 flex-shrink-0">
              <Suspense fallback={<div className="h-96 animate-pulse bg-white rounded-lg" />}>
                <UniversalFilterSidebar />
              </Suspense>
            </div>

            {/* Product Grid */}
            <div className="flex-1">
              {/* Mobile Filter Button & Sort Header */}
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center space-x-3">
                  <FilterMobileDrawer />
                  <div className="hidden sm:block">
                    <p className="text-xs text-gray-600">
                      Showing <span className="font-medium text-blue-600">{inStockProducts}</span> of{" "}
                      <span className="font-medium">{totalProducts}</span> results across all categories
                    </p>
                  </div>
                </div>
                <SortDropdown />
              </div>

              {/* Active Filters - Now functional */}
              <FilteredActiveFilters />

              {/* Product Grid - Now filtered */}
              <Suspense
                fallback={
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {[...Array(9)].map((_, i) => (
                      <LaptopCardSkeleton key={i} />
                    ))}
                  </div>
                }
              >
                <FilteredProductGrid />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </FilterProvider>
  )
}

// New component that uses the filter context
function FilteredActiveFilters() {
  const {
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
  } = useFilters()

  const removeFilter = (type: string, value?: string) => {
    switch (type) {
      case "price":
        setPriceRange([0, 300000])
        break
      case "category":
        setSelectedCategories(selectedCategories.filter((c) => c !== value))
        break
      case "subcategory":
        setSelectedSubcategories(selectedSubcategories.filter((s) => s !== value))
        break
      case "brand":
        setSelectedBrands(selectedBrands.filter((b) => b !== value))
        break
      case "feature":
        setSelectedFeatures(selectedFeatures.filter((f) => f !== value))
        break
    }
  }

  return (
    <ActiveFilters
      filters={{
        brands: selectedBrands,
        categories: selectedCategories,
        subcategories: selectedSubcategories,
        features: selectedFeatures,
        priceRange,
      }}
      onRemoveFilter={removeFilter}
      onClearAll={clearAllFilters}
    />
  )
}

// New component that filters products based on context
function FilteredProductGrid() {
  const { priceRange, selectedBrands, selectedCategories, selectedSubcategories, selectedFeatures } = useFilters()

  // Filter products based on active filters
  const filteredProducts = electronicsInventory.filter((product) => {
    // Price filter
    const price = product.salePrice || product.price
    if (price < priceRange[0] || price > priceRange[1]) return false

    // Category filter
    if (selectedCategories.length > 0 && !selectedCategories.includes(product.category)) return false

    // Subcategory filter
    if (selectedSubcategories.length > 0 && !selectedSubcategories.includes(product.subcategory)) return false

    // Brand filter
    if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand)) return false

    // Features filter
    if (selectedFeatures.length > 0) {
      const productFeatures = [
        product.badge,
        ...product.features,
        product.category === "phones" && product.price > 100000 ? "Flagship" : "",
        product.price > 200000 ? "Premium" : "",
        product.price < 50000 ? "Budget Friendly" : "",
        product.specs.display?.includes("4K") ? "4K Display" : "",
        product.specs.display?.includes("OLED") ? "OLED" : "",
        product.specs.display?.includes("Touch") ? "Touch Screen" : "",
        product.name.toLowerCase().includes("gaming") ? "Gaming" : "",
        product.name.toLowerCase().includes("business") || product.subcategory === "business" ? "Business" : "",
        product.specs.connectivity?.includes("WiFi 6") ? "WiFi 6" : "",
        product.specs.connectivity?.includes("5G") ? "5G" : "",
        product.specs.connectivity?.includes("Bluetooth") ? "Bluetooth" : "",
        product.specs.connectivity?.includes("USB-C") ? "USB-C" : "",
        product.specs.connectivity?.includes("Thunderbolt") ? "Thunderbolt" : "",
      ].filter(Boolean)

      const hasMatchingFeature = selectedFeatures.some((feature) =>
        productFeatures.some((pf) => pf.toLowerCase().includes(feature.toLowerCase())),
      )
      if (!hasMatchingFeature) return false
    }

    return true
  })

  return <UniversalProductGrid products={filteredProducts} />
}
