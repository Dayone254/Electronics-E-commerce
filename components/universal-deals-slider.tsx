"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronLeft, ChevronRight, Star, ShoppingCart, MessageCircle, Timer } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/components/cart-provider"
import { useToast } from "@/hooks/use-toast"
import { getProductsOnSale } from "@/lib/electronics-inventory"

export function UniversalDealsSlider() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const { addItem } = useCart()
  const { toast } = useToast()
  const itemsPerPage = 4

  const dealsProducts = getProductsOnSale().map((product) => ({
    ...product,
    discount: Math.round(((product.price - (product.salePrice || product.price)) / product.price) * 100),
    timeLeft: ["1 day left", "2 days left", "3 days left", "5 days left"][Math.floor(Math.random() * 4)],
  }))

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + itemsPerPage >= dealsProducts.length ? 0 : prev + itemsPerPage))
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? Math.max(0, dealsProducts.length - itemsPerPage) : prev - itemsPerPage))
  }

  const handleAddToCart = (product: (typeof dealsProducts)[0]) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.salePrice || product.price,
      image: product.image,
      specs: Object.values(product.specs).slice(0, 3).join(", "),
    })
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    })
  }

  const handleWhatsAppInquiry = (product: (typeof dealsProducts)[0]) => {
    const message = `Hi! I'm interested in the ${product.name} deal (KSH ${(product.salePrice || product.price).toLocaleString()}). Could you provide more details?`
    const whatsappUrl = `https://wa.me/254700000000?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  const getCategoryIcon = (category: string) => {
    const icons = {
      laptops: "💻",
      phones: "📱",
      tvs: "📺",
      desktops: "🖥️",
      printers: "🖨️",
      accessories: "⌨️",
    }
    return icons[category as keyof typeof icons] || "📦"
  }

  const visibleProducts = dealsProducts.slice(currentIndex, currentIndex + itemsPerPage)

  if (dealsProducts.length === 0) {
    return null
  }

  return (
    <section className="py-8 bg-gradient-to-br from-red-50 to-orange-50 border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-red-600 rounded-lg">
              <span className="text-white text-lg">🔥</span>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Hot Deals</h2>
              <p className="text-sm text-gray-600">Limited time offers across all categories - Save big today!</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
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
              disabled={currentIndex + itemsPerPage >= dealsProducts.length}
              className="h-8 w-8 p-0"
            >
              <ChevronRight className="h-3 w-3" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {visibleProducts.map((product) => (
            <Card
              key={product.id}
              className="group cursor-pointer transition-all duration-300 hover:shadow-lg bg-white border-red-200"
            >
              <CardContent className="p-0">
                <div className="relative overflow-hidden">
                  <Link href={`/product/${product.id}`}>
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-36 object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </Link>

                  {/* Category Icon */}
                  <div className="absolute top-2 left-2">
                    <div className="bg-white/90 backdrop-blur-sm p-1 rounded-full">
                      <span className="text-lg">{getCategoryIcon(product.category)}</span>
                    </div>
                  </div>

                  {/* Deal Badge */}
                  <div className="absolute top-2 right-2">
                    <Badge className="bg-red-600 hover:bg-red-700 text-white text-xs">-{product.discount}% OFF</Badge>
                  </div>

                  {/* Time Left */}
                  <div className="absolute bottom-2 right-2">
                    <Badge variant="outline" className="bg-white/95 backdrop-blur-sm text-xs border-orange-200">
                      <Timer className="h-2 w-2 mr-1" />
                      {product.timeLeft}
                    </Badge>
                  </div>
                </div>

                <div className="p-3 space-y-2">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-xs font-semibold text-blue-600 uppercase tracking-wide">{product.brand}</span>
                    <Badge variant="outline" className="text-xs capitalize">
                      {product.category}
                    </Badge>
                  </div>

                  <Link href={`/product/${product.id}`}>
                    <h3 className="font-medium text-sm text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 leading-tight">
                      {product.name}
                    </h3>
                  </Link>

                  <div className="flex items-center space-x-1">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-2 w-2 ${
                            i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-gray-600">({product.reviews})</span>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-bold text-red-600">
                        KSH {(product.salePrice || product.price).toLocaleString()}
                      </span>
                      {product.salePrice && (
                        <span className="text-xs text-gray-500 line-through">KSH {product.price.toLocaleString()}</span>
                      )}
                    </div>
                    {product.salePrice && (
                      <div className="text-xs text-green-600 font-medium">
                        Save KSH {(product.price - product.salePrice).toLocaleString()}
                      </div>
                    )}
                  </div>

                  <div className="flex space-x-1">
                    <Button
                      size="sm"
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white text-xs py-1"
                      onClick={() => handleAddToCart(product)}
                    >
                      <ShoppingCart className="h-2 w-2 mr-1" />
                      Add to Cart
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="px-2 border-green-200 text-green-600 hover:bg-green-50 bg-transparent"
                      onClick={() => handleWhatsAppInquiry(product)}
                    >
                      <MessageCircle className="h-2 w-2" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
