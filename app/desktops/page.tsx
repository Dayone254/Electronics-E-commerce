"use client"

import { FilterProvider } from "@/components/filter-context"
import { UniversalFilterSidebar } from "@/components/universal-filter-sidebar"
import { UniversalProductGrid } from "@/components/universal-product-grid"
import { FilterMobileDrawer } from "@/components/filter-mobile-drawer"
import { ActiveFilters } from "@/components/active-filters"
import { SortDropdown } from "@/components/sort-dropdown"
import { Button } from "@/components/ui/button"
import { Filter, Grid, List, Monitor, Cpu, HardDrive } from "lucide-react"
import { useState } from "react"
import { electronicsInventory } from "@/lib/electronics-inventory";

export default function DesktopsPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [showMobileFilters, setShowMobileFilters] = useState(false)

  const desktopProducts = electronicsInventory.filter((product) => product.category === "desktops");

  return (
    <FilterProvider initialCategory="desktops">
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-green-600 to-teal-600 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Desktop Computers & Workstations</h1>
              <p className="text-xl text-green-100 max-w-2xl mx-auto">
                Powerful desktop solutions for gaming, business, and creative work
              </p>

              {/* Feature highlights */}
              <div className="flex justify-center space-x-8 mt-8">
                <div className="flex items-center space-x-2">
                  <Cpu className="h-5 w-5" />
                  <span className="text-sm">High Performance</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Monitor className="h-5 w-5" />
                  <span className="text-sm">Complete Setup</span>
                </div>
                <div className="flex items-center space-x-2">
                  <HardDrive className="h-5 w-5" />
                  <span className="text-sm">Upgradeable</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Category Navigation */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex space-x-8 overflow-x-auto py-4">
              {[
                "All Desktops",
                "Gaming PCs",
                "Business PCs",
                "All-in-One",
                "Mini PCs",
                "Workstations",
                "Monitors",
                "Components",
              ].map((category) => (
                <button
                  key={category}
                  className="whitespace-nowrap text-sm font-medium text-gray-700 hover:text-green-600 pb-2 border-b-2 border-transparent hover:border-green-600 transition-colors"
                >
                  {category}
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
              <UniversalProductGrid products={desktopProducts} viewMode={viewMode} />
            </div>
          </div>
        </div>

        {/* Mobile Filter Drawer */}
        <FilterMobileDrawer isOpen={showMobileFilters} onClose={() => setShowMobileFilters(false)} />
      </div>
    </FilterProvider>
  )
}
