"use client"

import { FilterProvider } from "@/components/filter-context"
import { UniversalFilterSidebar } from "@/components/universal-filter-sidebar"
import { UniversalProductGrid } from "@/components/universal-product-grid"
import { FilterMobileDrawer } from "@/components/filter-mobile-drawer"
import { ActiveFilters } from "@/components/active-filters"
import { SortDropdown } from "@/components/sort-dropdown"
import { Button } from "@/components/ui/button"
import { Filter, Grid, List, Printer, Wifi, Zap } from "lucide-react"
import { useState } from "react"
import { electronicsInventory } from "@/lib/electronics-inventory";

export default function PrintersPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [showMobileFilters, setShowMobileFilters] = useState(false)

  const printerProducts = electronicsInventory.filter((product) => product.category === "printers");

  return (
    <FilterProvider initialCategory="printers">
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Printers & Office Solutions</h1>
              <p className="text-xl text-orange-100 max-w-2xl mx-auto">
                Professional printing solutions for home and office with wireless connectivity and high-quality output
              </p>

              {/* Feature highlights */}
              <div className="flex justify-center space-x-8 mt-8">
                <div className="flex items-center space-x-2">
                  <Printer className="h-5 w-5" />
                  <span className="text-sm">All-in-One</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Wifi className="h-5 w-5" />
                  <span className="text-sm">Wireless</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Zap className="h-5 w-5" />
                  <span className="text-sm">Fast Printing</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Type Navigation */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex space-x-8 overflow-x-auto py-4">
              {[
                "All Printers",
                "Inkjet Printers",
                "Laser Printers",
                "All-in-One",
                "Photo Printers",
                "3D Printers",
                "Printer Ink",
                "Paper & Supplies",
              ].map((type) => (
                <button
                  key={type}
                  className="whitespace-nowrap text-sm font-medium text-gray-700 hover:text-orange-600 pb-2 border-b-2 border-transparent hover:border-orange-600 transition-colors"
                >
                  {type}
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
              <UniversalProductGrid products={printerProducts} viewMode={viewMode} />
            </div>
          </div>
        </div>

        {/* Mobile Filter Drawer */}
        <FilterMobileDrawer isOpen={showMobileFilters} onClose={() => setShowMobileFilters(false)} />
      </div>
    </FilterProvider>
  )
}
