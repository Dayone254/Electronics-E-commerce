// Comprehensive electronics inventory with all product categories
export interface Product {
  id: number
  name: string
  brand: string
  category: string
  subcategory: string
  specs: {
    [key: string]: string
  }
  price: number
  salePrice?: number
  rating: number
  reviews: number
  image: string
  images: string[]
  badge?: string
  inStock: boolean
  stockCount: number
  description: string
  features: string[]
}

export const electronicsInventory: Product[] = [
  // Laptops (existing)
  {
    id: 1,
    name: "ASUS ROG Strix G15",
    brand: "ASUS",
    category: "laptops",
    subcategory: "gaming",
    specs: {
      processor: "AMD Ryzen 7 6800H",
      ram: "16GB DDR5",
      storage: "512GB NVMe SSD",
      graphics: "NVIDIA RTX 4060 8GB",
      display: '15.6" FHD 144Hz',
      os: "Windows 11 Home",
    },
    price: 129900,
    salePrice: 119900,
    rating: 4.6,
    reviews: 156,
    image: "/placeholder-7apiw.png",
    images: [
      "/placeholder-7apiw.png",
      "/rgb-gaming-laptop.png",
      "/placeholder.svg?height=400&width=600&text=ASUS+ROG+Side+View",
      "/placeholder.svg?height=400&width=600&text=ASUS+ROG+Keyboard",
    ],
    badge: "Gaming",
    inStock: true,
    stockCount: 15,
    description:
      "Dominate the competition with this powerful gaming laptop featuring the latest AMD Ryzen processor and NVIDIA RTX graphics.",
    features: ["RGB Backlit Keyboard", "Advanced Cooling", "High Refresh Display", "Dolby Atmos Audio"],
  },
  {
    id: 2,
    name: "Dell XPS 15",
    brand: "Dell",
    category: "laptops",
    subcategory: "business",
    specs: {
      processor: "Intel Core i7-13700H",
      ram: "16GB DDR5",
      storage: "512GB NVMe SSD",
      graphics: "Intel Iris Xe",
      display: '15.6" 4K OLED Touch',
      os: "Windows 11 Pro",
    },
    price: 189900,
    salePrice: 169900,
    rating: 4.8,
    reviews: 124,
    image: "/dell-xps-15-silver.png",
    images: [
      "/dell-xps-15-silver.png",
      "/placeholder.svg?height=400&width=600&text=Dell+XPS+15+Open",
      "/placeholder.svg?height=400&width=600&text=Dell+XPS+15+Side",
    ],
    badge: "Best Seller",
    inStock: true,
    stockCount: 12,
    description: "Premium ultrabook with stunning 4K OLED display and professional-grade performance.",
    features: ["4K OLED Touch Display", "Premium Build", "Long Battery Life", "Thunderbolt 4"],
  },
  {
    id: 3,
    name: 'MacBook Pro 16"',
    brand: "Apple",
    category: "laptops",
    subcategory: "business",
    specs: {
      processor: "Apple M3 Pro",
      ram: "18GB Unified Memory",
      storage: "512GB SSD",
      display: '16.2" Liquid Retina XDR',
      os: "macOS Sonoma",
    },
    price: 249900,
    rating: 4.9,
    reviews: 89,
    image: "/macbook-pro-space-gray.png",
    images: ["/macbook-pro-space-gray.png", "/placeholder.svg?height=400&width=600&text=MacBook+Pro+Open"],
    badge: "Editor's Choice",
    inStock: true,
    stockCount: 8,
    description: "Professional-grade MacBook with M3 Pro chip for demanding creative and professional workflows.",
    features: ["M3 Pro Chip", "Liquid Retina XDR", "All-Day Battery", "Studio-Quality Mics"],
  },

  // Smartphones
  {
    id: 101,
    name: "iPhone 15 Pro Max",
    brand: "Apple",
    category: "phones",
    subcategory: "smartphones",
    specs: {
      display: '6.7" Super Retina XDR',
      processor: "A17 Pro Chip",
      storage: "256GB",
      camera: "48MP Main + 12MP Ultra Wide",
      battery: "Up to 29 hours video",
      connectivity: "5G, WiFi 6E, Bluetooth 5.3",
    },
    price: 159900,
    salePrice: 149900,
    rating: 4.8,
    reviews: 234,
    image: "/placeholder.svg?height=300&width=400&text=iPhone+15+Pro+Max",
    images: [
      "/placeholder.svg?height=300&width=400&text=iPhone+15+Pro+Max",
      "/placeholder.svg?height=400&width=600&text=iPhone+15+Pro+Max+Back",
      "/placeholder.svg?height=400&width=600&text=iPhone+15+Pro+Max+Side",
    ],
    badge: "Flagship",
    inStock: true,
    stockCount: 18,
    description: "The ultimate iPhone with titanium design, advanced camera system, and A17 Pro chip.",
    features: ["Titanium Design", "Action Button", "USB-C", "Pro Camera System"],
  },
  {
    id: 102,
    name: "Samsung Galaxy S24 Ultra",
    brand: "Samsung",
    category: "phones",
    subcategory: "smartphones",
    specs: {
      display: '6.8" Dynamic AMOLED 2X',
      processor: "Snapdragon 8 Gen 3",
      storage: "256GB",
      camera: "200MP Main + 50MP Periscope",
      battery: "5000mAh with 45W charging",
      connectivity: "5G, WiFi 7, Bluetooth 5.3",
    },
    price: 139900,
    salePrice: 129900,
    rating: 4.7,
    reviews: 189,
    image: "/placeholder.svg?height=300&width=400&text=Galaxy+S24+Ultra",
    images: [
      "/placeholder.svg?height=300&width=400&text=Galaxy+S24+Ultra",
      "/placeholder.svg?height=400&width=600&text=Galaxy+S24+Ultra+Back",
    ],
    badge: "AI Powered",
    inStock: true,
    stockCount: 22,
    description: "Premium Android flagship with S Pen, advanced AI features, and exceptional camera system.",
    features: ["S Pen Included", "Galaxy AI", "200MP Camera", "Titanium Frame"],
  },
  {
    id: 103,
    name: "Google Pixel 8 Pro",
    brand: "Google",
    category: "phones",
    subcategory: "smartphones",
    specs: {
      display: '6.7" LTPO OLED',
      processor: "Google Tensor G3",
      storage: "128GB",
      camera: "50MP Main + 48MP Ultra Wide",
      battery: "5050mAh with 30W charging",
      connectivity: "5G, WiFi 6E, Bluetooth 5.3",
    },
    price: 89900,
    salePrice: 79900,
    rating: 4.6,
    reviews: 156,
    image: "/placeholder.svg?height=300&width=400&text=Pixel+8+Pro",
    images: [
      "/placeholder.svg?height=300&width=400&text=Pixel+8+Pro",
      "/placeholder.svg?height=400&width=600&text=Pixel+8+Pro+Camera",
    ],
    badge: "Best Photo",
    inStock: true,
    stockCount: 14,
    description: "Google's flagship with advanced AI photography and pure Android experience.",
    features: ["Magic Eraser", "Best Take", "Pure Android", "7 Years Updates"],
  },

  // TVs
  {
    id: 201,
    name: 'Samsung 65" Neo QLED 4K',
    brand: "Samsung",
    category: "tvs",
    subcategory: "smart",
    specs: {
      size: '65"',
      resolution: "4K Ultra HD (3840x2160)",
      display: "Neo QLED with Quantum HDR",
      processor: "Neo Quantum Processor 4K",
      smart: "Tizen OS with SmartThings",
      connectivity: "4x HDMI 2.1, 2x USB, WiFi 6",
    },
    price: 179900,
    salePrice: 159900,
    rating: 4.7,
    reviews: 89,
    image: "/placeholder.svg?height=300&width=400&text=Samsung+65+Neo+QLED",
    images: [
      "/placeholder.svg?height=300&width=400&text=Samsung+65+Neo+QLED",
      "/placeholder.svg?height=400&width=600&text=Samsung+TV+Side+View",
    ],
    badge: "Premium",
    inStock: true,
    stockCount: 8,
    description: "Premium 4K TV with Quantum Dot technology and advanced gaming features.",
    features: ["Neo QLED Display", "Gaming Hub", "Object Tracking Sound", "Solar Remote"],
  },
  {
    id: 202,
    name: 'LG 55" OLED C3 Smart TV',
    brand: "LG",
    category: "tvs",
    subcategory: "oled",
    specs: {
      size: '55"',
      resolution: "4K Ultra HD (3840x2160)",
      display: "OLED with Perfect Black",
      processor: "α9 Gen6 AI Processor 4K",
      smart: "webOS 23 with ThinQ AI",
      connectivity: "4x HDMI 2.1, 3x USB, WiFi 6",
    },
    price: 149900,
    salePrice: 139900,
    rating: 4.8,
    reviews: 124,
    image: "/placeholder.svg?height=300&width=400&text=LG+55+OLED+C3",
    images: [
      "/placeholder.svg?height=300&width=400&text=LG+55+OLED+C3",
      "/placeholder.svg?height=400&width=600&text=LG+OLED+Display",
    ],
    badge: "OLED",
    inStock: true,
    stockCount: 12,
    description: "Self-lit OLED pixels deliver perfect black and infinite contrast for stunning picture quality.",
    features: ["Perfect Black", "Dolby Vision IQ", "Gaming Optimizer", "Magic Remote"],
  },

  // Desktops
  {
    id: 301,
    name: "HP Pavilion Gaming Desktop",
    brand: "HP",
    category: "desktops",
    subcategory: "gaming",
    specs: {
      processor: "AMD Ryzen 5 5600G",
      ram: "16GB DDR4",
      storage: "512GB NVMe SSD + 1TB HDD",
      graphics: "NVIDIA GTX 1660 Super",
      connectivity: "WiFi 6, Bluetooth 5.2",
      ports: "USB 3.2, HDMI, DisplayPort",
    },
    price: 89900,
    salePrice: 79900,
    rating: 4.5,
    reviews: 67,
    image: "/placeholder.svg?height=300&width=400&text=HP+Gaming+Desktop",
    images: [
      "/placeholder.svg?height=300&width=400&text=HP+Gaming+Desktop",
      "/placeholder.svg?height=400&width=600&text=HP+Desktop+Side",
    ],
    badge: "Gaming",
    inStock: true,
    stockCount: 15,
    description: "Powerful gaming desktop with dedicated graphics and ample storage for gaming and productivity.",
    features: ["RGB Lighting", "Tool-less Upgrade", "Gaming Keyboard", "Cryo Chamber Cooling"],
  },
  {
    id: 302,
    name: 'iMac 24" M3',
    brand: "Apple",
    category: "desktops",
    subcategory: "all-in-one",
    specs: {
      processor: "Apple M3 Chip",
      ram: "8GB Unified Memory",
      storage: "256GB SSD",
      display: '24" 4.5K Retina Display',
      connectivity: "2x Thunderbolt, WiFi 6E",
      camera: "1080p FaceTime HD Camera",
    },
    price: 179900,
    rating: 4.8,
    reviews: 94,
    image: "/placeholder.svg?height=300&width=400&text=iMac+24+M3",
    images: [
      "/placeholder.svg?height=300&width=400&text=iMac+24+M3",
      "/placeholder.svg?height=400&width=600&text=iMac+Side+Profile",
    ],
    badge: "All-in-One",
    inStock: true,
    stockCount: 10,
    description: "Stunning all-in-one desktop with M3 chip and vibrant 4.5K Retina display.",
    features: ["M3 Chip", "4.5K Retina Display", "Magic Keyboard", "Color Options"],
  },

  // Printers
  {
    id: 401,
    name: "HP LaserJet Pro M404n",
    brand: "HP",
    category: "printers",
    subcategory: "laser",
    specs: {
      type: "Monochrome Laser Printer",
      speed: "Up to 38 ppm",
      resolution: "1200 x 1200 dpi",
      connectivity: "USB 2.0, Ethernet",
      capacity: "250-sheet input tray",
      monthly: "Up to 80,000 pages",
    },
    price: 24900,
    salePrice: 22900,
    rating: 4.4,
    reviews: 156,
    image: "/placeholder.svg?height=300&width=400&text=HP+LaserJet+Pro",
    images: [
      "/placeholder.svg?height=300&width=400&text=HP+LaserJet+Pro",
      "/placeholder.svg?height=400&width=600&text=HP+Printer+Side",
    ],
    badge: "Business",
    inStock: true,
    stockCount: 25,
    description: "Reliable monochrome laser printer perfect for small offices and home businesses.",
    features: ["Fast Printing", "Auto Duplex", "Mobile Printing", "Energy Efficient"],
  },
  {
    id: 402,
    name: "Canon PIXMA G7020",
    brand: "Canon",
    category: "printers",
    subcategory: "inkjet",
    specs: {
      type: "All-in-One Inkjet Printer",
      speed: "Up to 13 ppm color",
      resolution: "4800 x 1200 dpi",
      connectivity: "WiFi, USB, Ethernet",
      capacity: "350-sheet paper capacity",
      features: "Print, Scan, Copy, Fax",
    },
    price: 34900,
    rating: 4.6,
    reviews: 89,
    image: "/placeholder.svg?height=300&width=400&text=Canon+PIXMA+G7020",
    images: [
      "/placeholder.svg?height=300&width=400&text=Canon+PIXMA+G7020",
      "/placeholder.svg?height=400&width=600&text=Canon+Printer+Open",
    ],
    badge: "All-in-One",
    inStock: true,
    stockCount: 18,
    description: "Versatile all-in-one printer with high-yield ink tanks for cost-effective printing.",
    features: ["MegaTank System", "Wireless Printing", "Auto Document Feeder", "Borderless Photos"],
  },

  // Accessories
  {
    id: 501,
    name: "Logitech MX Master 3S",
    brand: "Logitech",
    category: "accessories",
    subcategory: "mice",
    specs: {
      type: "Wireless Mouse",
      sensor: "Darkfield High Precision",
      battery: "Up to 70 days",
      connectivity: "Bluetooth, USB-C",
      compatibility: "Windows, Mac, Linux",
      buttons: "7 customizable buttons",
    },
    price: 12900,
    salePrice: 11900,
    rating: 4.7,
    reviews: 234,
    image: "/placeholder.svg?height=300&width=400&text=Logitech+MX+Master+3S",
    images: [
      "/placeholder.svg?height=300&width=400&text=Logitech+MX+Master+3S",
      "/placeholder.svg?height=400&width=600&text=MX+Master+Side+View",
    ],
    badge: "Productivity",
    inStock: true,
    stockCount: 45,
    description: "Premium wireless mouse designed for productivity with advanced features and ergonomic design.",
    features: ["MagSpeed Scrolling", "Multi-Device", "Ergonomic Design", "Quick Charging"],
  },
  {
    id: 502,
    name: "Apple Magic Keyboard",
    brand: "Apple",
    category: "accessories",
    subcategory: "keyboards",
    specs: {
      type: "Wireless Keyboard",
      layout: "Full-size with numeric keypad",
      battery: "Built-in rechargeable battery",
      connectivity: "Bluetooth, Lightning",
      compatibility: "Mac, iPad, iPhone",
      keys: "Scissor mechanism keys",
    },
    price: 15900,
    rating: 4.5,
    reviews: 167,
    image: "/placeholder.svg?height=300&width=400&text=Apple+Magic+Keyboard",
    images: [
      "/placeholder.svg?height=300&width=400&text=Apple+Magic+Keyboard",
      "/placeholder.svg?height=400&width=600&text=Magic+Keyboard+Angle",
    ],
    badge: "Apple",
    inStock: true,
    stockCount: 32,
    description: "Sleek wireless keyboard with comfortable typing experience and long battery life.",
    features: ["Scissor Keys", "Numeric Keypad", "Rechargeable", "Multi-Device"],
  },
]

