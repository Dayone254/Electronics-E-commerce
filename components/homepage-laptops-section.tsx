"use client";

import { Suspense } from "react"
import { LaptopGrid } from "@/components/laptop-grid"
import { LaptopCardSkeleton } from "@/components/laptop-card-skeleton"
import { FilterSidebar } from "@/components/filter-sidebar"
import { FilterMobileDrawer } from "@/components/filter-mobile-drawer"
import { ActiveFilters } from "@/components/active-filters"
import { SortDropdown } from "@/components/sort-dropdown"
import { laptopInventory } from "@/lib/laptop-inventory"

export function HomepageLaptopsSection() {
  const totalProducts = laptopInventory.length
  const inStockProducts = laptopInventory.filter((laptop) => laptop.inStock).length

  return (
    <div className="bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-semibold text-gray-900 mb-2">Shop All Laptops</h1>
              <p className="text-sm text-gray-600">
                Discover our complete collection of <span className="font-medium text-blue-600">{totalProducts}</span>{" "}
                premium laptops (<span className="font-medium text-green-600">{inStockProducts}</span> in stock)
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
                    Showing <span className="font-medium text-blue-600">{inStockProducts}</span> of{" "}
                    <span className="font-medium">{totalProducts}</span> results
                  </p>
                </div>
              </div>
              <SortDropdown />
            </div>

            {/* Active Filters */}
            <ActiveFilters
              filters={{
                brands: [],
                categories: [],
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
              <LaptopGrid laptops={laptopInventory} />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  )
}
