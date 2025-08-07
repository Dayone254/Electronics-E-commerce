import { Suspense } from "react"
import { UniversalProductGrid } from "@/components/universal-product-grid"
import { LaptopCardSkeleton } from "@/components/laptop-card-skeleton"
import { UniversalFilterSidebar } from "@/components/universal-filter-sidebar"
import { FilterMobileDrawer } from "@/components/filter-mobile-drawer"
import { ActiveFilters } from "@/components/active-filters"
import { SortDropdown } from "@/components/sort-dropdown"
import { electronicsInventory } from "@/lib/electronics-inventory"
import { notFound } from "next/navigation"

interface TVCategoryPageProps {
  params: { category: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

const categoryMap: { [key: string]: string } = {
  smart: "Smart TVs",
  "4k": "4K Ultra HD TVs",
  oled: "OLED TVs",
  qled: "QLED TVs",
  gaming: "Gaming TVs",
  budget: "Budget TVs",
  premium: "Premium TVs",
  "32-inch": "32 Inch TVs",
  "43-inch": "43 Inch TVs",
  "55-inch": "55 Inch TVs",
  "65-inch": "65 Inch TVs",
}

const categoryDescriptions: { [key: string]: string } = {
  smart:
    "Experience the future of entertainment with our smart TV collection featuring streaming apps and voice control.",
  "4k": "Immerse yourself in stunning 4K Ultra HD resolution with crystal-clear picture quality and vibrant colors.",
  oled: "Perfect blacks and infinite contrast with our premium OLED TV collection for the ultimate viewing experience.",
  qled: "Quantum Dot technology delivers brilliant colors and exceptional brightness in our QLED TV range.",
  gaming: "Optimized for gaming with low input lag, high refresh rates, and gaming-specific features.",
  budget: "Affordable TVs that deliver great value without compromising on essential features and quality.",
  premium: "Top-tier televisions with the latest technology, premium design, and exceptional performance.",
  "32-inch": "Perfect for bedrooms and small spaces with our 32-inch TV collection.",
  "43-inch": "Ideal for medium-sized rooms with our versatile 43-inch television range.",
  "55-inch": "The sweet spot for most living rooms with our popular 55-inch TV selection.",
  "65-inch": "Big screen entertainment for large spaces with our impressive 65-inch TV collection.",
}

export async function generateMetadata({ params }: TVCategoryPageProps) {
  const category = params.category
  const categoryName = categoryMap[category]

  if (!categoryName) {
    return {
      title: "Category Not Found - Apex Laptops",
    }
  }

  return {
    title: `${categoryName} - Apex Laptops Television Collection`,
    description: categoryDescriptions[category] || `Browse our collection of ${categoryName.toLowerCase()}.`,
  }
}

export default function TVCategoryPage({ params, searchParams }: TVCategoryPageProps) {
  const category = params.category
  const categoryName = categoryMap[category]

  if (!categoryName) {
    notFound()
  }

  const brand = searchParams.brand as string

  // Filter TVs based on category
  let filteredProducts = electronicsInventory.filter((product) => {
    if (product.category !== "tvs") return false

    const productName = product.name.toLowerCase()
    const specs = product.specs
    const price = product.salePrice || product.price

    if (category === "smart" && (productName.includes("smart") || specs.features?.includes("Smart TV"))) return true
    if (category === "4k" && (productName.includes("4k") || specs.display?.includes("4K"))) return true
    if (category === "oled" && (productName.includes("oled") || specs.display?.includes("OLED"))) return true
    if (category === "qled" && (productName.includes("qled") || specs.display?.includes("QLED"))) return true
    if (category === "gaming" && (productName.includes("gaming") || specs.features?.includes("Gaming Mode")))
      return true
    if (category === "budget" && price < 50000) return true
    if (category === "premium" && price > 150000) return true
    if (category === "32-inch" && productName.includes("32")) return true
    if (category === "43-inch" && productName.includes("43")) return true
    if (category === "55-inch" && productName.includes("55")) return true
    if (category === "65-inch" && productName.includes("65")) return true

    return false
  })

  if (brand) {
    filteredProducts = filteredProducts.filter((product) => product.brand.toLowerCase() === brand.toLowerCase())
  }

  const totalProducts = filteredProducts.length
  const inStockProducts = filteredProducts.filter((product) => product.inStock).length

  const pageTitle = brand ? `${brand} ${categoryName}` : categoryName
  const pageDescription = brand
    ? `Browse ${brand} ${categoryName.toLowerCase()} in our collection`
    : categoryDescriptions[category] || `Discover our ${categoryName.toLowerCase()} collection`

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      {/* Header */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <nav className="flex items-center space-x-2 text-xs text-gray-500 mb-3">
                <a href="/" className="hover:text-purple-600 transition-colors">
                  Home
                </a>
                <span>/</span>
                <a href="/tvs" className="hover:text-purple-600 transition-colors">
                  TVs
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
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-3 rounded-lg">
                <div className="text-xs font-medium">📺 {categoryName}</div>
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
                    Showing <span className="font-medium text-purple-600">{inStockProducts}</span> of{" "}
                    <span className="font-medium">{totalProducts}</span> results
                    <span className="text-purple-600"> in {categoryName}</span>
                  </p>
                </div>
              </div>
              <SortDropdown />
            </div>

            {/* Active Filters */}
            <ActiveFilters
              filters={{
                brands: brand ? [brand] : [],
                categories: ["TVs"],
                subcategories: [categoryName],
                features: [],
                priceRange: [0, 300000] as [number, number],
              }}
              onRemoveFilter={(type: string, value?: string) => {
                if (type === "brand" && value === brand) {
                  window.location.href = `/tvs/${category}`
                }
              }}
              onClearAll={() => {
                window.location.href = `/tvs/${category}`
              }}
            />

            {/* Product Grid */}
            <Suspense
              fallback={
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {[...Array(9)].map((_, i) => (
                    <LaptopCardSkeleton key={i} />
                  ))}
                </div>
              }
            >
              <UniversalProductGrid products={filteredProducts} />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  )
}
