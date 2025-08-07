"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Star,
  Heart,
  ShoppingCart,
  ChevronLeft,
  ChevronRight,
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

// Mock product data with KSH pricing
const featuredProducts = [
  {
    id: 1,
    name: "Dell XPS 15",
    specs: {
      processor: "Intel Core i7-13700H",
      ram: "16GB DDR5",
      storage: "512GB NVMe SSD",
      display: '15.6" 4K OLED Touch',
    },
    price: 189900,
    salePrice: 169900,
    rating: 4.8,
    reviews: 124,
    image: "/dell-xps-15-silver.png",
    badge: "Best Seller",
    brand: "Dell",
    category: "business",
    stockCount: 12,
  },
  {
    id: 2,
    name: 'MacBook Pro 16"',
    specs: {
      processor: "Apple M3 Pro",
      ram: "18GB Unified Memory",
      storage: "512GB SSD",
      display: '16.2" Liquid Retina XDR',
    },
    price: 249900,
    rating: 4.9,
    reviews: 89,
    image: "/macbook-pro-space-gray.png",
    badge: "Editor's Choice",
    brand: "Apple",
    category: "business",
    stockCount: 8,
  },
  {
    id: 3,
    name: "ASUS ROG Strix G15",
    specs: {
      processor: "AMD Ryzen 7 6800H",
      ram: "16GB DDR5",
      storage: "512GB NVMe SSD",
      graphics: "NVIDIA RTX 4060 8GB",
      display: '15.6" FHD 144Hz',
    },
    price: 129900,
    salePrice: 119900,
    rating: 4.6,
    reviews: 156,
    image: "/placeholder-7apiw.png",
    badge: "Gaming",
    brand: "ASUS",
    category: "gaming",
    stockCount: 15,
  },
  {
    id: 4,
    name: "HP Spectre x360",
    specs: {
      processor: "Intel Core i5-1235U",
      ram: "16GB LPDDR4x",
      storage: "512GB NVMe SSD",
      display: '13.5" 3K2K OLED Touch',
    },
    price: 139900,
    rating: 4.7,
    reviews: 78,
    image: "/hp-spectre-x360-gold.png",
    badge: "2-in-1",
    brand: "HP",
    category: "convertible",
    stockCount: 7,
  },
  {
    id: 5,
    name: "Lenovo ThinkPad X1",
    specs: {
      processor: "Intel Core i7-1365U",
      ram: "32GB LPDDR5",
      storage: "1TB NVMe SSD",
      display: '14" WUXGA IPS',
    },
    price: 219900,
    rating: 4.8,
    reviews: 92,
    image: "/lenovo-thinkpad-x1-carbon.png",
    badge: "Business",
    brand: "Lenovo",
    category: "business",
    stockCount: 18,
  },
  {
    id: 6,
    name: "MSI Creator Z16",
    specs: {
      processor: "Intel Core i9-12900H",
      ram: "32GB DDR5",
      storage: "1TB NVMe SSD",
      graphics: "NVIDIA RTX 4070 8GB",
      display: '16" QHD+ Touch',
    },
    price: 279900,
    salePrice: 259900,
    rating: 4.5,
    reviews: 43,
    image: "/placeholder.svg?height=300&width=400",
    badge: "Creator",
    brand: "MSI",
    category: "creator",
    stockCount: 4,
  },
]

