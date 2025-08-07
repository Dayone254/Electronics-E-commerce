"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, X, Filter, Zap, Cpu, HardDrive, Palette } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { getAvailableBrands, getAvailableCategories } from "@/lib/laptop-inventory"

export function FilterSidebar() {
  const [priceRange, setPriceRange] = useState([0, 300000])
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedProcessors, setSelectedProcessors] = useState<string[]>([])
  const [selectedRAM, setSelectedRAM] = useState<string[]>([])
  const [selectedStorage, setSelectedStorage] = useState<string[]>([])
  const [expandedSections, setExpandedSections] = useState({
    price: true,
    brand: true,
    category: true,
    processor: false,
    ram: false,
    storage: false,
  })

  const brands = getAvailableBrands()
  const categories = getAvailableCategories()

  const processors = [
    { name: "Intel Core i3", icon: "🔵", color: "bg-blue-100 text-blue-700" },
    { name: "Intel Core i5", icon: "🟢", color: "bg-green-100 text-green-700" },
    { name: "Intel Core i7", icon: "🟡", color: "bg-yellow-100 text-yellow-700" },
    { name: "Intel Core i9", icon: "🔴", color: "bg-red-100 text-red-700" },
    { name: "AMD Ryzen 5", icon: "🟠", color: "bg-orange-100 text-orange-700" },
    { name: "AMD Ryzen 7", icon: "🟣", color: "bg-purple-100 text-purple-700" },
    { name: "AMD Ryzen 9", icon: "⚫", color: "bg-gray-100 text-gray-700" },
    { name: "Apple M2", icon: "🍎", color: "bg-gray-100 text-gray-700" },
    { name: "Apple M3", icon: "🍏", color: "bg-green-100 text-green-700" },
  ]

  const ramOptions = [
    { size: "8GB", description: "Basic multitasking", icon: "💾" },
    { size: "16GB", description: "Smooth performance", icon: "🚀" },
    { size: "32GB", description: "Professional work", icon: "⚡" },
    { size: "64GB+", description: "Extreme performance", icon: "🔥" },
  ]

  const storageOptions = [
    { size: "256GB", description: "Essential storage", speed: "Fast" },
    { size: "512GB", description: "Balanced capacity", speed: "Fast" },
    { size: "1TB", description: "Ample space", speed: "Ultra Fast" },
    { size: "2TB+", description: "Maximum storage", speed: "Ultra Fast" },
  ]

  const categoryConfig = {
    gaming: { icon: "🎮", color: "bg-red-500", description: "High-performance gaming" },
    business: { icon: "💼", color: "bg-blue-500", description: "Professional productivity" },
    student: { icon: "🎓", color: "bg-green-500", description: "Budget-friendly learning" },
    convertible: { icon: "🔄", color: "bg-purple-500", description: "Versatile 2-in-1 design" },
    creator: { icon: "🎨", color: "bg-orange-500", description: "Content creation power" },
  }

  const brandLogos = {
    Apple: "🍎",
    Dell: "💻",
    HP: "🖥️",
    Lenovo: "⚡",
    ASUS: "🎯",
    MSI: "🔥",
    Acer: "🌟",
  }

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const clearAllFilters = () => {
    setPriceRange([0, 300000])
    setSelectedBrands([])
    setSelectedCategories([])
    setSelectedProcessors([])
    setSelectedRAM([])
    setSelectedStorage([])
  }

  const hasActiveFilters =
    selectedBrands.length > 0 ||
    selectedCategories.length > 0 ||
    selectedProcessors.length > 0 ||
    selectedRAM.length > 0 ||
    selectedStorage.length > 0 ||
    priceRange[0] > 0 ||
    priceRange[1] < 300000

  const activeFiltersCount =
    selectedBrands.length +
    selectedCategories.length +
    selectedProcessors.length +
    selectedRAM.length +
    selectedStorage.length +
    (priceRange[0] > 0 || priceRange[1] < 300000 ? 1 : 0)

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
                <p className="text-xs text-gray-600">Find your perfect laptop</p>
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

      {/* Price Range - Premium Design */}
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
                  step={5000}
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
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="text-center p-2 bg-gray-50 rounded">
                  <div className="font-medium">Budget</div>
                  <div className="text-gray-600">Under 80K</div>
                </div>
                <div className="text-center p-2 bg-gray-50 rounded">
                  <div className="font-medium">Premium</div>
                  <div className="text-gray-600">200K+</div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Category Filter - Visual Cards */}
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
                <h4 className="font-semibold text-sm text-gray-900">Use Case</h4>
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
                        <p className="text-xs text-gray-600">{config?.description || "Specialized laptops"}</p>
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

      {/* Brand Filter - Logo Grid */}
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
                      <div className="text-xl mb-1">{brandLogos[brand as keyof typeof brandLogos] || "💻"}</div>
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

      {/* Processor Filter - Performance Levels */}
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <button
            onClick={() => toggleSection("processor")}
            className="flex items-center justify-between w-full p-3 bg-gradient-to-r from-orange-50 to-red-50 hover:from-orange-100 hover:to-red-100 transition-all"
          >
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-orange-600 rounded-lg">
                <Cpu className="h-3 w-3 text-white" />
              </div>
              <div className="text-left">
                <h4 className="font-semibold text-sm text-gray-900">Processor</h4>
                <p className="text-xs text-gray-600">Performance level</p>
              </div>
            </div>
            {expandedSections.processor ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
          </button>
          {expandedSections.processor && (
            <div className="p-3 space-y-2">
              {processors.map((processor) => (
                <div
                  key={processor.name}
                  className={`flex items-center justify-between p-2 rounded-lg transition-all cursor-pointer ${
                    selectedProcessors.includes(processor.name)
                      ? "bg-blue-50 border border-blue-200"
                      : "hover:bg-gray-50"
                  }`}
                  onClick={() => {
                    if (selectedProcessors.includes(processor.name)) {
                      setSelectedProcessors(selectedProcessors.filter((p) => p !== processor.name))
                    } else {
                      setSelectedProcessors([...selectedProcessors, processor.name])
                    }
                  }}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-lg">{processor.icon}</span>
                    <div>
                      <div className="text-xs font-medium text-gray-900">{processor.name}</div>
                    </div>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs ${processor.color}`}>
                    {processor.name.includes("i9") ||
                    processor.name.includes("Ryzen 9") ||
                    processor.name.includes("M3")
                      ? "Ultra"
                      : processor.name.includes("i7") ||
                          processor.name.includes("Ryzen 7") ||
                          processor.name.includes("M2")
                        ? "High"
                        : processor.name.includes("i5") || processor.name.includes("Ryzen 5")
                          ? "Mid"
                          : "Entry"}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* RAM Filter - Performance Cards */}
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <button
            onClick={() => toggleSection("ram")}
            className="flex items-center justify-between w-full p-3 bg-gradient-to-r from-indigo-50 to-blue-50 hover:from-indigo-100 hover:to-blue-100 transition-all"
          >
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-indigo-600 rounded-lg">
                <Zap className="h-3 w-3 text-white" />
              </div>
              <div className="text-left">
                <h4 className="font-semibold text-sm text-gray-900">Memory (RAM)</h4>
                <p className="text-xs text-gray-600">Multitasking power</p>
              </div>
            </div>
            {expandedSections.ram ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
          </button>
          {expandedSections.ram && (
            <div className="p-3 space-y-2">
              {ramOptions.map((ram) => (
                <div
                  key={ram.size}
                  className={`relative p-2 rounded-lg border-2 transition-all cursor-pointer ${
                    selectedRAM.includes(ram.size)
                      ? "border-indigo-500 bg-indigo-50"
                      : "border-gray-200 hover:border-gray-300 bg-white"
                  }`}
                  onClick={() => {
                    if (selectedRAM.includes(ram.size)) {
                      setSelectedRAM(selectedRAM.filter((r) => r !== ram.size))
                    } else {
                      setSelectedRAM([...selectedRAM, ram.size])
                    }
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="text-xl">{ram.icon}</span>
                      <div>
                        <div className="font-medium text-gray-900 text-sm">{ram.size}</div>
                        <div className="text-xs text-gray-600">{ram.description}</div>
                      </div>
                    </div>
                    <Checkbox checked={selectedRAM.includes(ram.size)} className="pointer-events-none h-4 w-4" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Storage Filter - Capacity & Speed */}
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <button
            onClick={() => toggleSection("storage")}
            className="flex items-center justify-between w-full p-3 bg-gradient-to-r from-teal-50 to-green-50 hover:from-teal-100 hover:to-green-100 transition-all"
          >
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-teal-600 rounded-lg">
                <HardDrive className="h-3 w-3 text-white" />
              </div>
              <div className="text-left">
                <h4 className="font-semibold text-sm text-gray-900">Storage (SSD)</h4>
                <p className="text-xs text-gray-600">Capacity & speed</p>
              </div>
            </div>
            {expandedSections.storage ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
          </button>
          {expandedSections.storage && (
            <div className="p-3 space-y-2">
              {storageOptions.map((storage) => (
                <div
                  key={storage.size}
                  className={`relative p-2 rounded-lg border-2 transition-all cursor-pointer ${
                    selectedStorage.includes(storage.size)
                      ? "border-teal-500 bg-teal-50"
                      : "border-gray-200 hover:border-gray-300 bg-white"
                  }`}
                  onClick={() => {
                    if (selectedStorage.includes(storage.size)) {
                      setSelectedStorage(selectedStorage.filter((s) => s !== storage.size))
                    } else {
                      setSelectedStorage([...selectedStorage, storage.size])
                    }
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-gray-900 text-sm">{storage.size}</div>
                      <div className="text-xs text-gray-600">{storage.description}</div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="text-xs">
                        {storage.speed}
                      </Badge>
                      <Checkbox
                        checked={selectedStorage.includes(storage.size)}
                        className="pointer-events-none h-4 w-4"
                      />
                    </div>
                  </div>
                </div>
              ))}
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
                setSelectedCategories(["gaming"])
                setPriceRange([100000, 300000])
              }}
            >
              🎮 Gaming Powerhouse
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start text-white hover:bg-white/20 text-xs"
              onClick={() => {
                setSelectedCategories(["business"])
                setSelectedBrands(["Apple", "Dell", "Lenovo"])
              }}
            >
              💼 Business Pro
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start text-white hover:bg-white/20 text-xs"
              onClick={() => {
                setSelectedCategories(["student"])
                setPriceRange([0, 100000])
              }}
            >
              🎓 Student Budget
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
