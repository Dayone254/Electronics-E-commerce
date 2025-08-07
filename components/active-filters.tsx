"use client"

import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface ActiveFiltersProps {
  filters: {
    brands: string[]
    categories: string[]
    subcategories: string[]
    features: string[]
    priceRange: [number, number]
  }
  onRemoveFilter: (type: string, value?: string) => void
  onClearAll: () => void
}

export function ActiveFilters({ filters, onRemoveFilter, onClearAll }: ActiveFiltersProps) {
  // Add null checks and default values
  const safeFilters = {
    brands: filters?.brands || [],
    categories: filters?.categories || [],
    subcategories: filters?.subcategories || [],
    features: filters?.features || [],
    priceRange: filters?.priceRange || ([0, 300000] as [number, number]),
  }

  const hasActiveFilters =
    safeFilters.brands.length > 0 ||
    safeFilters.categories.length > 0 ||
    safeFilters.subcategories.length > 0 ||
    safeFilters.features.length > 0 ||
    safeFilters.priceRange[0] > 0 ||
    safeFilters.priceRange[1] < 300000

  if (!hasActiveFilters) return null

  const categoryIcons: Record<string, string> = {
    laptops: "💻",
    phones: "📱",
    tvs: "📺",
    desktops: "🖥️",
    printers: "🖨️",
    accessories: "⌨️",
  }

  const brandIcons: Record<string, string> = {
    Apple: "🍎",
    Samsung: "📱",
    Dell: "💻",
    HP: "🖥️",
    Lenovo: "⚡",
    ASUS: "🎯",
    MSI: "🔥",
    LG: "📺",
    Canon: "📷",
    Logitech: "🖱️",
    Google: "🔍",
  }

  const featureIcons: Record<string, string> = {
    Gaming: "🎮",
    Business: "💼",
    Student: "🎓",
    "4K Display": "📺",
    "Touch Screen": "👆",
    Wireless: "📶",
    "Fast Charging": "⚡",
    "AI Powered": "🤖",
    "RGB Lighting": "🌈",
    Portable: "🎒",
    Professional: "👔",
    "Budget Friendly": "💰",
    Premium: "👑",
    Flagship: "🚀",
    OLED: "✨",
    Smart: "🧠",
    "All-in-One": "🔄",
    Laser: "🔴",
    Inkjet: "🎨",
    Bluetooth: "📶",
    "USB-C": "🔌",
    Thunderbolt: "⚡",
    "5G": "📡",
    "WiFi 6": "📶",
    "Retina Display": "👁️",
    HDR: "🌟",
    "Dolby Atmos": "🔊",
    "Face ID": "👤",
    Fingerprint: "👆",
    "Water Resistant": "💧",
    "Long Battery": "🔋",
    "Quick Charge": "⚡",
    "Wireless Charging": "🔋",
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-3 mb-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-semibold text-gray-900 flex items-center">
          <span className="mr-1">🔍</span>
          Active Filters
        </h3>
        <Button variant="ghost" size="xs" onClick={onClearAll} className="text-red-600 hover:text-red-700">
          <X className="h-3 w-3 mr-0.5" />
          Clear All
        </Button>
      </div>

      <div className="flex flex-wrap gap-1">
        {/* Price Range */}
        {(safeFilters.priceRange[0] > 0 || safeFilters.priceRange[1] < 300000) && (
          <Badge variant="secondary" className="bg-green-100 text-green-700 px-1 py-0.5 text-sm">
            💰 KSH {safeFilters.priceRange[0].toLocaleString()} - {safeFilters.priceRange[1].toLocaleString()}
            <Button
              variant="ghost"
              size="xs"
              className="h-3 w-3 p-0 ml-0.5 hover:bg-green-200"
              onClick={() => onRemoveFilter("price")}
            >
              <X className="h-2 w-2" />
            </Button>
          </Badge>
        )}

        {/* Categories */}
        {safeFilters.categories.map((category) => (
          <Badge key={category} variant="secondary" className="bg-purple-100 text-purple-700 px-1 py-0.5 text-sm">
            {categoryIcons[category] || "📦"} {category}
            <Button
              variant="ghost"
              size="xs"
              className="h-3 w-3 p-0 ml-0.5 hover:bg-purple-200"
              onClick={() => onRemoveFilter("category", category)}
            >
              <X className="h-2 w-2" />
            </Button>
          </Badge>
        ))}

        {/* Subcategories */}
        {safeFilters.subcategories.map((subcategory) => (
          <Badge key={subcategory} variant="secondary" className="bg-orange-100 text-orange-700 px-1 py-0.5 text-sm">
            🎯 {subcategory}
            <Button
              variant="ghost"
              size="xs"
              className="h-3 w-3 p-0 ml-0.5 hover:bg-orange-200"
              onClick={() => onRemoveFilter("subcategory", subcategory)}
            >
              <X className="h-2 w-2" />
            </Button>
          </Badge>
        ))}

        {/* Brands */}
        {safeFilters.brands.map((brand) => (
          <Badge key={brand} variant="secondary" className="bg-blue-100 text-blue-700 px-1 py-0.5 text-sm">
            {brandIcons[brand] || "🏢"} {brand}
            <Button
              variant="ghost"
              size="xs"
              className="h-3 w-3 p-0 ml-0.5 hover:bg-blue-200"
              onClick={() => onRemoveFilter("brand", brand)}
            >
              <X className="h-2 w-2" />
            </Button>
          </Badge>
        ))}

        {/* Features */}
        {safeFilters.features.map((feature) => (
          <Badge key={feature} variant="secondary" className="bg-indigo-100 text-indigo-700 px-1 py-0.5 text-sm">
            {featureIcons[feature] || "⭐"} {feature}
            <Button
              variant="ghost"
              size="xs"
              className="h-3 w-3 p-0 ml-0.5 hover:bg-indigo-200"
              onClick={() => onRemoveFilter("feature", feature)}
            >
              <X className="h-2 w-2" />
            </Button>
          </Badge>
        ))}
      </div>
    </div>
  )
}
