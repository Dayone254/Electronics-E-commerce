"use client"

import { useState } from "react"
import {
  User,
  Package,
  Heart,
  Settings,
  CreditCard,
  MapPin,
  Bell,
  Shield,
  LogOut,
  Edit3,
  Plus,
  Trash2,
  Eye,
  Star,
  Calendar,
  Phone,
  Mail,
  Award,
  ShoppingBag,
  Clock,
  CheckCircle,
  Truck,
  AlertCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useCart } from "@/components/cart-provider"

// Mock user data with more realistic information
const mockUser = {
  id: 1,
  name: "Sarah Johnson",
  email: "sarah.johnson@gmail.com",
  phone: "+254 712 345 678",
  avatar: "/placeholder.svg?height=120&width=120&text=SJ",
  memberSince: "March 2023",
  tier: "Gold",
  totalOrders: 8,
  totalSpent: 287500,
  loyaltyPoints: 2875,
  nextTierSpend: 212500, // Amount needed to reach next tier
  addresses: [
    {
      id: 1,
      type: "Home",
      name: "Sarah Johnson",
      address: "Apartment 4B, Riverside Drive, Westlands",
      city: "Nairobi",
      phone: "+254 712 345 678",
      isDefault: true,
    },
    {
      id: 2,
      type: "Office",
      name: "Sarah Johnson",
      address: "TechHub Building, 5th Floor, Ngong Road",
      city: "Nairobi",
      phone: "+254 712 345 678",
      isDefault: false,
    },
  ],
  orders: [
    {
      id: "APX-2024-001",
      date: "2024-01-15",
      status: "Delivered",
      total: 129900,
      items: 2,
      products: ['MacBook Pro 16" M3', "Magic Mouse 2"],
      trackingNumber: "TRK123456789",
      estimatedDelivery: "2024-01-18",
    },
    {
      id: "APX-2024-002",
      date: "2024-01-10",
      status: "Processing",
      total: 89900,
      items: 1,
      products: ["iPhone 15 Pro 256GB"],
      trackingNumber: "TRK987654321",
      estimatedDelivery: "2024-01-20",
    },
    {
      id: "APX-2024-003",
      date: "2024-01-05",
      status: "Shipped",
      total: 67700,
      items: 3,
      products: ["AirPods Pro 2nd Gen", "iPhone 15 Case", "Screen Protector"],
      trackingNumber: "TRK456789123",
      estimatedDelivery: "2024-01-12",
    },
  ],
  wishlist: [
    {
      id: 1,
      name: "Dell XPS 15 OLED",
      price: 189900,
      originalPrice: 219900,
      image: "/dell-xps-15-silver.png",
      inStock: true,
      rating: 4.8,
      reviews: 124,
    },
    {
      id: 2,
      name: "Samsung Galaxy S24 Ultra",
      price: 139900,
      originalPrice: 159900,
      image: "/samsung-galaxy-s24-ultra.png",
      inStock: true,
      rating: 4.9,
      reviews: 89,
    },
    {
      id: 3,
      name: "Sony WH-1000XM5 Headphones",
      price: 34900,
      originalPrice: 39900,
      image: "/placeholder.svg?height=200&width=200&text=Sony+WH-1000XM5",
      inStock: false,
      rating: 4.7,
      reviews: 256,
    },
  ],
}

