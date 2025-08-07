"use client"

import { useState } from "react"
import { Users, Search, Download, Mail, Phone, Calendar, MapPin, Eye, Edit, Trash2, Plus } from "lucide-react"
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

export function CustomersPage() {
  const { sales } = useAdmin()
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  // Extract unique customers from sales data
  const customers = sales.reduce((acc, sale) => {
    const existingCustomer = acc.find((c) => c.email === sale.customerEmail)
    if (existingCustomer) {
      existingCustomer.totalOrders += 1
      existingCustomer.totalSpent += sale.totalPrice
      existingCustomer.lastOrderDate =
        sale.saleDate > existingCustomer.lastOrderDate ? sale.saleDate : existingCustomer.lastOrderDate
    } else {
      acc.push({
        id: acc.length + 1,
        name: sale.customerName,
        email: sale.customerEmail,
        phone: sale.customerPhone,
        totalOrders: 1,
        totalSpent: sale.totalPrice,
        firstOrderDate: sale.saleDate,
        lastOrderDate: sale.saleDate,
        status: "active",
      })
    }
    return acc
  }, [] as any[])

  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.phone.includes(searchQuery)

    const matchesStatus = statusFilter === "all" || customer.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const totalCustomers = customers.length
  const activeCustomers = customers.filter((c) => c.status === "active").length
  const totalRevenue = customers.reduce((sum, customer) => sum + customer.totalSpent, 0)
  const averageOrderValue = totalRevenue / customers.reduce((sum, customer) => sum + customer.totalOrders, 0) || 0

  const getCustomerTier = (totalSpent: number) => {
    if (totalSpent >= 500000) return { tier: "VIP", color: "bg-purple-100 text-purple-800" }
    if (totalSpent >= 200000) return { tier: "Gold", color: "bg-yellow-100 text-yellow-800" }
    if (totalSpent >= 100000) return { tier: "Silver", color: "bg-gray-100 text-gray-800" }
    return { tier: "Bronze", color: "bg-orange-100 text-orange-800" }
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Customers</p>
                <p className="text-2xl font-bold text-blue-600">{totalCustomers}</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-full">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Customers</p>
                <p className="text-2xl font-bold text-green-600">{activeCustomers}</p>
              </div>
              <div className="p-3 bg-green-50 rounded-full">
                <Users className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Customer LTV</p>
                <p className="text-2xl font-bold text-purple-600">
                  KSH {Math.round(totalRevenue / totalCustomers).toLocaleString()}
                </p>
              </div>
              <div className="p-3 bg-purple-50 rounded-full">
                <Calendar className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Order Value</p>
                <p className="text-2xl font-bold text-orange-600">KSH {averageOrderValue.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-orange-50 rounded-full">
                <MapPin className="h-6 w-6 text-orange-600" />
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
              placeholder="Search customers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Add Customer
          </Button>
        </div>
      </div>

      {/* Customers Table */}
      <Card>
        <CardHeader>
          <CardTitle>Customer Database</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Orders</TableHead>
                <TableHead>Total Spent</TableHead>
                <TableHead>Tier</TableHead>
                <TableHead>Last Order</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers.map((customer) => {
                const tier = getCustomerTier(customer.totalSpent)
                return (
                  <TableRow key={customer.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{customer.name}</div>
                        <div className="text-sm text-gray-600">Customer #{customer.id}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <Mail className="h-3 w-3 text-gray-400" />
                          <span className="text-sm">{customer.email}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Phone className="h-3 w-3 text-gray-400" />
                          <span className="text-sm">{customer.phone}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-center">
                        <div className="font-semibold">{customer.totalOrders}</div>
                        <div className="text-xs text-gray-600">orders</div>
                      </div>
                    </TableCell>
                    <TableCell className="font-semibold">KSH {customer.totalSpent.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge className={tier.color}>{tier.tier}</Badge>
                    </TableCell>
                    <TableCell>{customer.lastOrderDate}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              <Eye className="h-3 w-3" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Customer Details</DialogTitle>
                              <DialogDescription>{customer.name}</DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <h4 className="font-semibold">Contact Information</h4>
                                  <p>{customer.name}</p>
                                  <p>{customer.email}</p>
                                  <p>{customer.phone}</p>
                                </div>
                                <div>
                                  <h4 className="font-semibold">Order History</h4>
                                  <p>Total Orders: {customer.totalOrders}</p>
                                  <p>Total Spent: KSH {customer.totalSpent.toLocaleString()}</p>
                                  <p>Customer Tier: {tier.tier}</p>
                                </div>
                              </div>
                              <div>
                                <h4 className="font-semibold">Timeline</h4>
                                <p>First Order: {customer.firstOrderDate}</p>
                                <p>Last Order: {customer.lastOrderDate}</p>
                                <p>Customer Since: {customer.firstOrderDate}</p>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                        <Button variant="outline" size="sm">
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-600 bg-transparent">
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Customer Tiers */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { tier: "Bronze", min: 0, max: 99999, count: customers.filter((c) => c.totalSpent < 100000).length },
          {
            tier: "Silver",
            min: 100000,
            max: 199999,
            count: customers.filter((c) => c.totalSpent >= 100000 && c.totalSpent < 200000).length,
          },
          {
            tier: "Gold",
            min: 200000,
            max: 499999,
            count: customers.filter((c) => c.totalSpent >= 200000 && c.totalSpent < 500000).length,
          },
          {
            tier: "VIP",
            min: 500000,
            max: Number.POSITIVE_INFINITY,
            count: customers.filter((c) => c.totalSpent >= 500000).length,
          },
        ].map((tierInfo) => (
          <Card key={tierInfo.tier}>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-gray-900">{tierInfo.count}</div>
              <div className="text-sm text-gray-600">{tierInfo.tier} Customers</div>
              <div className="text-xs text-gray-500 mt-1">
                KSH {tierInfo.min.toLocaleString()}
                {tierInfo.max !== Number.POSITIVE_INFINITY ? ` - ${tierInfo.max.toLocaleString()}` : "+"}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
