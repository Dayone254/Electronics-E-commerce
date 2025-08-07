import { Suspense } from "react"
import { LaptopGrid } from "@/components/laptop-grid"
import { LaptopCardSkeleton } from "@/components/laptop-card-skeleton"
import { FilterSidebar } from "@/components/filter-sidebar"
import { FilterMobileDrawer } from "@/components/filter-mobile-drawer"
import { ActiveFilters } from "@/components/active-filters"
import { SortDropdown } from "@/components/sort-dropdown"
import { laptopInventory } from "@/lib/laptop-inventory"

interface LaptopsPageProps {
  searchParams: { [key: string]: string | string[] | undefined }
}

export const metadata = {
  title: "Shop All Laptops - Apex Laptops",
  description:
    "Browse our complete collection of premium laptops from top brands. Find gaming, business, student, and 2-in-1 laptops with competitive prices in KSH.",
}

export default function LaptopsPage({ searchParams }: LaptopsPageProps) {
  const category = searchParams.category as string
  const brand = searchParams.brand as string

  // Filter laptops based on URL parameters
  let filteredLaptops = laptopInventory

  if (category) {
    filteredLaptops = filteredLaptops.filter((laptop) => laptop.category === category)
  }

  if (brand) {
    filteredLaptops = filteredLaptops.filter((laptop) => laptop.brand.toLowerCase() === brand.toLowerCase())
  }

  const totalProducts = laptopInventory.length
  const filteredCount = filteredLaptops.filter((laptop) => laptop.inStock).length
  const inStockProducts = laptopInventory.filter((laptop) => laptop.inStock).length

  // Get category display name
  const getCategoryDisplayName = (cat: string) => {
    const categoryNames: { [key: string]: string } = {
      gaming: "Gaming Laptops",
      business: "Business Laptops",
      student: "Student Laptops",
      convertible: "2-in-1 Convertibles",
      creator: "Creator Laptops",
    }
    return categoryNames[cat] || "All Laptops"
  }

  const pageTitle = category ? getCategoryDisplayName(category) : brand ? `${brand} Laptops` : "Shop All Laptops"
  const pageDescription = category
    ? `Discover our ${getCategoryDisplayName(category).toLowerCase()} collection`
    : brand
      ? `Browse all ${brand} laptops in our collection`
      : `Discover our complete collection of ${totalProducts} premium laptops`

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <nav className="flex items-center space-x-2 text-xs text-gray-500 mb-3">
                <a href="/" className="hover:text-blue-600 transition-colors">
                  Home
                </a>
                <span>/</span>
                {category && (
                  <>
                    <a href="/laptops" className="hover:text-blue-600 transition-colors">
                      Laptops
                    </a>
                    <span>/</span>
                  </>
                )}
                <span className="text-gray-900 font-medium">{pageTitle}</span>
              </nav>
              <h1 className="text-3xl font-semibold text-gray-900 mb-2">{pageTitle}</h1>
              <p className="text-sm text-gray-600">
                {pageDescription} (<span className="font-medium text-green-600">{filteredCount}</span> in stock)
              </p>
            </div>
            <div className="hidden lg:block">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3 rounded-lg">
                <div className="text-xs font-medium">🎯 Smart Filtering</div>
                <div className="text-xs opacity-90">Find your perfect match</div>
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
              <FilterSidebar />
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
                    Showing <span className="font-medium text-blue-600">{filteredCount}</span> of{" "}
                    <span className="font-medium">{totalProducts}</span> results
                    {category && <span className="text-blue-600"> in {getCategoryDisplayName(category)}</span>}
                  </p>
                </div>
              </div>
              <SortDropdown />
            </div>

            {/* Active Filters */}
            <ActiveFilters
              filters={{
                brands: brand ? [brand] : [],
                categories: category ? [category] : [],
                processors: [],
                ram: [],
                storage: [],
                priceRange: [0, 300000],
              }}
              onRemoveFilter={() => {}}
              onClearAll={() => {}}
            />

            {/* Laptop Grid */}
            <Suspense
              fallback={
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {[...Array(9)].map((_, i) => (
                    <LaptopCardSkeleton key={i} />
                  ))}
                </div>
              }
            >
              <LaptopGrid laptops={filteredLaptops} />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  )
}
