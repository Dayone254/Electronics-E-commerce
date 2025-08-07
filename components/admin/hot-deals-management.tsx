"use client"

import { useState } from "react"
import { Plus, Search, Edit, Trash2, Calendar, Percent, TrendingUp, Clock, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAdmin } from "./admin-context"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"

export function HotDealsManagement() {
  const { hotDeals, products, addHotDeal, updateHotDeal, deleteHotDeal, getProductById } = useAdmin()
  const [searchQuery, setSearchQuery] = useState("")
  const [isAddDealOpen, setIsAddDealOpen] = useState(false)
  const [editingDeal, setEditingDeal] = useState<number | null>(null)

  const [newDeal, setNewDeal] = useState({
    productId: 0,
    discountPercentage: 10,
    startDate: new Date().toISOString().split("T")[0],
    endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    isActive: true,
    priority: 1,
  })

  const filteredDeals = hotDeals.filter((deal) => {
    const product = getProductById(deal.productId)
    return (
      product?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product?.brand.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })

  const activeDeals = hotDeals.filter((deal) => deal.isActive)
  const expiredDeals = hotDeals.filter((deal) => new Date(deal.endDate) < new Date())
  const upcomingDeals = hotDeals.filter((deal) => new Date(deal.startDate) > new Date())

  const handleAddDeal = () => {
    if (newDeal.productId > 0) {
      addHotDeal(newDeal)
      setNewDeal({
        productId: 0,
        discountPercentage: 10,
        startDate: new Date().toISOString().split("T")[0],
        endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
        isActive: true,
        priority: 1,
      })
      setIsAddDealOpen(false)
    }
  }

  const handleDeleteDeal = (id: number) => {
    if (confirm("Are you sure you want to delete this hot deal?")) {
      deleteHotDeal(id)
    }
  }

  const toggleDealStatus = (id: number, isActive: boolean) => {
    updateHotDeal(id, { isActive })
  }

  const getDealStatus = (deal: any) => {
    const now = new Date()
    const startDate = new Date(deal.startDate)
    const endDate = new Date(deal.endDate)

    if (!deal.isActive) return { label: "Inactive", color: "bg-gray-100 text-gray-800" }
    if (now < startDate) return { label: "Upcoming", color: "bg-blue-100 text-blue-800" }
    if (now > endDate) return { label: "Expired", color: "bg-red-100 text-red-800" }
    return { label: "Active", color: "bg-green-100 text-green-800" }
  }

  const calculateSavings = (productId: number, discountPercentage: number) => {
    const product = getProductById(productId)
    if (!product) return 0
    return Math.round((product.price * discountPercentage) / 100)
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Deals</p>
                <p className="text-2xl font-bold text-green-600">{activeDeals.length}</p>
              </div>
              <div className="p-3 bg-green-50 rounded-full">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Upcoming Deals</p>
                <p className="text-2xl font-bold text-blue-600">{upcomingDeals.length}</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-full">
                <Clock className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Expired Deals</p>
                <p className="text-2xl font-bold text-red-600">{expiredDeals.length}</p>
              </div>
              <div className="p-3 bg-red-50 rounded-full">
                <Calendar className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Discount</p>
                <p className="text-2xl font-bold text-purple-600">
                  {hotDeals.length > 0
                    ? Math.round(hotDeals.reduce((sum, deal) => sum + deal.discountPercentage, 0) / hotDeals.length)
                    : 0}
                  %
                </p>
              </div>
              <div className="p-3 bg-purple-50 rounded-full">
                <Percent className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search deals..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 w-64"
          />
        </div>

        <Dialog open={isAddDealOpen} onOpenChange={setIsAddDealOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
              <Plus className="h-4 w-4 mr-2" />
              Create Hot Deal
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Hot Deal</DialogTitle>
              <DialogDescription>Set up a new promotional offer</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="product">Product</Label>
                <Select
                  value={newDeal.productId.toString()}
                  onValueChange={(value) => setNewDeal((prev) => ({ ...prev, productId: Number(value) }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select product" />
                  </SelectTrigger>
                  <SelectContent>
                    {products.map((product) => (
                      <SelectItem key={product.id} value={product.id.toString()}>
                        {product.name} - KSH {product.price.toLocaleString()}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="discount">Discount %</Label>
                  <Input
                    id="discount"
                    type="number"
                    min="1"
                    max="90"
                    value={newDeal.discountPercentage}
                    onChange={(e) => setNewDeal((prev) => ({ ...prev, discountPercentage: Number(e.target.value) }))}
                  />
                </div>
                <div>
                  <Label htmlFor="priority">Priority</Label>
                  <Input
                    id="priority"
                    type="number"
                    min="1"
                    max="10"
                    value={newDeal.priority}
                    onChange={(e) => setNewDeal((prev) => ({ ...prev, priority: Number(e.target.value) }))}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={newDeal.startDate}
                    onChange={(e) => setNewDeal((prev) => ({ ...prev, startDate: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="endDate">End Date</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={newDeal.endDate}
                    onChange={(e) => setNewDeal((prev) => ({ ...prev, endDate: e.target.value }))}
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="active"
                  checked={newDeal.isActive}
                  onCheckedChange={(checked) => setNewDeal((prev) => ({ ...prev, isActive: checked }))}
                />
                <Label htmlFor="active">Active immediately</Label>
              </div>

              {newDeal.productId > 0 && (
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold mb-2">Deal Preview</h4>
                  <p>Savings: KSH {calculateSavings(newDeal.productId, newDeal.discountPercentage).toLocaleString()}</p>
                  <p>
                    Sale Price: KSH{" "}
                    {(getProductById(newDeal.productId)?.price || 0) -
                      calculateSavings(newDeal.productId, newDeal.discountPercentage)}
                  </p>
                </div>
              )}

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsAddDealOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddDeal} disabled={newDeal.productId === 0}>
                  Create Deal
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Deals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDeals.map((deal) => {
          const product = getProductById(deal.productId)
          const status = getDealStatus(deal)
          const savings = calculateSavings(deal.productId, deal.discountPercentage)
          const salePrice = (product?.price || 0) - savings

          if (!product) return null

          return (
            <Card key={deal.id} className="group hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                {/* Product Image */}
                <div className="relative aspect-video bg-gray-100 rounded-t-lg overflow-hidden">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 left-2">
                    <Badge className={status.color}>{status.label}</Badge>
                  </div>
                  <div className="absolute top-2 right-2">
                    <Badge variant="destructive" className="text-lg font-bold">
                      -{deal.discountPercentage}%
                    </Badge>
                  </div>
                  <div className="absolute bottom-2 left-2">
                    <Badge className="bg-white/90 text-gray-700">Priority: {deal.priority}</Badge>
                  </div>
                </div>

                {/* Deal Info */}
                <div className="p-4 space-y-3">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-semibold text-blue-600 uppercase tracking-wide">
                        {product.brand}
                      </span>
                      <div className="flex items-center space-x-1">
                        <Star className="h-3 w-3 text-yellow-400 fill-current" />
                        <span className="text-xs text-gray-600">{product.rating}</span>
                      </div>
                    </div>
                    <h3 className="font-semibold text-gray-900 line-clamp-2 leading-tight">{product.name}</h3>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Original Price:</span>
                      <span className="text-sm line-through text-gray-500">KSH {product.price.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Sale Price:</span>
                      <span className="text-lg font-bold text-red-600">KSH {salePrice.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">You Save:</span>
                      <span className="text-sm font-bold text-green-600">KSH {savings.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="text-xs text-gray-500 space-y-1">
                    <div>Start: {deal.startDate}</div>
                    <div>End: {deal.endDate}</div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center space-x-2 pt-2">
                    <div className="flex items-center space-x-2 flex-1">
                      <Switch
                        checked={deal.isActive}
                        onCheckedChange={(checked) => toggleDealStatus(deal.id, checked)}
                        size="sm"
                      />
                      <span className="text-xs text-gray-600">Active</span>
                    </div>
                    <Button variant="outline" size="sm">
                      <Edit className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteDeal(deal.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Empty State */}
      {filteredDeals.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <Percent className="h-16 w-16 text-gray-300 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No hot deals found</h3>
            <p className="text-gray-600 text-center mb-6">
              {searchQuery ? "Try adjusting your search criteria" : "Create your first hot deal to boost sales"}
            </p>
            <Button onClick={() => setIsAddDealOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Create Hot Deal
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
