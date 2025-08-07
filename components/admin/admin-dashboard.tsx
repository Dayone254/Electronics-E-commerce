"use client"

import { useState } from "react"
import { AlertTriangle, Plus, Search, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAdmin } from "./admin-context"
import { AdminSidebar } from "./admin-sidebar"
import { DashboardOverview } from "./dashboard-overview"
import { ProductManagement } from "./product-management"
import { SalesManagement } from "./sales-management"
import { HotDealsManagement } from "./hot-deals-management"
import { InventoryManagement } from "./inventory-management"
import { AnalyticsPage } from "./analytics-page"
import { CustomersPage } from "./customers-page"
import { SettingsPage } from "./settings-page"

export function AdminDashboard() {
  const { selectedTab, setSelectedTab, products, sales, getLowStockProducts, getTotalRevenue } = useAdmin()
  const [searchQuery, setSearchQuery] = useState("")

  const lowStockCount = getLowStockProducts().length
  const totalRevenue = getTotalRevenue()
  const totalProducts = products.length
  const totalSales = sales.filter((sale) => sale.status === "completed").length

  const renderContent = () => {
    switch (selectedTab) {
      case "dashboard":
        return <DashboardOverview />
      case "products":
        return <ProductManagement />
      case "sales":
        return <SalesManagement />
      case "hot-deals":
        return <HotDealsManagement />
      case "inventory":
        return <InventoryManagement />
      case "analytics":
        return <AnalyticsPage />
      case "customers":
        return <CustomersPage />
      case "settings":
        return <SettingsPage />
      default:
        return <DashboardOverview />
    }
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900 capitalize">
                {selectedTab.replace("-", " ")} {selectedTab === "dashboard" ? "Overview" : ""}
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                {selectedTab === "dashboard" && "Welcome to your admin dashboard"}
                {selectedTab === "products" && `Managing ${totalProducts} products`}
                {selectedTab === "sales" && `${totalSales} completed sales`}
                {selectedTab === "hot-deals" && "Manage promotional offers"}
                {selectedTab === "inventory" && `${lowStockCount} items need attention`}
                {selectedTab === "analytics" && "Business insights and reports"}
                {selectedTab === "customers" && "Customer management"}
                {selectedTab === "settings" && "System configuration"}
              </p>
            </div>

            <div className="flex items-center space-x-4">
              {/* Quick Stats */}
              <div className="hidden lg:flex items-center space-x-4">
                <div className="text-center">
                  <div className="text-lg font-semibold text-green-600">KSH {totalRevenue.toLocaleString()}</div>
                  <div className="text-xs text-gray-500">Total Revenue</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-blue-600">{totalProducts}</div>
                  <div className="text-xs text-gray-500">Products</div>
                </div>
                {lowStockCount > 0 && (
                  <div className="text-center">
                    <div className="text-lg font-semibold text-red-600 flex items-center">
                      <AlertTriangle className="h-4 w-4 mr-1" />
                      {lowStockCount}
                    </div>
                    <div className="text-xs text-gray-500">Low Stock</div>
                  </div>
                )}
              </div>

              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>

              {/* Quick Actions */}
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Add New
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6">{renderContent()}</main>
      </div>
    </div>
  )
}
