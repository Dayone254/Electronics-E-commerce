"use client"

import { LayoutDashboard, Package, ShoppingCart, Users, Settings, BarChart3, Flame, Archive } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useAdmin } from "./admin-context"

export function AdminSidebar() {
  const { selectedTab, setSelectedTab, getLowStockProducts, hotDeals } = useAdmin()

  const lowStockCount = getLowStockProducts().length
  const activeDealsCount = hotDeals.filter((deal) => deal.isActive).length

  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
      badge: null,
    },
    {
      id: "products",
      label: "Products",
      icon: Package,
      badge: null,
    },
    {
      id: "sales",
      label: "Sales",
      icon: ShoppingCart,
      badge: null,
    },
    {
      id: "hot-deals",
      label: "Hot Deals",
      icon: Flame,
      badge: activeDealsCount > 0 ? activeDealsCount : null,
    },
    {
      id: "inventory",
      label: "Inventory",
      icon: Archive,
      badge: lowStockCount > 0 ? lowStockCount : null,
      badgeVariant: "destructive" as const,
    },
    {
      id: "analytics",
      label: "Analytics",
      icon: BarChart3,
      badge: null,
    },
    {
      id: "customers",
      label: "Customers",
      icon: Users,
      badge: null,
    },
    {
      id: "settings",
      label: "Settings",
      icon: Settings,
      badge: null,
    },
  ]

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-semibold text-sm">A</span>
          </div>
          <div>
            <div className="font-semibold text-gray-900">Apex Electronics</div>
            <div className="text-xs text-gray-500">Admin Panel</div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = selectedTab === item.id

          return (
            <Button
              key={item.id}
              variant={isActive ? "default" : "ghost"}
              className={`w-full justify-start ${
                isActive ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-100"
              }`}
              onClick={() => setSelectedTab(item.id)}
            >
              <Icon className="h-4 w-4 mr-3" />
              <span className="flex-1 text-left">{item.label}</span>
              {item.badge && (
                <Badge variant={item.badgeVariant || "secondary"} className="ml-2">
                  {item.badge}
                </Badge>
              )}
            </Button>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        <div className="text-xs text-gray-500 text-center">
          <div>Admin Dashboard v1.0</div>
          <div className="mt-1">© 2024 Apex Electronics</div>
        </div>
      </div>
    </div>
  )
}
