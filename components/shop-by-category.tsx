"use client";

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import { electronicsInventory } from "@/lib/electronics-inventory"

const categoryDisplayNames: Record<string, string> = {
  laptops: "Laptops",
  phones: "Phones",
  tvs: "TVs",
  desktops: "Desktops",
  printers: "Printers",
  accessories: "Accessories",
}

export function ShopByCategory() {
  // Get unique categories and a representative product for each
  const categories = Array.from(
    electronicsInventory.reduce((acc, product) => {
      if (!acc.has(product.category)) {
        acc.set(product.category, product)
      }
      return acc
    }, new Map())
  ).map(([category, product]) => ({
    name: categoryDisplayNames[category] || category,
    href: `/${category}`,
    image: product.image || "/placeholder.svg",
    description: product.description || "Explore our selection.",
  }))

  // Carousel logic
  const itemsPerPage = 4
  const [currentIndex, setCurrentIndex] = useState(0)
  const maxIndex = Math.max(0, categories.length - itemsPerPage)
  const visibleCategories = categories.slice(currentIndex, currentIndex + itemsPerPage)

  const nextSlide = () => setCurrentIndex((prev) => (prev + itemsPerPage > maxIndex ? 0 : prev + itemsPerPage))
  const prevSlide = () => setCurrentIndex((prev) => (prev === 0 ? maxIndex : prev - itemsPerPage))

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-3">Shop by Category</h2>
          <p className="text-sm text-gray-600 max-w-xl mx-auto">
            Find the perfect product tailored to your specific needs and use case
          </p>
        </div>
        <div className="flex items-center justify-between mb-6">
          <button
            className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
            onClick={prevSlide}
            aria-label="Previous categories"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
            onClick={nextSlide}
            aria-label="Next categories"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {visibleCategories.map((category, index) => (
            <Link key={index} href={category.href}>
              <Card className="group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <CardContent className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg aspect-[4/3]">
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      placeholder="blur"
                      blurDataURL="/placeholder.svg"
                      priority={index === 0}
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
                  </div>
                  <div className="p-4">
                    <h3 className="text-base font-medium text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-xs text-gray-600 line-clamp-2">{category.description}</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
