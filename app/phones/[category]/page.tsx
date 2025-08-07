import { Suspense } from "react"
import { UniversalProductGrid } from "@/components/universal-product-grid"
import { LaptopCardSkeleton } from "@/components/laptop-card-skeleton"
import { UniversalFilterSidebar } from "@/components/universal-filter-sidebar"
import { FilterMobileDrawer } from "@/components/filter-mobile-drawer"
import { ActiveFilters } from "@/components/active-filters"
import { SortDropdown } from "@/components/sort-dropdown"
import { electronicsInventory } from "@/lib/electronics-inventory"
import { notFound } from "next/navigation"

interface PhoneCategoryPageProps {
  params: { category: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

const categoryMap: { [key: string]: string } = {
  smartphones: "Smartphones",
  iphone: "iPhone",
  samsung: "Samsung Galaxy",
  pixel: "Google Pixel",
  oneplus: "OnePlus",
  xiaomi: "Xiaomi",
  huawei: "Huawei",
  flagship: "Flagship Phones",
  budget: "Budget Phones",
  gaming: "Gaming Phones",
}

const categoryDescriptions: { [key: string]: string } = {
  smartphones: "Discover the latest smartphones with cutting-edge technology and innovative features.",
  iphone: "Experience the power and elegance of Apple's iPhone lineup with iOS ecosystem integration.",
  samsung: "Explore Samsung Galaxy phones featuring stunning displays and advanced camera systems.",
  pixel: "Pure Android experience with Google Pixel phones and exceptional computational photography.",
  oneplus: "Never Settle with OnePlus phones offering flagship performance at competitive prices.",
  xiaomi: "Innovation for everyone with Xiaomi's feature-rich smartphones at incredible value.",
  huawei: "Advanced technology and premium design in Huawei's smartphone collection.",
  flagship: "Top-tier smartphones with the most advanced features and premium build quality.",
  budget: "Affordable smartphones that don't compromise on essential features and performance.",
  gaming: "High-performance gaming phones with advanced cooling and gaming-focused features.",
}

export async function generateMetadata({ params }: PhoneCategoryPageProps) {
  const category = params.category
  const categoryName = categoryMap[category]

  if (!categoryName) {
    return {
      title: "Category Not Found - Apex Laptops",
    }
  }

  return {
    title: `${categoryName} - Apex Laptops Mobile Phones`,
    description: categoryDescriptions[category] || `Browse our collection of ${categoryName.toLowerCase()}.`,
  }
}

export default function PhoneCategoryPage({ params, searchParams }: PhoneCategoryPageProps) {
  const category = params.category
  const categoryName = categoryMap[category]

  if (!categoryName) {
    notFound()
  }

  const brand = searchParams.brand as string

  // Filter phones based on category
  let filteredProducts = electronicsInventory.filter((product) => {
    if (product.category !== "phones") return false

    // Map categories to URL categories
    const productBrand = product.brand.toLowerCase()
    const productName = product.name.toLowerCase()
    const price = product.salePrice || product.price

    if (category === "smartphones") return true
    if (category === "iphone" && productBrand.includes("apple")) return true
    if (category === "samsung" && productBrand.includes("samsung")) return true
    if (category === "pixel" && productBrand.includes("google")) return true
    if (category === "oneplus" && productBrand.includes("oneplus")) return true
    if (category === "xiaomi" && productBrand.includes("xiaomi")) return true
    if (category === "huawei" && productBrand.includes("huawei")) return true
    if (category === "flagship" && price > 100000) return true
    if (category === "budget" && price < 50000) return true
    if (category === "gaming" && (productName.includes("gaming") || productName.includes("rog"))) return true

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
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
                <a href="/phones" className="hover:text-blue-600 transition-colors">
                  Phones
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
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-3 rounded-lg">
                <div className="text-xs font-medium">📱 {categoryName}</div>
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
                    Showing <span className="font-medium text-blue-600">{inStockProducts}</span> of{" "}
                    <span className="font-medium">{totalProducts}</span> results
                    <span className="text-blue-600"> in {categoryName}</span>
                  </p>
                </div>
              </div>
              <SortDropdown />
            </div>

            {/* Active Filters */}
            <ActiveFilters
              filters={{
                brands: brand ? [brand] : [],
                categories: ["Phones"],
                subcategories: [categoryName],
                features: [],
                priceRange: [0, 300000] as [number, number],
              }}
              onRemoveFilter={(type: string, value?: string) => {
                if (type === "brand" && value === brand) {
                  window.location.href = `/phones/${category}`
                }
              }}
              onClearAll={() => {
                window.location.href = `/phones/${category}`
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
