"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image";

interface LaptopImageCarouselProps {
  images: string[]
  productName: string
  className?: string
}

export function LaptopImageCarousel({ images, productName, className = "" }: LaptopImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  if (images.length <= 1) {
    return (
      <Image
        src={images[0] || "/placeholder.svg"}
        alt={productName}
        fill
        className={`w-full h-full object-cover ${className}`}
        priority
        placeholder="blur"
        blurDataURL="/placeholder.svg"
      />
    )
  }

  return (
    <div className="relative group">
      <Image
        src={images[currentIndex] || "/placeholder.svg"}
        alt={`${productName} - View ${currentIndex + 1}`}
        fill
        className={`w-full h-full object-cover transition-opacity duration-300 ${className}`}
        priority={currentIndex === 0}
        placeholder="blur"
        blurDataURL="/placeholder.svg"
      />

      {/* Navigation Arrows - Show on Hover */}
      <div className="absolute inset-0 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <Button
          variant="ghost"
          size="sm"
          className="ml-2 bg-white/80 hover:bg-white shadow-lg h-8 w-8 p-0 rounded-full"
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            prevImage()
          }}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="mr-2 bg-white/80 hover:bg-white shadow-lg h-8 w-8 p-0 rounded-full"
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            nextImage()
          }}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Image Indicators */}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              setCurrentIndex(index)
            }}
            className={`w-2 h-2 rounded-full transition-colors ${index === currentIndex ? "bg-white" : "bg-white/50"}`}
          />
        ))}
      </div>

      {/* Image Counter */}
      <div className="absolute top-2 right-2 bg-black/50 text-white px-2 py-1 rounded-full text-xs">
        {currentIndex + 1} / {images.length}
      </div>
    </div>
  )
}
