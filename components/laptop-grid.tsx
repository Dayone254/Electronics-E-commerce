"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Star,
  Heart,
  ShoppingCart,
  Eye,
  MessageCircle,
  Zap,
  Monitor,
  HardDrive,
  Cpu,
  Award,
  TrendingUp,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/components/cart-provider"
import { useToast } from "@/hooks/use-toast"
import { LaptopImageCarousel } from "@/components/laptop-image-carousel"
import type { Laptop } from "@/lib/laptop-inventory"

interface LaptopGridProps {
  laptops: Laptop[]
}

export function LaptopGrid({ laptops }: LaptopGridProps) {
  const [compareList, setCompareList] = useState<number[]>([])
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const { addItem } = useCart()
  const { toast } = useToast()

  const handleAddToCart = (laptop: Laptop) => {
    addItem({
      id: laptop.id,
      name: laptop.name,
      price: laptop.salePrice || laptop.price,
      image: laptop.image,
      specs: `${laptop.specs.processor}, ${laptop.specs.ram}, ${laptop.specs.storage}`,
    })
    toast({
      title: "Added to cart",
      description: `${laptop.name} has been added to your cart.`,
    })
  }

  const handleWhatsAppInquiry = (laptop: Laptop) => {
    const message = `Hi! I'm interested in the ${laptop.name} (KSH ${(laptop.salePrice || laptop.price).toLocaleString()}). Could you provide more details?`
    const whatsappUrl = `https://wa.me/254700000000?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  const toggleCompare = (laptopId: number) => {
    setCompareList((prev) => {
      if (prev.includes(laptopId)) {
        return prev.filter((id) => id !== laptopId)
      } else if (prev.length < 4) {
        return [...prev, laptopId]
      } else {
        toast({
          title: "Maximum reached",
          description: "You can only compare up to 4 laptops at once.",
          variant: "destructive",
        })
        return prev
      }
    })
  }

  const getCategoryIcon = (category: string) => {
    const icons = {
      gaming: "🎮",
      business: "💼",
      student: "🎓",
      convertible: "🔄",
      creator: "🎨",
    }
    return icons[category as keyof typeof icons] || "💻"
  }

  const getCategoryColor = (category: string) => {
    const colors = {
      gaming: "from-red-500 to-pink-500",
      business: "from-blue-500 to-indigo-500",
      student: "from-green-500 to-emerald-500",
      convertible: "from-purple-500 to-violet-500",
      creator: "from-orange-500 to-amber-500",
    }
    return colors[category as keyof typeof colors] || "from-gray-500 to-slate-500"
  }

  const getPerformanceLevel = (laptop: Laptop) => {
    const processor = laptop.specs.processor.toLowerCase()
    if (processor.includes("i9") || processor.includes("ryzen 9") || processor.includes("m3")) {
      return { level: "Ultra", color: "bg-red-100 text-red-700", icon: "🔥" }
    } else if (processor.includes("i7") || processor.includes("ryzen 7") || processor.includes("m2")) {
      return { level: "High", color: "bg-orange-100 text-orange-700", icon: "⚡" }
    } else if (processor.includes("i5") || processor.includes("ryzen 5")) {
      return { level: "Balanced", color: "bg-blue-100 text-blue-700", icon: "⚖️" }
    } else {
      return { level: "Essential", color: "bg-green-100 text-green-700", icon: "✅" }
    }
  }

  const inStockLaptops = laptops.filter((laptop) => laptop.inStock)

  return (
    <div className="space-y-6">
      {/* Compare Bar */}
      {compareList.length > 0 && (
        <div className="sticky top-20 z-40 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-xl shadow-lg backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-white/20 rounded-lg">
                <Eye className="h-4 w-4" />
              </div>
              <span className="font-semibold">
                {compareList.length} laptop{compareList.length > 1 ? "s" : ""} selected for comparison
              </span>
            </div>
            <div className="flex space-x-2">
              <Button
                variant="secondary"
                size="sm"
                disabled={compareList.length < 2}
                onClick={() => {
                  const compareIds = compareList.join(",")
                  window.location.href = `/compare?ids=${compareIds}`
                }}
                className="bg-white text-blue-600 hover:bg-gray-100"
              >
                Compare ({compareList.length})
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/20"
                onClick={() => setCompareList([])}
              >
                Clear
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Laptop Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {inStockLaptops.map((laptop) => {
          const performance = getPerformanceLevel(laptop)
          const isHovered = hoveredCard === laptop.id

          return (
            <Card
              key={laptop.id}
              className="group cursor-pointer transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 bg-white overflow-hidden border-0 shadow-lg"
              onMouseEnter={() => setHoveredCard(laptop.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <CardContent className="p-0">
                {/* Image Section with Carousel */}
                <div className="relative overflow-hidden h-48">
                  <Link href={`/product/${laptop.id}`}>
                    <LaptopImageCarousel
                      images={laptop.images}
                      productName={laptop.name}
                      className="transition-transform duration-700 group-hover:scale-110"
                    />
                  </Link>

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Category Badge */}
                  <div className="absolute top-3 left-3">
                    <div
                      className={`bg-gradient-to-r ${getCategoryColor(laptop.category)} text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center space-x-1 shadow-lg`}
                    >
                      <span>{getCategoryIcon(laptop.category)}</span>
                      <span className="capitalize">{laptop.category}</span>
                    </div>
                  </div>

                  {/* Badges */}
                  <div className="absolute top-3 right-3 flex flex-col space-y-1">
                    {laptop.badge && (
                      <Badge className="bg-orange-500 hover:bg-orange-600 shadow-lg text-xs">
                        <Award className="h-3 w-3 mr-1" />
                        {laptop.badge}
                      </Badge>
                    )}
                    {laptop.salePrice && (
                      <Badge variant="destructive" className="shadow-lg text-xs">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        Save KSH {(laptop.price - laptop.salePrice).toLocaleString()}
                      </Badge>
                    )}
                  </div>

                  {/* Action Buttons - Show on Hover */}
                  <div
                    className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex space-x-2 transition-all duration-300 ${isHovered ? "opacity-100 scale-100" : "opacity-0 scale-75"}`}
                  >
                    <Button size="sm" className="bg-white/90 text-gray-900 hover:bg-white shadow-lg p-2">
                      <Eye className="h-3 w-3" />
                    </Button>
                    <Button size="sm" className="bg-white/90 text-gray-900 hover:bg-white shadow-lg p-2">
                      <Heart className="h-3 w-3" />
                    </Button>
                  </div>

                  {/* Stock Status */}
                  {laptop.stockCount <= 5 && (
                    <div className="absolute bottom-3 left-3">
                      <Badge
                        variant="outline"
                        className="bg-white/95 backdrop-blur-sm shadow-lg border-orange-200 text-xs"
                      >
                        🔥 Only {laptop.stockCount} left
                      </Badge>
                    </div>
                  )}
                </div>

                {/* Content Section */}
                <div className="p-4 space-y-3">
                  {/* Brand and Performance */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white text-sm font-bold">
                        {laptop.brand.charAt(0)}
                      </div>
                      <span className="text-sm font-semibold text-blue-600 uppercase tracking-wide">
                        {laptop.brand}
                      </span>
                    </div>
                    <div
                      className={`px-2 py-1 rounded-full text-xs font-medium ${performance.color} flex items-center space-x-1`}
                    >
                      <span>{performance.icon}</span>
                      <span>{performance.level}</span>
                    </div>
                  </div>

                  {/* Product Name */}
                  <Link href={`/product/${laptop.id}`}>
                    <h3 className="font-bold text-base text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 leading-tight">
                      {laptop.name}
                    </h3>
                  </Link>

                  {/* Key Specs with Icons */}
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-xs text-gray-600">
                      <Cpu className="h-3 w-3 text-blue-500" />
                      <span className="font-medium">{laptop.specs.processor}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-600">
                      <div className="flex items-center space-x-2">
                        <Zap className="h-3 w-3 text-green-500" />
                        <span>{laptop.specs.ram}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <HardDrive className="h-3 w-3 text-purple-500" />
                        <span>{laptop.specs.storage}</span>
                      </div>
                    </div>
                    {laptop.specs.graphics && (
                      <div className="flex items-center space-x-2 text-xs text-gray-600">
                        <Monitor className="h-3 w-3 text-red-500" />
                        <span className="font-medium">{laptop.specs.graphics}</span>
                      </div>
                    )}
                    <div className="flex items-center space-x-2 text-xs text-gray-600">
                      <Monitor className="h-3 w-3 text-indigo-500" />
                      <span>{laptop.specs.display}</span>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3 w-3 ${
                              i < Math.floor(laptop.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm font-medium text-gray-700">{laptop.rating}</span>
                    </div>
                    <span className="text-xs text-gray-500">({laptop.reviews} reviews)</span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center justify-between py-2">
                    <div className="flex items-center space-x-2">
                      {laptop.salePrice ? (
                        <>
                          <span className="text-lg font-bold text-gray-900">
                            KSH {laptop.salePrice.toLocaleString()}
                          </span>
                          <span className="text-sm text-gray-500 line-through">
                            KSH {laptop.price.toLocaleString()}
                          </span>
                        </>
                      ) : (
                        <span className="text-lg font-bold text-gray-900">KSH {laptop.price.toLocaleString()}</span>
                      )}
                    </div>
                    {laptop.salePrice && (
                      <div className="text-right">
                        <div className="text-xs text-green-600 font-medium">You Save</div>
                        <div className="text-sm font-bold text-green-600">
                          KSH {(laptop.price - laptop.salePrice).toLocaleString()}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3">
                    <div className="flex space-x-2">
                      <Button
                        className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg text-sm py-2"
                        onClick={() => handleAddToCart(laptop)}
                      >
                        <ShoppingCart className="h-3 w-3 mr-2" />
                        Add to Cart
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="px-3 border-green-200 text-green-600 hover:bg-green-50 hover:border-green-300 bg-transparent"
                        onClick={() => handleWhatsAppInquiry(laptop)}
                      >
                        <MessageCircle className="h-3 w-3" />
                      </Button>
                    </div>

                    {/* WhatsApp Inquiry Button */}
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full border-green-200 text-green-600 hover:bg-green-50 hover:border-green-300 transition-all duration-300 bg-transparent text-xs py-2"
                      onClick={() => handleWhatsAppInquiry(laptop)}
                    >
                      <MessageCircle className="h-3 w-3 mr-2" />
                      WhatsApp Inquiry
                    </Button>

                    {/* Compare Checkbox */}
                    <div className="flex items-center justify-center pt-2">
                      <label className="flex items-center space-x-2 cursor-pointer text-sm text-gray-600 hover:text-blue-600 transition-colors">
                        <input
                          type="checkbox"
                          checked={compareList.includes(laptop.id)}
                          onChange={() => toggleCompare(laptop.id)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span>Compare this laptop</span>
                      </label>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* No Results */}
      {inStockLaptops.length === 0 && (
        <div className="text-center py-16">
          <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
            <span className="text-4xl">🔍</span>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No laptops found</h3>
          <p className="text-gray-600 mb-6">Try adjusting your filters or search criteria to find more options.</p>
          <Button variant="outline" onClick={() => window.location.reload()}>
            Reset Filters
          </Button>
        </div>
      )}
    </div>
  )
}
