"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { UniversalDealsSlider } from "@/components/universal-deals-slider"
import { useCart } from "@/components/cart-provider"
import { Clock, Flame, Star, ShoppingCart, Heart, Eye } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

// Mock deals data
const hotDeals = [
  {
    id: "deal-1",
    name: "MacBook Pro 14-inch M3",
    originalPrice: 299999,
    salePrice: 249999,
    discount: 17,
    image: "/macbook-pro-space-gray.png",
    category: "laptops",
    brand: "Apple",
    rating: 4.9,
    reviews: 234,
    timeLeft: "2 days",
    stock: 5,
    features: ["M3 Chip", "16GB RAM", "512GB SSD", "Liquid Retina XDR"],
  },
  {
    id: "deal-2",
    name: "Samsung Galaxy S24 Ultra",
    originalPrice: 159999,
    salePrice: 129999,
    discount: 19,
    image: "/samsung-galaxy-s24-ultra.png",
    category: "phones",
    brand: "Samsung",
    rating: 4.8,
    reviews: 456,
    timeLeft: "1 day",
    stock: 12,
    features: ["200MP Camera", "S Pen", "5000mAh Battery", "AI Features"],
  },
  {
    id: "deal-3",
    name: "LG OLED 65-inch C3 Smart TV",
    originalPrice: 249999,
    salePrice: 199999,
    discount: 20,
    image: "/lg-oled-tv.png",
    category: "tvs",
    brand: "LG",
    rating: 4.7,
    reviews: 189,
    timeLeft: "3 days",
    stock: 8,
    features: ["4K OLED", "webOS", "Dolby Vision", "Gaming Mode"],
  },
]

const flashSales = [
  {
    id: "flash-1",
    name: "Dell XPS 13 Plus",
    originalPrice: 179999,
    salePrice: 149999,
    discount: 17,
    image: "/dell-xps-15-silver.png",
    timeLeft: "4h 23m",
    sold: 45,
    total: 100,
  },
  {
    id: "flash-2",
    name: "iPad Pro 12.9-inch",
    originalPrice: 139999,
    salePrice: 119999,
    discount: 14,
    image: "/ipad-pro.png",
    timeLeft: "2h 15m",
    sold: 78,
    total: 120,
  },
]

export default function DealsPage() {
  const { addItem } = useCart()
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const handleAddToCart = (product: any) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.salePrice,
      image: product.image,
      quantity: 1,
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-red-600 to-pink-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">🔥 Hot Deals & Special Offers</h1>
            <p className="text-xl text-red-100 max-w-2xl mx-auto">
              Limited time offers on premium electronics. Save up to 50% on selected items!
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Flash Sales Section */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <Flame className="h-6 w-6 text-red-500" />
              <h2 className="text-2xl font-bold text-gray-900">Flash Sales</h2>
              <Badge variant="destructive" className="animate-pulse">
                Limited Time
              </Badge>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {flashSales.map((deal) => (
              <Card
                key={deal.id}
                className="overflow-hidden border-2 border-red-200 hover:border-red-400 transition-colors"
              >
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="relative w-24 h-24 flex-shrink-0">
                      <Image
                        src={deal.image || "/placeholder.svg"}
                        alt={deal.name}
                        fill
                        className="object-cover rounded-lg"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-2">{deal.name}</h3>
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-2xl font-bold text-red-600">KSH {deal.salePrice.toLocaleString()}</span>
                        <span className="text-sm text-gray-500 line-through">
                          KSH {deal.originalPrice.toLocaleString()}
                        </span>
                        <Badge variant="destructive">{deal.discount}% OFF</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <Clock className="h-4 w-4" />
                          <span>{deal.timeLeft}</span>
                        </div>
                        <div className="text-sm text-gray-600">
                          {deal.sold}/{deal.total} sold
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                        <div
                          className="bg-red-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${(deal.sold / deal.total) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Hot Deals Section */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">🔥 Hot Deals</h2>
            <div className="flex space-x-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
              >
                Grid
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
              >
                List
              </Button>
            </div>
          </div>

          <div
            className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`}
          >
            {hotDeals.map((deal) => (
              <Card key={deal.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <Image
                    src={deal.image || "/placeholder.svg"}
                    alt={deal.name}
                    width={400}
                    height={300}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-2 left-2">
                    <Badge variant="destructive" className="text-xs">
                      {deal.discount}% OFF
                    </Badge>
                  </div>
                  <div className="absolute top-2 right-2 flex space-x-1">
                    <Button size="sm" variant="secondary" className="h-8 w-8 p-0">
                      <Heart className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="secondary" className="h-8 w-8 p-0">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                  {deal.stock <= 10 && (
                    <div className="absolute bottom-2 left-2">
                      <Badge variant="outline" className="bg-white/90 text-xs">
                        Only {deal.stock} left!
                      </Badge>
                    </div>
                  )}
                </div>

                <CardContent className="p-4">
                  <div className="mb-2">
                    <Badge variant="outline" className="text-xs mb-2">
                      {deal.brand}
                    </Badge>
                    <h3 className="font-semibold text-lg mb-1">{deal.name}</h3>
                    <div className="flex items-center space-x-1 mb-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < Math.floor(deal.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">
                        {deal.rating} ({deal.reviews} reviews)
                      </span>
                    </div>
                  </div>

                  <div className="mb-3">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-2xl font-bold text-green-600">KSH {deal.salePrice.toLocaleString()}</span>
                      <span className="text-sm text-gray-500 line-through">
                        KSH {deal.originalPrice.toLocaleString()}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600 mb-2">
                      You save: KSH {(deal.originalPrice - deal.salePrice).toLocaleString()}
                    </div>
                  </div>

                  <div className="mb-3">
                    <div className="flex items-center space-x-2 text-sm text-red-600 mb-2">
                      <Clock className="h-4 w-4" />
                      <span>Ends in {deal.timeLeft}</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {deal.features.slice(0, 2).map((feature, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button onClick={() => handleAddToCart(deal)} className="flex-1" size="sm">
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Add to Cart
                    </Button>
                    <Link href={`/${deal.category}/${deal.id}`}>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Deals Slider */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">More Great Deals</h2>
          <UniversalDealsSlider />
        </section>
      </div>
    </div>
  )
}
