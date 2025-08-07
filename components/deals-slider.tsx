"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronLeft, ChevronRight, Star, ShoppingCart, MessageCircle, Timer } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/components/cart-provider"
import { useToast } from "@/hooks/use-toast"

const dealsProducts = [
  {
    id: 1,
    name: "Dell XPS 15",
    specs: "Intel Core i7, 16GB RAM, 512GB SSD",
    price: 189900,
    salePrice: 169900,
    rating: 4.8,
    reviews: 124,
    image: "/dell-xps-15-silver.png",
    discount: 11,
    timeLeft: "2 days left",
  },
  {
    id: 3,
    name: "ASUS ROG Strix G15",
    specs: "AMD Ryzen 7, 16GB RAM, RTX 4060",
    price: 129900,
    salePrice: 119900,
    rating: 4.6,
    reviews: 156,
    image: "/placeholder-7apiw.png",
    discount: 8,
    timeLeft: "5 days left",
  },
  {
    id: 6,
    name: "MSI Creator Z16",
    specs: "Intel Core i9, 32GB RAM, RTX 4070",
    price: 279900,
    salePrice: 259900,
    rating: 4.5,
    reviews: 43,
    image: "/placeholder.svg?height=300&width=400",
    discount: 7,
    timeLeft: "1 day left",
  },
  {
    id: 12,
    name: "Lenovo Yoga 7i",
    specs: "Intel Core i7, 16GB RAM, 512GB SSD",
    price: 119900,
    salePrice: 109900,
    rating: 4.6,
    reviews: 94,
    image: "/placeholder.svg?height=300&width=400",
    discount: 8,
    timeLeft: "3 days left",
  },
  {
    id: 7,
    name: "Acer Aspire 5",
    specs: "AMD Ryzen 5, 8GB RAM, 256GB SSD",
    price: 59900,
    salePrice: 54900,
    rating: 4.2,
    reviews: 203,
    image: "/placeholder.svg?height=300&width=400",
    discount: 8,
    timeLeft: "4 days left",
  },
]

export function DealsSlider() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const { addItem } = useCart()
  const { toast } = useToast()
  const itemsPerPage = 4

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
      price: product.salePrice,
      image: product.image,
      specs: product.specs,
    })
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    })
  }

  const handleWhatsAppInquiry = (product: (typeof dealsProducts)[0]) => {
    const message = `Hi! I'm interested in the ${product.name} deal (KSH ${product.salePrice.toLocaleString()}). Could you provide more details?`
    const whatsappUrl = `https://wa.me/254700000000?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  const visibleProducts = dealsProducts.slice(currentIndex, currentIndex + itemsPerPage)

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
              <p className="text-sm text-gray-600">Limited time offers - Save big today!</p>
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

                  {/* Deal Badge */}
                  <div className="absolute top-2 left-2">
                    <Badge className="bg-red-600 hover:bg-red-700 text-white text-xs">-{product.discount}% OFF</Badge>
                  </div>

                  {/* Time Left */}
                  <div className="absolute top-2 right-2">
                    <Badge variant="outline" className="bg-white/95 backdrop-blur-sm text-xs border-orange-200">
                      <Timer className="h-2 w-2 mr-1" />
                      {product.timeLeft}
                    </Badge>
                  </div>
                </div>

                <div className="p-3 space-y-2">
                  <Link href={`/product/${product.id}`}>
                    <h3 className="font-medium text-sm text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                      {product.name}
                    </h3>
                  </Link>
                  <p className="text-xs text-gray-600 line-clamp-1">{product.specs}</p>

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

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center space-x-1">
                        <span className="text-sm font-bold text-red-600">KSH {product.salePrice.toLocaleString()}</span>
                        <span className="text-xs text-gray-500 line-through">KSH {product.price.toLocaleString()}</span>
                      </div>
                      <div className="text-xs text-green-600 font-medium">
                        Save KSH {(product.price - product.salePrice).toLocaleString()}
                      </div>
                    </div>
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
