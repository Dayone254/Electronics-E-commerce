import { Suspense } from "react"
import { UniversalProductGrid } from "@/components/universal-product-grid"
import { LaptopCardSkeleton } from "@/components/laptop-card-skeleton"
import { UniversalFilterSidebar } from "@/components/universal-filter-sidebar"
import { FilterMobileDrawer } from "@/components/filter-mobile-drawer"
import { ActiveFilters } from "@/components/active-filters"
import { SortDropdown } from "@/components/sort-dropdown"
import { electronicsInventory } from "@/lib/electronics-inventory"
import { notFound } from "next/navigation"

interface DesktopCategoryPageProps {
  params: { category: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

const categoryMap: { [key: string]: string } = {
  gaming: "Gaming PCs",
  business: "Business PCs",
  "all-in-one": "All-in-One PCs",
  workstation: "Workstations",
  mini: "Mini PCs",
  budget: "Budget PCs",
  custom: "Custom Built PCs",
  refurbished: "Refurbished PCs",
}

const categoryDescriptions: { [key: string]: string } = {
  gaming:
    "High-performance gaming desktops with powerful graphics cards and processors for the ultimate gaming experience.",
  business: "Professional desktop computers designed for productivity and reliability in business environments.",
  "all-in-one": "Space-saving all-in-one computers that combine monitor and PC in a sleek, compact design.",
  workstation: "Professional workstations for demanding tasks like 3D rendering, CAD, and content creation.",
  mini: "Compact mini PCs that deliver full desktop performance in a space-saving form factor.",
  budget: "Affordable desktop computers that provide excellent value for everyday computing needs.",
  custom: "Custom-built PCs tailored to your specific requirements and performance needs.",
  refurbished: "Quality refurbished desktop computers offering great performance at reduced prices.",
}

export async function generateMetadata({ params }: DesktopCategoryPageProps) {
  const category = params.category
  const categoryName = categoryMap[category]

  if (!categoryName) {
    return {
      title: "Category Not Found - Apex Laptops",
    }
  }

  return {
    title: `${categoryName} - Apex Laptops Desktop Collection`,
    description: categoryDescriptions[category] || `Browse our collection of ${categoryName.toLowerCase()}.`,
  }
}

export default function DesktopCategoryPage({ params, searchParams }: DesktopCategoryPageProps) {
  const category = params.category
  const categoryName = categoryMap[category]

  if (!categoryName) {
    notFound()
  }

  const brand = searchParams.brand as string

  // Filter desktops based on category
  let filteredProducts = electronicsInventory.filter((product) => {
    if (product.category !== "desktops") return false

    const productName = product.name.toLowerCase()
    const subcategory = product.subcategory.toLowerCase()
    const price = product.salePrice || product.price

    if (category === "gaming" && (productName.includes("gaming") || subcategory.includes("gaming"))) return true
    if (category === "business" && (productName.includes("business") || subcategory.includes("business"))) return true
    if (category === "all-in-one" && (productName.includes("all-in-one") || subcategory.includes("all-in-one")))
      return true
    if (category === "workstation" && (productName.includes("workstation") || subcategory.includes("workstation")))
      return true
    if (category === "mini" && (productName.includes("mini") || subcategory.includes("mini"))) return true
    if (category === "budget" && price < 80000) return true
    if (category === "custom" && (productName.includes("custom") || subcategory.includes("custom"))) return true
    if (category === "refurbished" && (productName.includes("refurbished") || subcategory.includes("refurbished")))
      return true

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
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-50">
      {/* Header */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <nav className="flex items-center space-x-2 text-xs text-gray-500 mb-3">
                <a href="/" className="hover:text-green-600 transition-colors">
                  Home
                </a>
                <span>/</span>
                <a href="/desktops" className="hover:text-green-600 transition-colors">
                  Desktops
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
              <div className="bg-gradient-to-r from-green-600 to-teal-600 text-white p-3 rounded-lg">
                <div className="text-xs font-medium">🖥️ {categoryName}</div>
                <div className="text-xs opacity-90">{totalProducts} systems available</div>
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
                    Showing <span className="font-medium text-green-600">{inStockProducts}</span> of{" "}
                    <span className="font-medium">{totalProducts}</span> results
                    <span className="text-green-600"> in {categoryName}</span>
                  </p>
                </div>
              </div>
              <SortDropdown />
            </div>

            {/* Active Filters */}
            <ActiveFilters
              filters={{
                brands: brand ? [brand] : [],
                categories: ["Desktops"],
                subcategories: [categoryName],
                features: [],
                priceRange: [0, 300000] as [number, number],
              }}
              onRemoveFilter={(type: string, value?: string) => {
                if (type === "brand" && value === brand) {
                  window.location.href = `/desktops/${category}`
                }
              }}
              onClearAll={() => {
                window.location.href = `/desktops/${category}`
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
