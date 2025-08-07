import { Suspense } from "react"
import { UniversalProductGrid } from "@/components/universal-product-grid"
import { LaptopCardSkeleton } from "@/components/laptop-card-skeleton"
import { UniversalFilterSidebar } from "@/components/universal-filter-sidebar"
import { FilterMobileDrawer } from "@/components/filter-mobile-drawer"
import { ActiveFilters } from "@/components/active-filters"
import { SortDropdown } from "@/components/sort-dropdown"
import { electronicsInventory } from "@/lib/electronics-inventory"
import { notFound } from "next/navigation"
import AccessoryCategoryFilters from "./AccessoryCategoryFilters";

interface AccessoryCategoryPageProps {
  params: { category: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

const categoryMap: { [key: string]: string } = {
  bags: "Laptop Bags",
  chargers: "Chargers & Adapters",
  keyboards: "Keyboards",
  mice: "Mice & Trackpads",
  headphones: "Headphones",
  speakers: "Speakers",
  webcams: "Webcams",
  stands: "Laptop Stands",
  cables: "Cables & Adapters",
  storage: "External Storage",
}

const categoryDescriptions: { [key: string]: string } = {
  bags: "Protect your laptop with our premium collection of laptop bags, backpacks, and sleeves.",
  chargers: "Keep your devices powered with our range of chargers, adapters, and power banks.",
  keyboards: "Enhance your typing experience with mechanical, wireless, and ergonomic keyboards.",
  mice: "Precision and comfort with our selection of wireless, gaming, and ergonomic mice.",
  headphones: "Immerse yourself in crystal-clear audio with our headphones and earbuds collection.",
  speakers: "Fill your space with rich sound from our portable and desktop speaker systems.",
  webcams: "Stay connected with high-definition webcams for video calls and streaming.",
  stands: "Improve your workspace ergonomics with adjustable laptop stands and risers.",
  cables: "Connect all your devices with our comprehensive range of cables and adapters.",
  storage: "Expand your storage capacity with external hard drives and SSDs.",
}

export async function generateMetadata({ params }: AccessoryCategoryPageProps) {
  const category = params.category
  const categoryName = categoryMap[category]

  if (!categoryName) {
    return {
      title: "Category Not Found - Apex Laptops",
    }
  }

  return {
    title: `${categoryName} - Apex Laptops Accessories`,
    description: categoryDescriptions[category] || `Browse our collection of ${categoryName.toLowerCase()}.`,
  }
}

export default function AccessoryCategoryPage({ params, searchParams }: AccessoryCategoryPageProps) {
  const category = params.category
  const categoryName = categoryMap[category]

  if (!categoryName) {
    notFound()
  }

  const brand = searchParams.brand as string

  // Filter accessories based on category
  let filteredProducts = electronicsInventory.filter((product) => {
    if (product.category !== "accessories") return false

    // Map subcategories to URL categories
    const subcategory = product.subcategory.toLowerCase()
    if (category === "bags" && (subcategory.includes("bag") || subcategory.includes("sleeve"))) return true
    if (category === "chargers" && (subcategory.includes("charger") || subcategory.includes("adapter"))) return true
    if (category === "keyboards" && subcategory.includes("keyboard")) return true
    if (category === "mice" && (subcategory.includes("mouse") || subcategory.includes("mice"))) return true
    if (category === "headphones" && (subcategory.includes("headphone") || subcategory.includes("earbuds"))) return true
    if (category === "speakers" && subcategory.includes("speaker")) return true
    if (category === "webcams" && subcategory.includes("webcam")) return true
    if (category === "stands" && subcategory.includes("stand")) return true
    if (category === "cables" && (subcategory.includes("cable") || subcategory.includes("adapter"))) return true
    if (category === "storage" && (subcategory.includes("drive") || subcategory.includes("storage"))) return true

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
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      {/* Header */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <nav className="flex items-center space-x-2 text-xs text-gray-500 mb-3">
                <a href="/" className="hover:text-orange-600 transition-colors">
                  Home
                </a>
                <span>/</span>
                <a href="/accessories" className="hover:text-orange-600 transition-colors">
                  Accessories
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
              <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white p-3 rounded-lg">
                <div className="text-xs font-medium">⌨️ {categoryName}</div>
                <div className="text-xs opacity-90">{totalProducts} products available</div>
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
                    Showing <span className="font-medium text-orange-600">{inStockProducts}</span> of{" "}
                    <span className="font-medium">{totalProducts}</span> results
                    <span className="text-orange-600"> in {categoryName}</span>
                  </p>
                </div>
              </div>
              <SortDropdown />
            </div>

            {/* Active Filters */}
            <AccessoryCategoryFilters brand={brand} category={category} categoryName={categoryName} />

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
