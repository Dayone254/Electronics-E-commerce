"use client"
import { TrendingUp, TrendingDown, Package, ShoppingCart, AlertTriangle, Eye, Star, DollarSign } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useAdmin } from "./admin-context"

export function DashboardOverview() {
  const { products, sales, hotDeals, getTotalRevenue, getLowStockProducts, getTopSellingProducts } = useAdmin()

  const totalRevenue = getTotalRevenue()
  const completedSales = sales.filter((sale) => sale.status === "completed")
  const pendingSales = sales.filter((sale) => sale.status === "pending")
  const lowStockProducts = getLowStockProducts()
  const topSellingProducts = getTopSellingProducts()
  const activeDeals = hotDeals.filter((deal) => deal.isActive)

  // Calculate growth percentages (mock data for demo)
  const revenueGrowth = 12.5
  const salesGrowth = 8.3
  const productGrowth = 15.2

  const stats = [
    {
      title: "Total Revenue",
      value: `KSH ${totalRevenue.toLocaleString()}`,
      change: `+${revenueGrowth}%`,
      changeType: "increase" as const,
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Total Sales",
      value: completedSales.length.toString(),
      change: `+${salesGrowth}%`,
      changeType: "increase" as const,
      icon: ShoppingCart,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Products",
      value: products.length.toString(),
      change: `+${productGrowth}%`,
      changeType: "increase" as const,
      icon: Package,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: "Low Stock Alert",
      value: lowStockProducts.length.toString(),
      change: "Needs attention",
      changeType: "warning" as const,
      icon: AlertTriangle,
      color: "text-red-600",
      bgColor: "bg-red-50",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index} className="relative overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
                    <div className="flex items-center mt-2">
                      {stat.changeType === "increase" && <TrendingUp className="h-4 w-4 text-green-500 mr-1" />}
                      {stat.changeType === "decrease" && <TrendingDown className="h-4 w-4 text-red-500 mr-1" />}
                      {stat.changeType === "warning" && <AlertTriangle className="h-4 w-4 text-orange-500 mr-1" />}
                      <span
                        className={`text-sm font-medium ${
                          stat.changeType === "increase"
                            ? "text-green-600"
                            : stat.changeType === "decrease"
                              ? "text-red-600"
                              : "text-orange-600"
                        }`}
                      >
                        {stat.change}
                      </span>
                    </div>
                  </div>
                  <div className={`p-3 rounded-full ${stat.bgColor}`}>
                    <Icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Sales */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <ShoppingCart className="h-5 w-5 mr-2" />
              Recent Sales
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {sales.slice(0, 5).map((sale) => (
                <div key={sale.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{sale.productName}</div>
                    <div className="text-sm text-gray-600">{sale.customerName}</div>
                    <div className="text-xs text-gray-500">{sale.saleDate}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-gray-900">KSH {sale.totalPrice.toLocaleString()}</div>
                    <Badge
                      variant={
                        sale.status === "completed"
                          ? "default"
                          : sale.status === "pending"
                            ? "secondary"
                            : "destructive"
                      }
                      className="text-xs"
                    >
                      {sale.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4 bg-transparent">
              View All Sales
            </Button>
          </CardContent>
        </Card>

        {/* Top Selling Products */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Star className="h-5 w-5 mr-2" />
              Top Selling Products
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topSellingProducts.slice(0, 5).map((item, index) => (
                <div key={item.product.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold text-sm">
                      {index + 1}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{item.product.name}</div>
                      <div className="text-sm text-gray-600">{item.product.brand}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-gray-900">{item.totalSold} sold</div>
                    <div className="text-sm text-gray-600">KSH {item.product.price.toLocaleString()}</div>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4 bg-transparent">
              View All Products
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Low Stock Alert */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-red-600">
              <AlertTriangle className="h-5 w-5 mr-2" />
              Low Stock Alert
            </CardTitle>
          </CardHeader>
          <CardContent>
            {lowStockProducts.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Package className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>All products are well stocked!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {lowStockProducts.slice(0, 5).map((product) => (
                  <div key={product.id} className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                    <div>
                      <div className="font-medium text-gray-900">{product.name}</div>
                      <div className="text-sm text-gray-600">{product.brand}</div>
                    </div>
                    <div className="text-right">
                      <Badge variant="destructive">{product.stockCount} left</Badge>
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full bg-transparent">
                  Manage Inventory
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Active Hot Deals */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-orange-600">
              <TrendingUp className="h-5 w-5 mr-2" />
              Active Hot Deals
            </CardTitle>
          </CardHeader>
          <CardContent>
            {activeDeals.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <TrendingUp className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>No active deals at the moment</p>
                <Button className="mt-4">Create Hot Deal</Button>
              </div>
            ) : (
              <div className="space-y-4">
                {activeDeals.slice(0, 5).map((deal) => {
                  const product = products.find((p) => p.id === deal.productId)
                  return (
                    <div key={deal.id} className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                      <div>
                        <div className="font-medium text-gray-900">{product?.name}</div>
                        <div className="text-sm text-gray-600">Ends: {deal.endDate}</div>
                      </div>
                      <div className="text-right">
                        <Badge variant="secondary">{deal.discountPercentage}% OFF</Badge>
                      </div>
                    </div>
                  )
                })}
                <Button variant="outline" className="w-full bg-transparent">
                  Manage Hot Deals
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button className="h-20 flex flex-col items-center justify-center space-y-2">
              <Package className="h-6 w-6" />
              <span className="text-sm">Add Product</span>
            </Button>
            <Button
              variant="outline"
              className="h-20 flex flex-col items-center justify-center space-y-2 bg-transparent"
            >
              <ShoppingCart className="h-6 w-6" />
              <span className="text-sm">New Sale</span>
            </Button>
            <Button
              variant="outline"
              className="h-20 flex flex-col items-center justify-center space-y-2 bg-transparent"
            >
              <TrendingUp className="h-6 w-6" />
              <span className="text-sm">Create Deal</span>
            </Button>
            <Button
              variant="outline"
              className="h-20 flex flex-col items-center justify-center space-y-2 bg-transparent"
            >
              <Eye className="h-6 w-6" />
              <span className="text-sm">View Reports</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
