"use client"

import { ChevronDown, ChevronUp, X, Filter, Zap, Palette } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { getAvailableBrands, getAvailableCategories, getAvailableSubcategories } from "@/lib/electronics-inventory"
import { useFilters } from "./filter-context"
import { useState } from "react"

export function UniversalFilterSidebar() {
  const {
    priceRange,
    selectedBrands,
    selectedCategories,
    selectedSubcategories,
    selectedFeatures,
    setPriceRange,
    setSelectedBrands,
    setSelectedCategories,
    setSelectedSubcategories,
    setSelectedFeatures,
    clearAllFilters,
    hasActiveFilters,
    activeFiltersCount,
  } = useFilters()

  const [expandedSections, setExpandedSections] = useState({
    price: true,
    category: true,
    brand: true,
    subcategory: false,
    features: false,
  })

  const brands = getAvailableBrands()
  const categories = getAvailableCategories()
  const subcategories = getAvailableSubcategories()

  const categoryConfig = {
    laptops: { icon: "💻", color: "bg-blue-500", description: "Portable computing power" },
    phones: { icon: "📱", color: "bg-green-500", description: "Smart mobile devices" },
    tvs: { icon: "📺", color: "bg-purple-500", description: "Entertainment displays" },
    desktops: { icon: "🖥️", color: "bg-red-500", description: "Desktop computing" },
    printers: { icon: "🖨️", color: "bg-orange-500", description: "Printing solutions" },
    accessories: { icon: "⌨️", color: "bg-gray-500", description: "Tech accessories" },
  }

  const brandLogos = {
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

  const commonFeatures = [
    "Gaming",
    "Business",
    "Student",
    "4K Display",
    "Touch Screen",
    "Wireless",
    "Fast Charging",
    "AI Powered",
    "RGB Lighting",
    "Portable",
    "Professional",
    "Budget Friendly",
    "Premium",
    "Flagship",
    "OLED",
    "Smart",
    "All-in-One",
    "Laser",
    "Inkjet",
    "Bluetooth",
    "USB-C",
    "Thunderbolt",
    "5G",
    "WiFi 6",
    "Retina Display",
    "HDR",
    "Dolby Atmos",
    "Face ID",
    "Fingerprint",
    "Water Resistant",
    "Long Battery",
    "Quick Charge",
    "Wireless Charging",
  ]

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  return (
    <div className="space-y-4">
      {/* Filter Header */}
      <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-blue-600 rounded-lg">
                <Filter className="h-3 w-3 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-sm text-gray-900">Smart Filters</h3>
                <p className="text-xs text-gray-600">Find your perfect product</p>
              </div>
            </div>
            {hasActiveFilters && (
              <div className="flex items-center space-x-2">
                <Badge variant="secondary" className="bg-blue-100 text-blue-700 text-xs">
                  {activeFiltersCount} active
                </Badge>
                <Button variant="ghost" size="sm" onClick={clearAllFilters} className="h-7 w-7 p-0">
                  <X className="h-3 w-3" />
                </Button>
              </div>
            )}
          </div>
        </CardHeader>
      </Card>

      {/* Price Range */}
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <button
            onClick={() => toggleSection("price")}
            className="flex items-center justify-between w-full p-3 bg-gradient-to-r from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100 transition-all"
          >
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-600 rounded-lg">
                <span className="text-white text-sm">💰</span>
              </div>
              <div className="text-left">
                <h4 className="font-semibold text-sm text-gray-900">Price Range</h4>
                <p className="text-xs text-gray-600">
                  KSH {priceRange[0].toLocaleString()} - {priceRange[1].toLocaleString()}
                </p>
              </div>
            </div>
            {expandedSections.price ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
          </button>
          {expandedSections.price && (
            <div className="p-3 space-y-3">
              <div className="relative">
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  max={300000}
                  min={0}
                  step={1000}
                  className="w-full"
                />
                <div className="flex items-center justify-between mt-3">
                  <div className="bg-green-50 px-2 py-1 rounded-full">
                    <span className="text-xs font-medium text-green-700">KSH {priceRange[0].toLocaleString()}</span>
                  </div>
                  <div className="bg-green-50 px-2 py-1 rounded-full">
                    <span className="text-xs font-medium text-green-700">KSH {priceRange[1].toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Category Filter */}
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <button
            onClick={() => toggleSection("category")}
            className="flex items-center justify-between w-full p-3 bg-gradient-to-r from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 transition-all"
          >
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-600 rounded-lg">
                <Palette className="h-3 w-3 text-white" />
              </div>
              <div className="text-left">
                <h4 className="font-semibold text-sm text-gray-900">Product Category</h4>
                <p className="text-xs text-gray-600">{selectedCategories.length || "All"} selected</p>
              </div>
            </div>
            {expandedSections.category ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
          </button>
          {expandedSections.category && (
            <div className="p-3 space-y-2">
              {categories.map((category) => {
                const config = categoryConfig[category as keyof typeof categoryConfig]
                return (
                  <div
                    key={category}
                    className={`relative p-2 rounded-lg border-2 transition-all cursor-pointer ${
                      selectedCategories.includes(category)
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300 bg-white"
                    }`}
                    onClick={() => {
                      if (selectedCategories.includes(category)) {
                        setSelectedCategories(selectedCategories.filter((c) => c !== category))
                      } else {
                        setSelectedCategories([...selectedCategories, category])
                      }
                    }}
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-8 h-8 ${config?.color || "bg-gray-500"} rounded-lg flex items-center justify-center text-white text-lg`}
                      >
                        {config?.icon || "📱"}
                      </div>
                      <div className="flex-1">
                        <h5 className="font-medium capitalize text-gray-900 text-sm">{category}</h5>
                        <p className="text-xs text-gray-600">{config?.description || "Electronic devices"}</p>
                      </div>
                      <Checkbox
                        checked={selectedCategories.includes(category)}
                        className="pointer-events-none h-4 w-4"
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Brand Filter */}
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <button
            onClick={() => toggleSection("brand")}
            className="flex items-center justify-between w-full p-3 bg-gradient-to-r from-blue-50 to-cyan-50 hover:from-blue-100 hover:to-cyan-100 transition-all"
          >
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-600 rounded-lg">
                <span className="text-white text-sm">🏢</span>
              </div>
              <div className="text-left">
                <h4 className="font-semibold text-sm text-gray-900">Brands</h4>
                <p className="text-xs text-gray-600">{selectedBrands.length || "All"} selected</p>
              </div>
            </div>
            {expandedSections.brand ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
          </button>
          {expandedSections.brand && (
            <div className="p-3">
              <div className="grid grid-cols-2 gap-2">
                {brands.map((brand) => (
                  <div
                    key={brand}
                    className={`relative p-2 rounded-lg border-2 transition-all cursor-pointer ${
                      selectedBrands.includes(brand)
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300 bg-white"
                    }`}
                    onClick={() => {
                      if (selectedBrands.includes(brand)) {
                        setSelectedBrands(selectedBrands.filter((b) => b !== brand))
                      } else {
                        setSelectedBrands([...selectedBrands, brand])
                      }
                    }}
                  >
                    <div className="text-center">
                      <div className="text-xl mb-1">{brandLogos[brand as keyof typeof brandLogos] || "🏢"}</div>
                      <div className="text-xs font-medium text-gray-900">{brand}</div>
                      {selectedBrands.includes(brand) && (
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">✓</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Subcategory Filter */}
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <button
            onClick={() => toggleSection("subcategory")}
            className="flex items-center justify-between w-full p-3 bg-gradient-to-r from-orange-50 to-red-50 hover:from-orange-100 hover:to-red-100 transition-all"
          >
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-orange-600 rounded-lg">
                <span className="text-white text-sm">🎯</span>
              </div>
              <div className="text-left">
                <h4 className="font-semibold text-sm text-gray-900">Subcategory</h4>
                <p className="text-xs text-gray-600">Specific product types</p>
              </div>
            </div>
            {expandedSections.subcategory ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
          </button>
          {expandedSections.subcategory && (
            <div className="p-3 space-y-2">
              {subcategories.map((subcategory) => (
                <div
                  key={subcategory}
                  className={`flex items-center justify-between p-2 rounded-lg transition-all cursor-pointer ${
                    selectedSubcategories.includes(subcategory)
                      ? "bg-orange-50 border border-orange-200"
                      : "hover:bg-gray-50"
                  }`}
                  onClick={() => {
                    if (selectedSubcategories.includes(subcategory)) {
                      setSelectedSubcategories(selectedSubcategories.filter((s) => s !== subcategory))
                    } else {
                      setSelectedSubcategories([...selectedSubcategories, subcategory])
                    }
                  }}
                >
                  <div className="text-xs font-medium text-gray-900 capitalize">{subcategory}</div>
                  <Checkbox
                    checked={selectedSubcategories.includes(subcategory)}
                    className="pointer-events-none h-4 w-4"
                  />
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Features Filter */}
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <button
            onClick={() => toggleSection("features")}
            className="flex items-center justify-between w-full p-3 bg-gradient-to-r from-indigo-50 to-blue-50 hover:from-indigo-100 hover:to-blue-100 transition-all"
          >
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-indigo-600 rounded-lg">
                <Zap className="h-3 w-3 text-white" />
              </div>
              <div className="text-left">
                <h4 className="font-semibold text-sm text-gray-900">Features</h4>
                <p className="text-xs text-gray-600">Special capabilities</p>
              </div>
            </div>
            {expandedSections.features ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
          </button>
          {expandedSections.features && (
            <div className="p-3">
              <div className="grid grid-cols-2 gap-2">
                {commonFeatures.map((feature) => (
                  <div
                    key={feature}
                    className={`p-2 rounded-lg border-2 transition-all cursor-pointer text-center ${
                      selectedFeatures.includes(feature)
                        ? "border-indigo-500 bg-indigo-50"
                        : "border-gray-200 hover:border-gray-300 bg-white"
                    }`}
                    onClick={() => {
                      if (selectedFeatures.includes(feature)) {
                        setSelectedFeatures(selectedFeatures.filter((f) => f !== feature))
                      } else {
                        setSelectedFeatures([...selectedFeatures, feature])
                      }
                    }}
                  >
                    <div className="text-xs font-medium text-gray-900">{feature}</div>
                    {selectedFeatures.includes(feature) && (
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-indigo-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">✓</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Filters */}
      <Card className="bg-gradient-to-br from-gray-900 to-blue-900 text-white">
        <CardContent className="p-3">
          <h4 className="font-semibold mb-2 flex items-center text-sm">
            <span className="mr-2">⚡</span>
            Quick Filters
          </h4>
          <div className="space-y-1">
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start text-white hover:bg-white/20 text-xs"
              onClick={() => {
                setSelectedCategories(["phones"])
                setSelectedFeatures(["AI Powered"])
                setPriceRange([80000, 200000])
              }}
            >
              📱 Latest Smartphones
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start text-white hover:bg-white/20 text-xs"
              onClick={() => {
                setSelectedCategories(["laptops"])
                setSelectedSubcategories(["gaming"])
                setPriceRange([100000, 300000])
              }}
            >
              🎮 Gaming Laptops
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start text-white hover:bg-white/20 text-xs"
              onClick={() => {
                setSelectedCategories(["tvs"])
                setSelectedFeatures(["4K Display"])
                setPriceRange([120000, 250000])
              }}
            >
              📺 4K Smart TVs
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start text-white hover:bg-white/20 text-xs"
              onClick={() => {
                setSelectedCategories(["desktops"])
                setSelectedSubcategories(["gaming", "all-in-one"])
                setPriceRange([70000, 200000])
              }}
            >
              🖥️ Desktop Computers
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start text-white hover:bg-white/20 text-xs"
              onClick={() => {
                setSelectedCategories(["printers"])
                setSelectedFeatures(["Business"])
                setPriceRange([20000, 50000])
              }}
            >
              🖨️ Business Printers
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start text-white hover:bg-white/20 text-xs"
              onClick={() => {
                setSelectedCategories(["accessories"])
                setSelectedFeatures(["Wireless", "Professional"])
                setPriceRange([5000, 30000])
              }}
            >
              ⌨️ Pro Accessories
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start text-white hover:bg-white/20 text-xs"
              onClick={() => {
                setPriceRange([0, 50000])
                setSelectedFeatures(["Budget Friendly"])
              }}
            >
              💰 Budget Deals
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start text-white hover:bg-white/20 text-xs"
              onClick={() => {
                setSelectedFeatures(["Premium", "Flagship"])
                setPriceRange([150000, 300000])
              }}
            >
              👑 Premium Products
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start text-white hover:bg-white/20 text-xs"
              onClick={() => {
                setSelectedBrands(["Apple"])
                setSelectedCategories(["laptops", "phones", "desktops"])
              }}
            >
              🍎 Apple Ecosystem
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start text-white hover:bg-white/20 text-xs"
              onClick={() => {
                setSelectedFeatures(["Gaming", "RGB Lighting"])
                setSelectedCategories(["laptops", "desktops", "accessories"])
              }}
            >
              🔥 Gaming Setup
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