export default function ProfilePage() {
  const [user, setUser] = useState(mockUser)
  const [isEditing, setIsEditing] = useState(false)
  const [notifications, setNotifications] = useState({
    orderUpdates: true,
    promotions: false,
    newsletter: true,
    sms: false,
  })
  const { addItem } = useCart()

  const handleSaveProfile = () => {
    setIsEditing(false)
    // Here you would typically save to backend
  }

  const getTierInfo = (tier: string) => {
    switch (tier) {
      case "Bronze":
        return { color: "bg-amber-100 text-amber-800 border-amber-200", icon: "🥉", nextTier: "Silver" }
      case "Silver":
        return { color: "bg-gray-100 text-gray-800 border-gray-200", icon: "🥈", nextTier: "Gold" }
      case "Gold":
        return { color: "bg-yellow-100 text-yellow-800 border-yellow-200", icon: "🥇", nextTier: "Platinum" }
      case "Platinum":
        return { color: "bg-purple-100 text-purple-800 border-purple-200", icon: "💎", nextTier: "VIP" }
      default:
        return { color: "bg-gray-100 text-gray-800 border-gray-200", icon: "🏅", nextTier: "Silver" }
    }
  }

  const getStatusInfo = (status: string) => {
    switch (status) {
      case "Delivered":
        return {
          color: "bg-green-50 text-green-700 border-green-200",
          icon: <CheckCircle className="h-4 w-4" />,
          bgColor: "bg-green-50",
        }
      case "Processing":
        return {
          color: "bg-blue-50 text-blue-700 border-blue-200",
          icon: <Clock className="h-4 w-4" />,
          bgColor: "bg-blue-50",
        }
      case "Shipped":
        return {
          color: "bg-purple-50 text-purple-700 border-purple-200",
          icon: <Truck className="h-4 w-4" />,
          bgColor: "bg-purple-50",
        }
      case "Cancelled":
        return {
          color: "bg-red-50 text-red-700 border-red-200",
          icon: <AlertCircle className="h-4 w-4" />,
          bgColor: "bg-red-50",
        }
      default:
        return {
          color: "bg-gray-50 text-gray-700 border-gray-200",
          icon: <Clock className="h-4 w-4" />,
          bgColor: "bg-gray-50",
        }
    }
  }

  const tierInfo = getTierInfo(user.tier)
  const progressPercentage = (user.totalSpent / (user.totalSpent + user.nextTierSpend)) * 100

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            {/* User Info */}
            <div className="flex items-center gap-6">
              <Avatar className="h-20 w-20 ring-4 ring-white shadow-lg">
                <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                <AvatarFallback className="text-xl font-semibold bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                  {user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
                <p className="text-gray-600 flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  {user.email}
                </p>
                <p className="text-gray-600 flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  {user.phone}
                </p>
                <div className="flex items-center gap-3 mt-2">
                  <Badge className={`${tierInfo.color} border font-medium`}>
                    {tierInfo.icon} {user.tier} Member
                  </Badge>
                  <span className="text-sm text-gray-500 flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    Since {user.memberSince}
                  </span>
                </div>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 text-center border border-blue-200">
                <div className="text-2xl font-bold text-blue-700">KSH {(user.totalSpent / 1000).toFixed(0)}K</div>
                <div className="text-sm text-blue-600 font-medium">Total Spent</div>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 text-center border border-green-200">
                <div className="text-2xl font-bold text-green-700">{user.totalOrders}</div>
                <div className="text-sm text-green-600 font-medium">Orders</div>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 text-center border border-purple-200 col-span-2 lg:col-span-1">
                <div className="text-2xl font-bold text-purple-700">{user.loyaltyPoints}</div>
                <div className="text-sm text-purple-600 font-medium">Loyalty Points</div>
              </div>
            </div>
          </div>

          {/* Tier Progress */}
          <div className="mt-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-4 border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Progress to {tierInfo.nextTier}</span>
              <span className="text-sm text-gray-600">KSH {user.nextTierSpend.toLocaleString()} remaining</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="orders" className="space-y-8">
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 bg-white border border-gray-200 p-1 rounded-xl">
            <TabsTrigger
              value="orders"
              className="flex items-center gap-2 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700"
            >
              <Package className="h-4 w-4" />
              <span className="hidden sm:inline">Orders</span>
            </TabsTrigger>
            <TabsTrigger
              value="wishlist"
              className="flex items-center gap-2 data-[state=active]:bg-red-50 data-[state=active]:text-red-700"
            >
              <Heart className="h-4 w-4" />
              <span className="hidden sm:inline">Wishlist</span>
            </TabsTrigger>
            <TabsTrigger
              value="profile"
              className="flex items-center gap-2 data-[state=active]:bg-green-50 data-[state=active]:text-green-700"
            >
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">Profile</span>
            </TabsTrigger>
            <TabsTrigger
              value="addresses"
              className="flex items-center gap-2 data-[state=active]:bg-purple-50 data-[state=active]:text-purple-700"
            >
              <MapPin className="h-4 w-4" />
              <span className="hidden sm:inline">Addresses</span>
            </TabsTrigger>
            <TabsTrigger
              value="payments"
              className="flex items-center gap-2 data-[state=active]:bg-yellow-50 data-[state=active]:text-yellow-700"
            >
              <CreditCard className="h-4 w-4" />
              <span className="hidden sm:inline">Payments</span>
            </TabsTrigger>
            <TabsTrigger
              value="settings"
              className="flex items-center gap-2 data-[state=active]:bg-gray-50 data-[state=active]:text-gray-700"
            >
              <Settings className="h-4 w-4" />
              <span className="hidden sm:inline">Settings</span>
            </TabsTrigger>
          </TabsList>

          {/* Orders Tab */}
          <TabsContent value="orders" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">Order History</h2>
              <Button variant="outline" className="bg-white">
                <Eye className="h-4 w-4 mr-2" />
                View All
              </Button>
            </div>

            <div className="grid gap-4">
              {user.orders.map((order) => {
                const statusInfo = getStatusInfo(order.status)
                return (
                  <Card key={order.id} className="overflow-hidden border-0 shadow-sm bg-white">
                    <CardContent className="p-0">
                      <div
                        className={`${statusInfo.bgColor} px-6 py-4 border-l-4 ${statusInfo.color.replace("bg-", "border-").replace("-50", "-400")}`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2">
                              {statusInfo.icon}
                              <Badge className={`${statusInfo.color} border-0 font-medium`}>{order.status}</Badge>
                            </div>
                            <Separator orientation="vertical" className="h-6" />
                            <div>
                              <p className="font-semibold text-gray-900">Order {order.id}</p>
                              <p className="text-sm text-gray-600">{order.date}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold text-gray-900">KSH {order.total.toLocaleString()}</p>
                            <p className="text-sm text-gray-600">
                              {order.items} {order.items === 1 ? "item" : "items"}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="px-6 py-4">
                        <div className="flex items-center justify-between">
                          <div className="space-y-1">
                            <p className="text-sm font-medium text-gray-900">Products:</p>
                            <p className="text-sm text-gray-600">{order.products.join(", ")}</p>
                            {order.trackingNumber && (
                              <p className="text-xs text-gray-500">Tracking: {order.trackingNumber}</p>
                            )}
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" className="bg-white">
                              <Eye className="h-4 w-4 mr-1" />
                              Details
                            </Button>
                            {order.status === "Delivered" && (
                              <Button variant="outline" size="sm" className="bg-white">
                                <Star className="h-4 w-4 mr-1" />
                                Review
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          {/* Wishlist Tab */}
          <TabsContent value="wishlist" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">My Wishlist</h2>
              <p className="text-sm text-gray-600">{user.wishlist.length} items saved</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {user.wishlist.map((item) => (
                <Card
                  key={item.id}
                  className="group overflow-hidden border-0 shadow-sm bg-white hover:shadow-md transition-all duration-200"
                >
                  <CardContent className="p-0">
                    <div className="relative">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-200"
                      />
                      {!item.inStock && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                          <Badge variant="secondary" className="bg-white/90 text-gray-900">
                            Out of Stock
                          </Badge>
                        </div>
                      )}
                      <Button variant="ghost" size="sm" className="absolute top-2 right-2 bg-white/80 hover:bg-white">
                        <Heart className="h-4 w-4 fill-red-500 text-red-500" />
                      </Button>
                    </div>

                    <div className="p-4 space-y-3">
                      <div>
                        <h3 className="font-semibold text-gray-900 line-clamp-2">{item.name}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            <span className="text-xs text-gray-600">{item.rating}</span>
                          </div>
                          <span className="text-xs text-gray-400">({item.reviews} reviews)</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-gray-900">KSH {item.price.toLocaleString()}</span>
                        {item.originalPrice && item.originalPrice > item.price && (
                          <span className="text-sm text-gray-500 line-through">
                            KSH {item.originalPrice.toLocaleString()}
                          </span>
                        )}
                      </div>

                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          className="flex-1"
                          onClick={() =>
                            addItem({
                              id: item.id,
                              name: item.name,
                              price: item.price,
                              image: item.image,
                              specs: "Premium specs",
                            })
                          }
                          disabled={!item.inStock}
                        >
                          <ShoppingBag className="h-4 w-4 mr-1" />
                          Add to Cart
                        </Button>
                        <Button variant="outline" size="sm" className="bg-white">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <Card className="border-0 shadow-sm bg-white">
              <CardHeader className="flex flex-row items-center justify-between border-b border-gray-100">
                <CardTitle className="text-xl font-semibold text-gray-900">Personal Information</CardTitle>
                <Button
                  variant={isEditing ? "default" : "outline"}
                  onClick={isEditing ? handleSaveProfile : () => setIsEditing(true)}
                  className={isEditing ? "" : "bg-white"}
                >
                  {isEditing ? (
                    <>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Save Changes
                    </>
                  ) : (
                    <>
                      <Edit3 className="h-4 w-4 mr-2" />
                      Edit Profile
                    </>
                  )}
                </Button>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                      Full Name
                    </Label>
                    <Input
                      id="name"
                      value={user.name}
                      onChange={(e) => setUser({ ...user, name: e.target.value })}
                      disabled={!isEditing}
                      className={isEditing ? "border-blue-200 focus:border-blue-400" : "bg-gray-50"}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={user.email}
                      onChange={(e) => setUser({ ...user, email: e.target.value })}
                      disabled={!isEditing}
                      className={isEditing ? "border-blue-200 focus:border-blue-400" : "bg-gray-50"}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      value={user.phone}
                      onChange={(e) => setUser({ ...user, phone: e.target.value })}
                      disabled={!isEditing}
                      className={isEditing ? "border-blue-200 focus:border-blue-400" : "bg-gray-50"}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tier" className="text-sm font-medium text-gray-700">
                      Membership Tier
                    </Label>
                    <div className="flex items-center gap-2">
                      <Input id="tier" value={`${tierInfo.icon} ${user.tier} Member`} disabled className="bg-gray-50" />
                      <Badge className={`${tierInfo.color} border font-medium whitespace-nowrap`}>Active</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Addresses Tab */}
          <TabsContent value="addresses" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">Delivery Addresses</h2>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                Add New Address
              </Button>
            </div>

            <div className="grid gap-4">
              {user.addresses.map((address) => (
                <Card key={address.id} className="border-0 shadow-sm bg-white">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                            <MapPin className="h-3 w-3 mr-1" />
                            {address.type}
                          </Badge>
                          {address.isDefault && (
                            <Badge className="bg-green-50 text-green-700 border-green-200">Default</Badge>
                          )}
                        </div>
                        <div className="space-y-1">
                          <p className="font-semibold text-gray-900">{address.name}</p>
                          <p className="text-gray-600">{address.address}</p>
                          <p className="text-gray-600">{address.city}</p>
                          <p className="text-sm text-gray-500 flex items-center gap-1">
                            <Phone className="h-3 w-3" />
                            {address.phone}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="bg-white">
                          <Edit3 className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                        <Button variant="outline" size="sm" className="bg-white text-red-600 hover:text-red-700">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Payments Tab */}
          <TabsContent value="payments" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">Payment Methods</h2>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                Add Payment Method
              </Button>
            </div>

            <div className="grid gap-4">
              <Card className="border-0 shadow-sm bg-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-md flex items-center justify-center shadow-sm">
                        <span className="text-white text-xs font-bold">VISA</span>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">•••• •••• •••• 1234</p>
                        <p className="text-sm text-gray-600">Expires 12/25</p>
                        <Badge className="bg-green-50 text-green-700 border-green-200 mt-1">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Verified
                        </Badge>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="bg-white">
                        <Edit3 className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      <Button variant="outline" size="sm" className="bg-white text-red-600 hover:text-red-700">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm bg-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-8 bg-gradient-to-r from-green-600 to-green-700 rounded-md flex items-center justify-center shadow-sm">
                        <span className="text-white text-xs font-bold">M-PESA</span>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">+254 712 345 678</p>
                        <p className="text-sm text-gray-600">Primary M-Pesa Account</p>
                        <Badge className="bg-green-50 text-green-700 border-green-200 mt-1">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Active
                        </Badge>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="bg-white">
                        <Edit3 className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      <Button variant="outline" size="sm" className="bg-white text-red-600 hover:text-red-700">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <div className="grid gap-6">
              {/* Notifications */}
              <Card className="border-0 shadow-sm bg-white">
                <CardHeader className="border-b border-gray-100">
                  <CardTitle className="flex items-center gap-2 text-lg font-semibold text-gray-900">
                    <Bell className="h-5 w-5" />
                    Notification Preferences
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="font-medium text-gray-900">Order Updates</p>
                      <p className="text-sm text-gray-600">Get notified about your order status changes</p>
                    </div>
                    <Switch
                      checked={notifications.orderUpdates}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, orderUpdates: checked })}
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="font-medium text-gray-900">Promotions & Deals</p>
                      <p className="text-sm text-gray-600">Receive exclusive offers and discounts</p>
                    </div>
                    <Switch
                      checked={notifications.promotions}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, promotions: checked })}
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="font-medium text-gray-900">Newsletter</p>
                      <p className="text-sm text-gray-600">Weekly tech news and product updates</p>
                    </div>
                    <Switch
                      checked={notifications.newsletter}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, newsletter: checked })}
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="font-medium text-gray-900">SMS Notifications</p>
                      <p className="text-sm text-gray-600">Receive important updates via SMS</p>
                    </div>
                    <Switch
                      checked={notifications.sms}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, sms: checked })}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Security */}
              <Card className="border-0 shadow-sm bg-white">
                <CardHeader className="border-b border-gray-100">
                  <CardTitle className="flex items-center gap-2 text-lg font-semibold text-gray-900">
                    <Shield className="h-5 w-5" />
                    Security & Privacy
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <Button variant="outline" className="w-full justify-start bg-white hover:bg-gray-50">
                    <Shield className="mr-3 h-4 w-4" />
                    Change Password
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-white hover:bg-gray-50">
                    <Award className="mr-3 h-4 w-4" />
                    Enable Two-Factor Authentication
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-white hover:bg-gray-50">
                    <Package className="mr-3 h-4 w-4" />
                    Download My Data
                  </Button>
                  <Separator />
                  <Button
                    variant="destructive"
                    className="w-full justify-start bg-red-50 text-red-700 hover:bg-red-100 border-red-200"
                  >
                    <LogOut className="mr-3 h-4 w-4" />
                    Sign Out of All Devices
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
