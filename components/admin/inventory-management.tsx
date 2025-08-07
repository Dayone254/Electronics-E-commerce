"use client"

import { useState } from "react"
import {
  Package,
  AlertTriangle,
  TrendingDown,
  TrendingUp,
  Search,
  Download,
  Upload,
  Edit,
  Plus,
  Minus,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAdmin } from "./admin-context"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

export function InventoryManagement() {
  const { products, updateProduct, getLowStockProducts } = useAdmin()
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [stockFilter, setStockFilter] = useState("all")
  const [adjustingStock, setAdjustingStock] = useState<number | null>(null)
  const [stockAdjustment, setStockAdjustment] = useState({ quantity: 0, reason: "" })

  const lowStockProducts = getLowStockProducts()
  const outOfStockProducts = products.filter((p) => p.stockCount === 0)
  const totalValue = products.reduce((sum, product) => sum + product.price * product.stockCount, 0)

  // Filter products
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory = categoryFilter === "all" || product.category === categoryFilter

    const matchesStock =
      stockFilter === "all" ||
      (stockFilter === "low" && product.stockCount <= 5 && product.stockCount > 0) ||
      (stockFilter === "out" && product.stockCount === 0) ||
      (stockFilter === "good" && product.stockCount > 5)

    return matchesSearch && matchesCategory && matchesStock
  })

  const categories = [...new Set(products.map((p) => p.category))].sort()

  const getStockStatus = (stockCount: number) => {
    if (stockCount === 0)
      return {
        label: "Out of Stock",
        variant: "destructive" as const,
        color: "text-red-600",
        bgColor: "bg-red-50",
      }
    if (stockCount <= 5)
      return {
        label: "Low Stock",
        variant: "secondary" as const,
        color: "text-orange-600",
        bgColor: "bg-orange-50",
      }
    return {
      label: "In Stock",
      variant: "default" as const,
      color: "text-green-600",
      bgColor: "bg-green-50",
    }
  }

  const handleStockAdjustment = (productId: number) => {
    const product = products.find((p) => p.id === productId)
    if (product && stockAdjustment.quantity !== 0) {
      const newStock = Math.max(0, product.stockCount + stockAdjustment.quantity)
      updateProduct(productId, {
        stockCount: newStock,
        inStock: newStock > 0,
      })
      setAdjustingStock(null)
      setStockAdjustment({ quantity: 0, reason: "" })
    }
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Products</p>
                <p className="text-2xl font-bold text-blue-600">{products.length}</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-full">
                <Package className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Low Stock Alert</p>
                <p className="text-2xl font-bold text-orange-600">{lowStockProducts.length}</p>
              </div>
              <div className="p-3 bg-orange-50 rounded-full">
                <AlertTriangle className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Out of Stock</p>
                <p className="text-2xl font-bold text-red-600">{outOfStockProducts.length}</p>
              </div>
              <div className="p-3 bg-red-50 rounded-full">
                <TrendingDown className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Inventory Value</p>
                <p className="text-2xl font-bold text-green-600">KSH {totalValue.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-green-50 rounded-full">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={stockFilter} onValueChange={setStockFilter}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Stock" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Stock</SelectItem>
              <SelectItem value="good">In Stock</SelectItem>
              <SelectItem value="low">Low Stock</SelectItem>
              <SelectItem value="out">Out of Stock</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Upload className="h-4 w-4 mr-2" />
            Import
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Inventory Table */}
      <Card>
        <CardHeader>
          <CardTitle>Inventory Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Current Stock</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Unit Price</TableHead>
                <TableHead>Total Value</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product) => {
                const stockStatus = getStockStatus(product.stockCount)
                const totalValue = product.price * product.stockCount

                return (
                  <TableRow key={product.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <img
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          className="w-10 h-10 rounded-lg object-cover"
                        />
                        <div>
                          <div className="font-medium">{product.name}</div>
                          <div className="text-sm text-gray-600">{product.brand}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="capitalize">
                        {product.category}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <span className={`font-semibold ${stockStatus.color}`}>{product.stockCount}</span>
                        <span className="text-sm text-gray-500">units</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={stockStatus.variant} className={stockStatus.bgColor}>
                        {stockStatus.label}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium">KSH {product.price.toLocaleString()}</TableCell>
                    <TableCell className="font-semibold">KSH {totalValue.toLocaleString()}</TableCell>
                    <TableCell>
                      <Dialog
                        open={adjustingStock === product.id}
                        onOpenChange={(open) => setAdjustingStock(open ? product.id : null)}
                      >
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            <Edit className="h-3 w-3 mr-1" />
                            Adjust
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Adjust Stock</DialogTitle>
                            <DialogDescription>Update inventory for {product.name}</DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div>
                              <Label>Current Stock: {product.stockCount} units</Label>
                            </div>

                            <div>
                              <Label htmlFor="adjustment">Stock Adjustment</Label>
                              <div className="flex items-center space-x-2 mt-2">
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="sm"
                                  onClick={() =>
                                    setStockAdjustment((prev) => ({
                                      ...prev,
                                      quantity: prev.quantity - 1,
                                    }))
                                  }
                                >
                                  <Minus className="h-4 w-4" />
                                </Button>
                                <Input
                                  id="adjustment"
                                  type="number"
                                  value={stockAdjustment.quantity}
                                  onChange={(e) =>
                                    setStockAdjustment((prev) => ({
                                      ...prev,
                                      quantity: Number(e.target.value),
                                    }))
                                  }
                                  className="w-24 text-center"
                                />
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="sm"
                                  onClick={() =>
                                    setStockAdjustment((prev) => ({
                                      ...prev,
                                      quantity: prev.quantity + 1,
                                    }))
                                  }
                                >
                                  <Plus className="h-4 w-4" />
                                </Button>
                              </div>
                              <p className="text-sm text-gray-600 mt-1">
                                New stock will be: {Math.max(0, product.stockCount + stockAdjustment.quantity)} units
                              </p>
                            </div>

                            <div>
                              <Label htmlFor="reason">Reason for Adjustment</Label>
                              <Select
                                value={stockAdjustment.reason}
                                onValueChange={(value) => setStockAdjustment((prev) => ({ ...prev, reason: value }))}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select reason" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="restock">New Stock Received</SelectItem>
                                  <SelectItem value="sale">Manual Sale</SelectItem>
                                  <SelectItem value="damage">Damaged Items</SelectItem>
                                  <SelectItem value="return">Customer Return</SelectItem>
                                  <SelectItem value="correction">Stock Correction</SelectItem>
                                  <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            <div className="flex justify-end space-x-2">
                              <Button
                                variant="outline"
                                onClick={() => {
                                  setAdjustingStock(null)
                                  setStockAdjustment({ quantity: 0, reason: "" })
                                }}
                              >
                                Cancel
                              </Button>
                              <Button
                                onClick={() => handleStockAdjustment(product.id)}
                                disabled={stockAdjustment.quantity === 0 || !stockAdjustment.reason}
                              >
                                Update Stock
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Low Stock Alerts */}
      {lowStockProducts.length > 0 && (
        <Card className="border-orange-200">
          <CardHeader>
            <CardTitle className="flex items-center text-orange-600">
              <AlertTriangle className="h-5 w-5 mr-2" />
              Low Stock Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {lowStockProducts.slice(0, 6).map((product) => (
                <div key={product.id} className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-8 h-8 rounded object-cover"
                    />
                    <div>
                      <div className="font-medium text-sm">{product.name}</div>
                      <div className="text-xs text-gray-600">{product.brand}</div>
                    </div>
                  </div>
                  <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                    {product.stockCount} left
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
