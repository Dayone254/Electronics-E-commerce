"use client"

import { FilterProvider } from "@/components/filter-context"
import { UniversalFilterSidebar } from "@/components/universal-filter-sidebar"
import { UniversalProductGrid } from "@/components/universal-product-grid"
import { FilterMobileDrawer } from "@/components/filter-mobile-drawer"
import { ActiveFilters } from "@/components/active-filters"
import { SortDropdown } from "@/components/sort-dropdown"
import { Button } from "@/components/ui/button"
import { Filter, Grid, List, Tv, Wifi, Volume2 } from "lucide-react"
import { useState } from "react"
import { electronicsInventory } from "@/lib/electronics-inventory";

export default function TVsPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [showMobileFilters, setShowMobileFilters] = useState(false)

  const tvProducts = electronicsInventory.filter((product) => product.category === "tvs");

  return (
    <FilterProvider initialCategory="tvs">
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Smart TVs & Entertainment</h1>
              <p className="text-xl text-indigo-100 max-w-2xl mx-auto">
                Transform your living room with our premium TV collection featuring 4K, OLED, and Smart TV technology
              </p>

              {/* Feature highlights */}
              <div className="flex justify-center space-x-8 mt-8">
                <div className="flex items-center space-x-2">
                  <Tv className="h-5 w-5" />
                  <span className="text-sm">4K Ultra HD</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Wifi className="h-5 w-5" />
                  <span className="text-sm">Smart Features</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Volume2 className="h-5 w-5" />
                  <span className="text-sm">Premium Audio</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Size Navigation */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex space-x-8 overflow-x-auto py-4">
              {[
                "All TVs",
                '32" TVs',
                '43" TVs',
                '50" TVs',
                '55" TVs',
                '65" TVs',
                '75" TVs',
                "OLED TVs",
                "Gaming TVs",
              ].map((size) => (
                <button
                  key={size}
                  className="whitespace-nowrap text-sm font-medium text-gray-700 hover:text-indigo-600 pb-2 border-b-2 border-transparent hover:border-indigo-600 transition-colors"
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Desktop Sidebar */}
            <div className="hidden lg:block w-64 flex-shrink-0">
              <UniversalFilterSidebar />
            </div>

            {/* Main Content */}
            <div className="flex-1">
              {/* Controls Bar */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <Button variant="outline" size="sm" onClick={() => setShowMobileFilters(true)} className="lg:hidden">
                    <Filter className="h-4 w-4 mr-2" />
                    Filters
                  </Button>
                  <div className="hidden sm:flex items-center space-x-2">
                    <Button
                      variant={viewMode === "grid" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setViewMode("grid")}
                    >
                      <Grid className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={viewMode === "list" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setViewMode("list")}
                    >
                      <List className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <SortDropdown />
              </div>

              {/* Active Filters */}
              <ActiveFilters />

              {/* Products Grid */}
              <UniversalProductGrid products={tvProducts} viewMode={viewMode} />
            </div>
          </div>
        </div>

        {/* Mobile Filter Drawer */}
        <FilterMobileDrawer isOpen={showMobileFilters} onClose={() => setShowMobileFilters(false)} />
      </div>
    </FilterProvider>
  )
}
