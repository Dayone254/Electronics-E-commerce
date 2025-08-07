import { Suspense } from "react"
import { UniversalProductGrid } from "@/components/universal-product-grid"
import { LaptopCardSkeleton } from "@/components/laptop-card-skeleton"
import { UniversalFilterSidebar } from "@/components/universal-filter-sidebar"
import { FilterMobileDrawer } from "@/components/filter-mobile-drawer"
import { ActiveFilters } from "@/components/active-filters"
import { SortDropdown } from "@/components/sort-dropdown"
import { electronicsInventory } from "@/lib/electronics-inventory"
import { notFound } from "next/navigation"

interface PrinterCategoryPageProps {
  params: { category: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

const categoryMap: { [key: string]: string } = {
  inkjet: "Inkjet Printers",
  laser: "Laser Printers",
  "all-in-one": "All-in-One Printers",
  photo: "Photo Printers",
  business: "Business Printers",
  home: "Home Printers",
  wireless: "Wireless Printers",
  "3d": "3D Printers",
}

const categoryDescriptions: { [key: string]: string } = {
  inkjet: "High-quality inkjet printers perfect for photos and documents with vibrant color reproduction.",
  laser: "Fast and efficient laser printers ideal for high-volume printing with crisp text quality.",
  "all-in-one": "Versatile all-in-one printers that print, scan, copy, and fax in a single compact device.",
  photo: "Specialized photo printers for professional-quality prints with exceptional color accuracy.",
  business: "Robust business printers designed for high-volume printing in office environments.",
  home: "Affordable home printers perfect for everyday printing needs and family use.",
  wireless: "Convenient wireless printers that connect seamlessly to your devices without cables.",
  "3d": "Innovative 3D printers for creating three-dimensional objects and prototypes.",
}

export async function generateMetadata({ params }: PrinterCategoryPageProps) {
  const category = params.category
  const categoryName = categoryMap[category]

  if (!categoryName) {
    return {
      title: "Category Not Found - Apex Laptops",
    }
  }

  return {
    title: `${categoryName} - Apex Laptops Printer Collection`,
    description: categoryDescriptions[category] || `Browse our collection of ${categoryName.toLowerCase()}.`,
  }
}

export default function PrinterCategoryPage({ params, searchParams }: PrinterCategoryPageProps) {
  const category = params.category
  const categoryName = categoryMap[category]

  if (!categoryName) {
    notFound()
  }

  const brand = searchParams.brand as string

  // Filter printers based on category
  let filteredProducts = electronicsInventory.filter((product) => {
    if (product.category !== "printers") return false

    const productName = product.name.toLowerCase()
    const subcategory = product.subcategory.toLowerCase()
    const specs = product.specs

    if (category === "inkjet" && (productName.includes("inkjet") || subcategory.includes("inkjet"))) return true
    if (category === "laser" && (productName.includes("laser") || subcategory.includes("laser"))) return true
    if (category === "all-in-one" && (productName.includes("all-in-one") || subcategory.includes("all-in-one")))
      return true
    if (category === "photo" && (productName.includes("photo") || subcategory.includes("photo"))) return true
    if (category === "business" && (productName.includes("business") || subcategory.includes("business"))) return true
    if (category === "home" && (productName.includes("home") || subcategory.includes("home"))) return true
    if (category === "wireless" && (productName.includes("wireless") || specs.connectivity?.includes("WiFi")))
      return true
    if (category === "3d" && (productName.includes("3d") || subcategory.includes("3d"))) return true

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
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50">
      {/* Header */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <nav className="flex items-center space-x-2 text-xs text-gray-500 mb-3">
                <a href="/" className="hover:text-yellow-600 transition-colors">
                  Home
                </a>
                <span>/</span>
                <a href="/printers" className="hover:text-yellow-600 transition-colors">
                  Printers
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
              <div className="bg-gradient-to-r from-yellow-600 to-orange-600 text-white p-3 rounded-lg">
                <div className="text-xs font-medium">🖨️ {categoryName}</div>
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
                    Showing <span className="font-medium text-yellow-600">{inStockProducts}</span> of{" "}
                    <span className="font-medium">{totalProducts}</span> results
                    <span className="text-yellow-600"> in {categoryName}</span>
                  </p>
                </div>
              </div>
              <SortDropdown />
            </div>

            {/* Active Filters */}
            <ActiveFilters
              filters={{
                brands: brand ? [brand] : [],
                categories: ["Printers"],
                subcategories: [categoryName],
                features: [],
                priceRange: [0, 300000] as [number, number],
              }}
              onRemoveFilter={(type: string, value?: string) => {
                if (type === "brand" && value === brand) {
                  window.location.href = `/printers/${category}`
                }
              }}
              onClearAll={() => {
                window.location.href = `/printers/${category}`
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
