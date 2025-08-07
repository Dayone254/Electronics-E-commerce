import { Suspense } from "react"
import { LaptopGrid } from "@/components/laptop-grid"
import { LaptopCardSkeleton } from "@/components/laptop-card-skeleton"
import { FilterSidebar } from "@/components/filter-sidebar"
import { FilterMobileDrawer } from "@/components/filter-mobile-drawer"
import { ActiveFilters } from "@/components/active-filters"
import { SortDropdown } from "@/components/sort-dropdown"
import { laptopInventory } from "@/lib/laptop-inventory"
import { notFound } from "next/navigation"

interface LaptopCategoryPageProps {
  params: { category: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

const categoryMap: { [key: string]: string } = {
  gaming: "Gaming",
  business: "Business",
  student: "Student",
  convertible: "2-in-1",
  creator: "Creator",
}

const categoryDescriptions: { [key: string]: string } = {
  gaming:
    "High-performance gaming laptops with powerful graphics cards and fast processors for the ultimate gaming experience.",
  business:
    "Professional laptops designed for productivity, featuring long battery life and enterprise-grade security.",
  student:
    "Affordable and reliable laptops perfect for students, offering great value and essential features for academic work.",
  convertible:
    "Versatile 2-in-1 laptops that transform from laptop to tablet, perfect for creative work and presentations.",
  creator:
    "Powerful workstations for content creators, featuring high-resolution displays and professional-grade performance.",
}

export async function generateMetadata({ params }: LaptopCategoryPageProps) {
  const category = params.category
  const categoryName = categoryMap[category]

  if (!categoryName) {
    return {
      title: "Category Not Found - Apex Laptops",
    }
  }

  return {
    title: `${categoryName} Laptops - Apex Laptops`,
    description: categoryDescriptions[category] || `Browse our collection of ${categoryName.toLowerCase()} laptops.`,
  }
}

export default function LaptopCategoryPage({ params, searchParams }: LaptopCategoryPageProps) {
  const category = params.category
  const categoryName = categoryMap[category]

  if (!categoryName) {
    notFound()
  }

  const brand = searchParams.brand as string

  // Filter laptops based on category and other parameters
  let filteredLaptops = laptopInventory.filter((laptop) => {
    // Map our inventory categories to URL categories
    const laptopCategory = laptop.category.toLowerCase()
    if (category === "convertible" && laptopCategory === "2-in-1") return true
    if (category === "creator" && laptopCategory === "creator") return true
    return laptopCategory === category
  })

  if (brand) {
    filteredLaptops = filteredLaptops.filter((laptop) => laptop.brand.toLowerCase() === brand.toLowerCase())
  }

  const totalProducts = filteredLaptops.length
  const inStockProducts = filteredLaptops.filter((laptop) => laptop.inStock).length

  const pageTitle = brand ? `${brand} ${categoryName} Laptops` : `${categoryName} Laptops`
  const pageDescription = brand
    ? `Browse ${brand} ${categoryName.toLowerCase()} laptops in our collection`
    : categoryDescriptions[category] || `Discover our ${categoryName.toLowerCase()} laptop collection`

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
                <a href="/laptops" className="hover:text-blue-600 transition-colors">
                  Laptops
                </a>
                <span>/</span>
                <span className="text-gray-900 font-medium">{categoryName}</span>
              </nav>
              <h1 className="text-3xl font-semibold text-gray-900 mb-2">{pageTitle}</h1>
              <p className="text-sm text-gray-600 max-w-2xl">
                {pageDescription} (<span className="font-medium text-green-600">{inStockProducts}</span> in stock)
              </p>
            </div>
            <div className="hidden lg:block">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3 rounded-lg">
                <div className="text-xs font-medium">🎯 {categoryName} Collection</div>
                <div className="text-xs opacity-90">{totalProducts} models available</div>
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
                    Showing <span className="font-medium text-blue-600">{inStockProducts}</span> of{" "}
                    <span className="font-medium">{totalProducts}</span> results
                    <span className="text-blue-600"> in {categoryName} Laptops</span>
                  </p>
                </div>
              </div>
              <SortDropdown />
            </div>

            {/* Active Filters */}
            <ActiveFilters
              filters={{
                brands: brand ? [brand] : [],
                categories: [categoryName],
                subcategories: [],
                features: [],
                priceRange: [0, 300000] as [number, number],
              }}
              onRemoveFilter={(type: string, value?: string) => {
                if (type === "brand" && value === brand) {
                  // Remove brand filter by redirecting to category page without brand
                  window.location.href = `/laptops/${category}`
                }
              }}
              onClearAll={() => {
                // Clear all filters by redirecting to category page
                window.location.href = `/laptops/${category}`
              }}
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