export function FeaturedProducts() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const { addItem } = useCart()
  const { toast } = useToast()
  const itemsPerPage = 4

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + itemsPerPage >= featuredProducts.length ? 0 : prev + itemsPerPage))
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? Math.max(0, featuredProducts.length - itemsPerPage) : prev - itemsPerPage))
  }

  const handleAddToCart = (product: (typeof featuredProducts)[0]) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.salePrice || product.price,
      image: product.image,
      specs: `${product.specs.processor}, ${product.specs.ram}, ${product.specs.storage}`,
    })
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    })
  }

  const handleWhatsAppInquiry = (product: (typeof featuredProducts)[0]) => {
    const message = `Hi! I'm interested in the ${product.name} (KSH ${(product.salePrice || product.price).toLocaleString()}). Could you provide more details?`
    const whatsappUrl = `https://wa.me/254700000000?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
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

  const getPerformanceLevel = (product: (typeof featuredProducts)[0]) => {
    const processor = product.specs.processor.toLowerCase()
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

  const visibleProducts = featuredProducts.slice(currentIndex, currentIndex + itemsPerPage)

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-3">Best Sellers</h2>
            <p className="text-sm text-gray-600">Our most popular laptops chosen by customers like you</p>
          </div>
          <div className="hidden md:flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={prevSlide}
              disabled={currentIndex === 0}
              className="h-8 w-8 p-0 bg-transparent"
            >
              <ChevronLeft className="h-3 w-3" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={nextSlide}
              disabled={currentIndex + itemsPerPage >= featuredProducts.length}
              className="h-8 w-8 p-0"
            >
              <ChevronRight className="h-3 w-3" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {visibleProducts.map((product) => {
            const performance = getPerformanceLevel(product)
            const isHovered = hoveredCard === product.id

            return (
              <Card
                key={product.id}
                className="group cursor-pointer transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 bg-white overflow-hidden border-0 shadow-lg"
                onMouseEnter={() => setHoveredCard(product.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <CardContent className="p-0">
                  {/* Image Section with Overlay */}
                  <div className="relative overflow-hidden">
                    <Link href={`/product/${product.id}`}>
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </Link>

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Category Badge */}
                    <div className="absolute top-3 left-3">
                      <div
                        className={`bg-gradient-to-r ${getCategoryColor(product.category)} text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center space-x-1 shadow-lg`}
                      >
                        <span>{getCategoryIcon(product.category)}</span>
                        <span className="capitalize">{product.category}</span>
                      </div>
                    </div>

                    {/* Badges */}
                    <div className="absolute top-3 right-3 flex flex-col space-y-1">
                      {product.badge && (
                        <Badge className="bg-orange-500 hover:bg-orange-600 shadow-lg text-xs">
                          <Award className="h-3 w-3 mr-1" />
                          {product.badge}
                        </Badge>
                      )}
                      {product.salePrice && (
                        <Badge variant="destructive" className="shadow-lg text-xs">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          Save KSH {(product.price - product.salePrice).toLocaleString()}
                        </Badge>
                      )}
                    </div>

                    {/* Action Buttons - Show on Hover */}
                    <div
                      className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex space-x-2 transition-all duration-300 ${isHovered ? "opacity-100 scale-100" : "opacity-0 scale-75"}`}
                    >
                      <Button size="sm" className="bg-white/90 text-gray-900 hover:bg-white shadow-lg p-2">
                        <Heart className="h-3 w-3" />
                      </Button>
                    </div>

                    {/* Stock Status */}
                    {product.stockCount <= 5 && (
                      <div className="absolute bottom-3 left-3">
                        <Badge
                          variant="outline"
                          className="bg-white/95 backdrop-blur-sm shadow-lg border-orange-200 text-xs"
                        >
                          🔥 Only {product.stockCount} left
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
                          {product.brand.charAt(0)}
                        </div>
                        <span className="text-sm font-semibold text-blue-600 uppercase tracking-wide">
                          {product.brand}
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
                    <Link href={`/product/${product.id}`}>
                      <h3 className="font-bold text-base text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 leading-tight">
                        {product.name}
                      </h3>
                    </Link>

                    {/* Key Specs with Icons */}
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-xs text-gray-600">
                        <Cpu className="h-3 w-3 text-blue-500" />
                        <span className="font-medium">{product.specs.processor}</span>
                      </div>
                      <div className="flex items-center justify-between text-xs text-gray-600">
                        <div className="flex items-center space-x-2">
                          <Zap className="h-3 w-3 text-green-500" />
                          <span>{product.specs.ram}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <HardDrive className="h-3 w-3 text-purple-500" />
                          <span>{product.specs.storage}</span>
                        </div>
                      </div>
                      {product.specs.graphics && (
                        <div className="flex items-center space-x-2 text-xs text-gray-600">
                          <Monitor className="h-3 w-3 text-red-500" />
                          <span className="font-medium">{product.specs.graphics}</span>
                        </div>
                      )}
                      <div className="flex items-center space-x-2 text-xs text-gray-600">
                        <Monitor className="h-3 w-3 text-indigo-500" />
                        <span>{product.specs.display}</span>
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
                                i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm font-medium text-gray-700">{product.rating}</span>
                      </div>
                      <span className="text-xs text-gray-500">({product.reviews} reviews)</span>
                    </div>

                    {/* Price */}
                    <div className="flex items-center justify-between py-2">
                      <div className="flex items-center space-x-2">
                        {product.salePrice ? (
                          <>
                            <span className="text-lg font-bold text-gray-900">
                              KSH {product.salePrice.toLocaleString()}
                            </span>
                            <span className="text-sm text-gray-500 line-through">
                              KSH {product.price.toLocaleString()}
                            </span>
                          </>
                        ) : (
                          <span className="text-lg font-bold text-gray-900">KSH {product.price.toLocaleString()}</span>
                        )}
                      </div>
                      {product.salePrice && (
                        <div className="text-right">
                          <div className="text-xs text-green-600 font-medium">You Save</div>
                          <div className="text-sm font-bold text-green-600">
                            KSH {(product.price - product.salePrice).toLocaleString()}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-3">
                      <div className="flex space-x-2">
                        <Button
                          className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg text-sm py-2"
                          onClick={() => handleAddToCart(product)}
                        >
                          <ShoppingCart className="h-3 w-3 mr-2" />
                          Add to Cart
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="px-3 border-green-200 text-green-600 hover:bg-green-50 hover:border-green-300 bg-transparent"
                          onClick={() => handleWhatsAppInquiry(product)}
                        >
                          <MessageCircle className="h-3 w-3" />
                        </Button>
                      </div>

                      {/* WhatsApp Inquiry Button */}
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full border-green-200 text-green-600 hover:bg-green-50 hover:border-green-300 transition-all duration-300 bg-transparent text-xs py-2"
                        onClick={() => handleWhatsAppInquiry(product)}
                      >
                        <MessageCircle className="h-3 w-3 mr-2" />
                        WhatsApp Inquiry
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="md:hidden flex justify-center mt-6 space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={prevSlide}
            disabled={currentIndex === 0}
            className="h-8 w-8 p-0 bg-transparent"
          >
            <ChevronLeft className="h-3 w-3" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={nextSlide}
            disabled={currentIndex + itemsPerPage >= featuredProducts.length}
            className="h-8 w-8 p-0"
          >
            <ChevronRight className="h-3 w-3" />
          </Button>
        </div>
      </div>
    </section>
  )
}