// Helper functions
export function getProductsByCategory(category: string): Product[] {
  return electronicsInventory.filter((product) => product.category === category)
}

export function getProductsBySubcategory(category: string, subcategory: string): Product[] {
  return electronicsInventory.filter((product) => product.category === category && product.subcategory === subcategory)
}

export function getProductsByBrand(brand: string): Product[] {
  return electronicsInventory.filter((product) => product.brand.toLowerCase() === brand.toLowerCase())
}

export function getProductById(id: number): Product | undefined {
  return electronicsInventory.find((product) => product.id === id)
}

export function searchProducts(query: string): Product[] {
  const searchTerm = query.toLowerCase()
  return electronicsInventory.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm) ||
      product.brand.toLowerCase().includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm) ||
      Object.values(product.specs).some((spec) => spec.toLowerCase().includes(searchTerm)),
  )
}

export function getAvailableBrands(): string[] {
  return [...new Set(electronicsInventory.map((product) => product.brand))].sort()
}

export function getAvailableCategories(): string[] {
  return [...new Set(electronicsInventory.map((product) => product.category))].sort()
}

export function getAvailableSubcategories(category?: string): string[] {
  const products = category ? getProductsByCategory(category) : electronicsInventory
  return [...new Set(products.map((product) => product.subcategory))].sort()
}

export function getProductsOnSale(): Product[] {
  return electronicsInventory.filter((product) => product.salePrice && product.inStock)
}

export function getFeaturedProducts(): Product[] {
  return electronicsInventory.filter((product) => product.badge && product.inStock).slice(0, 8)
}
