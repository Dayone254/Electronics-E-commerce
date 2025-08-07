// Comprehensive laptop inventory with KSH pricing and multiple images
export interface Laptop {
  id: number
  name: string
  brand: string
  category: string
  specs: {
    processor: string
    ram: string
    storage: string
    graphics?: string
    display: string
    os: string
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

export const laptopInventory: Laptop[] = [
  // Gaming Laptops
  {
    id: 1,
    name: "ASUS ROG Strix G15",
    brand: "ASUS",
    category: "gaming",
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
      "/placeholder.svg?height=400&width=600&text=ASUS+ROG+Ports",
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
    name: "MSI Katana 15",
    brand: "MSI",
    category: "gaming",
    specs: {
      processor: "Intel Core i7-12650H",
      ram: "16GB DDR4",
      storage: "1TB NVMe SSD",
      graphics: "NVIDIA RTX 4050 6GB",
      display: '15.6" FHD 144Hz',
      os: "Windows 11 Home",
    },
    price: 109900,
    salePrice: 99900,
    rating: 4.4,
    reviews: 89,
    image: "/placeholder.svg?height=300&width=400&text=MSI+Katana+15",
    images: [
      "/placeholder.svg?height=300&width=400&text=MSI+Katana+15",
      "/placeholder.svg?height=400&width=600&text=MSI+Katana+Side",
      "/placeholder.svg?height=400&width=600&text=MSI+Katana+Open",
      "/placeholder.svg?height=400&width=600&text=MSI+Katana+Keyboard",
    ],
    badge: "Best Value",
    inStock: true,
    stockCount: 8,
    description: "Affordable gaming performance with Intel's latest processor and dedicated NVIDIA graphics.",
    features: ["Gaming Keyboard", "Cooler Boost 5", "Nahimic Audio", "Gaming Mode"],
  },
  {
    id: 3,
    name: "Alienware m15 R7",
    brand: "Dell",
    category: "gaming",
    specs: {
      processor: "Intel Core i9-12900H",
      ram: "32GB DDR5",
      storage: "1TB NVMe SSD",
      graphics: "NVIDIA RTX 4070 8GB",
      display: '15.6" QHD 240Hz',
      os: "Windows 11 Pro",
    },
    price: 329900,
    rating: 4.8,
    reviews: 67,
    image: "/placeholder.svg?height=300&width=400&text=Alienware+m15",
    images: [
      "/placeholder.svg?height=300&width=400&text=Alienware+m15",
      "/placeholder.svg?height=400&width=600&text=Alienware+RGB+Lights",
      "/placeholder.svg?height=400&width=600&text=Alienware+Side+Profile",
      "/placeholder.svg?height=400&width=600&text=Alienware+Keyboard",
    ],
    badge: "Premium",
    inStock: true,
    stockCount: 5,
    description: "Ultimate gaming machine with premium build quality and top-tier performance components.",
    features: ["AlienFX RGB Lighting", "Cryo-tech Cooling", "240Hz Display", "Premium Audio"],
  },

  // Business Laptops
  {
    id: 4,
    name: "Dell XPS 15",
    brand: "Dell",
    category: "business",
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
      "/placeholder.svg?height=400&width=600&text=Dell+XPS+15+Ports",
      "/placeholder.svg?height=400&width=600&text=Dell+XPS+15+Display",
    ],
    badge: "Best Seller",
    inStock: true,
    stockCount: 12,
    description: "Premium ultrabook with stunning 4K OLED display and professional-grade performance.",
    features: ["4K OLED Touch Display", "Premium Build", "Long Battery Life", "Thunderbolt 4"],
  },
  {
    id: 5,
    name: "Lenovo ThinkPad X1 Carbon",
    brand: "Lenovo",
    category: "business",
    specs: {
      processor: "Intel Core i7-1365U",
      ram: "32GB LPDDR5",
      storage: "1TB NVMe SSD",
      display: '14" WUXGA IPS',
      os: "Windows 11 Pro",
    },
    price: 219900,
    rating: 4.8,
    reviews: 92,
    image: "/lenovo-thinkpad-x1-carbon.png",
    images: [
      "/lenovo-thinkpad-x1-carbon.png",
      "/placeholder.svg?height=400&width=600&text=ThinkPad+X1+Open",
      "/placeholder.svg?height=400&width=600&text=ThinkPad+X1+Keyboard",
      "/placeholder.svg?height=400&width=600&text=ThinkPad+X1+Side",
      "/placeholder.svg?height=400&width=600&text=ThinkPad+X1+Ports",
    ],
    badge: "Business",
    inStock: true,
    stockCount: 18,
    description: "Legendary ThinkPad reliability with modern performance and security features.",
    features: ["Military-Grade Durability", "TrackPoint", "Rapid Charge", "Enhanced Security"],
  },
  {
    id: 6,
    name: "HP EliteBook 840 G9",
    brand: "HP",
    category: "business",
    specs: {
      processor: "Intel Core i5-1235U",
      ram: "16GB DDR4",
      storage: "512GB NVMe SSD",
      display: '14" FHD IPS',
      os: "Windows 11 Pro",
    },
    price: 149900,
    rating: 4.5,
    reviews: 78,
    image: "/placeholder.svg?height=300&width=400&text=HP+EliteBook+840",
    images: [
      "/placeholder.svg?height=300&width=400&text=HP+EliteBook+840",
      "/placeholder.svg?height=400&width=600&text=HP+EliteBook+Open",
      "/placeholder.svg?height=400&width=600&text=HP+EliteBook+Side",
      "/placeholder.svg?height=400&width=600&text=HP+EliteBook+Keyboard",
    ],
    inStock: true,
    stockCount: 10,
    description: "Professional laptop designed for business productivity and collaboration.",
    features: ["Business Security", "Collaboration Tools", "Long Battery", "Durable Design"],
  },

  // Student Laptops
  {
    id: 7,
    name: "Acer Aspire 5",
    brand: "Acer",
    category: "student",
    specs: {
      processor: "AMD Ryzen 5 5500U",
      ram: "8GB DDR4",
      storage: "256GB NVMe SSD",
      display: '15.6" FHD IPS',
      os: "Windows 11 Home",
    },
    price: 59900,
    salePrice: 54900,
    rating: 4.2,
    reviews: 203,
    image: "/placeholder.svg?height=300&width=400&text=Acer+Aspire+5",
    images: [
      "/placeholder.svg?height=300&width=400&text=Acer+Aspire+5",
      "/placeholder.svg?height=400&width=600&text=Acer+Aspire+Open",
      "/placeholder.svg?height=400&width=600&text=Acer+Aspire+Side",
      "/placeholder.svg?height=400&width=600&text=Acer+Aspire+Keyboard",
    ],
    badge: "Budget Friendly",
    inStock: true,
    stockCount: 25,
    description: "Affordable laptop perfect for students with reliable performance for everyday tasks.",
    features: ["All-Day Battery", "Fast WiFi 6", "Backlit Keyboard", "Multiple Ports"],
  },
  {
    id: 8,
    name: "ASUS VivoBook 15",
    brand: "ASUS",
    category: "student",
    specs: {
      processor: "Intel Core i3-1215U",
      ram: "8GB DDR4",
      storage: "512GB NVMe SSD",
      display: '15.6" FHD',
      os: "Windows 11 Home",
    },
    price: 64900,
    rating: 4.3,
    reviews: 145,
    image: "/placeholder.svg?height=300&width=400&text=ASUS+VivoBook+15",
    images: [
      "/placeholder.svg?height=300&width=400&text=ASUS+VivoBook+15",
      "/placeholder.svg?height=400&width=600&text=VivoBook+Open",
      "/placeholder.svg?height=400&width=600&text=VivoBook+Side",
      "/placeholder.svg?height=400&width=600&text=VivoBook+Colors",
    ],
    inStock: true,
    stockCount: 20,
    description: "Stylish and affordable laptop with modern features for students and everyday users.",
    features: ["Fingerprint Login", "Fast Charging", "Ergonomic Design", "ASUS SonicMaster"],
  },

  // Apple MacBooks
  {
    id: 9,
    name: 'MacBook Pro 16"',
    brand: "Apple",
    category: "business",
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
    images: [
      "/macbook-pro-space-gray.png",
      "/placeholder.svg?height=400&width=600&text=MacBook+Pro+Open",
      "/placeholder.svg?height=400&width=600&text=MacBook+Pro+Side",
      "/placeholder.svg?height=400&width=600&text=MacBook+Pro+Ports",
      "/placeholder.svg?height=400&width=600&text=MacBook+Pro+Display",
    ],
    badge: "Editor's Choice",
    inStock: true,
    stockCount: 8,
    description: "Professional-grade MacBook with M3 Pro chip for demanding creative and professional workflows.",
    features: ["M3 Pro Chip", "Liquid Retina XDR", "All-Day Battery", "Studio-Quality Mics"],
  },
  {
    id: 10,
    name: 'MacBook Air 15"',
    brand: "Apple",
    category: "student",
    specs: {
      processor: "Apple M2",
      ram: "8GB Unified Memory",
      storage: "256GB SSD",
      display: '15.3" Liquid Retina',
      os: "macOS Sonoma",
    },
    price: 179900,
    rating: 4.7,
    reviews: 156,
    image: "/placeholder.svg?height=300&width=400&text=MacBook+Air+15",
    images: [
      "/placeholder.svg?height=300&width=400&text=MacBook+Air+15",
      "/placeholder.svg?height=400&width=600&text=MacBook+Air+Open",
      "/placeholder.svg?height=400&width=600&text=MacBook+Air+Side",
      "/placeholder.svg?height=400&width=600&text=MacBook+Air+Colors",
    ],
    inStock: true,
    stockCount: 12,
    description: "Larger MacBook Air with M2 chip, perfect for students and professionals who need more screen space.",
    features: ["M2 Chip", "15.3-inch Display", "All-Day Battery", "Silent Operation"],
  },

  // 2-in-1 Convertibles
  {
    id: 11,
    name: "HP Spectre x360",
    brand: "HP",
    category: "convertible",
    specs: {
      processor: "Intel Core i5-1235U",
      ram: "16GB LPDDR4x",
      storage: "512GB NVMe SSD",
      display: '13.5" 3K2K OLED Touch',
      os: "Windows 11 Home",
    },
    price: 139900,
    rating: 4.7,
    reviews: 78,
    image: "/hp-spectre-x360-gold.png",
    images: [
      "/hp-spectre-x360-gold.png",
      "/placeholder.svg?height=400&width=600&text=Spectre+x360+Tent+Mode",
      "/placeholder.svg?height=400&width=600&text=Spectre+x360+Tablet+Mode",
      "/placeholder.svg?height=400&width=600&text=Spectre+x360+Stand+Mode",
      "/placeholder.svg?height=400&width=600&text=Spectre+x360+Pen",
    ],
    badge: "2-in-1",
    inStock: true,
    stockCount: 7,
    description: "Premium 2-in-1 convertible with stunning OLED display and versatile design.",
    features: ["360° Hinge", "OLED Touch Display", "HP Pen Included", "Premium Audio"],
  },
  {
    id: 12,
    name: "Lenovo Yoga 7i",
    brand: "Lenovo",
    category: "convertible",
    specs: {
      processor: "Intel Core i7-1255U",
      ram: "16GB DDR4",
      storage: "512GB NVMe SSD",
      display: '14" 2.2K IPS Touch',
      os: "Windows 11 Home",
    },
    price: 119900,
    salePrice: 109900,
    rating: 4.6,
    reviews: 94,
    image: "/placeholder.svg?height=300&width=400&text=Lenovo+Yoga+7i",
    images: [
      "/placeholder.svg?height=300&width=400&text=Lenovo+Yoga+7i",
      "/placeholder.svg?height=400&width=600&text=Yoga+7i+Tent+Mode",
      "/placeholder.svg?height=400&width=600&text=Yoga+7i+Tablet+Mode",
      "/placeholder.svg?height=400&width=600&text=Yoga+7i+Stand+Mode",
    ],
    inStock: true,
    stockCount: 9,
    description: "Versatile 2-in-1 laptop with premium build quality and excellent performance.",
    features: ["360° Convertible", "2.2K Touch Display", "Dolby Atmos", "Rapid Charge"],
  },

  // Creator/Workstation Laptops
  {
    id: 13,
    name: "MSI Creator Z16",
    brand: "MSI",
    category: "creator",
    specs: {
      processor: "Intel Core i9-12900H",
      ram: "32GB DDR5",
      storage: "1TB NVMe SSD",
      graphics: "NVIDIA RTX 4070 8GB",
      display: '16" QHD+ Touch',
      os: "Windows 11 Pro",
    },
    price: 279900,
    salePrice: 259900,
    rating: 4.5,
    reviews: 43,
    image: "/placeholder.svg?height=300&width=400&text=MSI+Creator+Z16",
    images: [
      "/placeholder.svg?height=300&width=400&text=MSI+Creator+Z16",
      "/placeholder.svg?height=400&width=600&text=Creator+Z16+Display",
      "/placeholder.svg?height=400&width=600&text=Creator+Z16+Side",
      "/placeholder.svg?height=400&width=600&text=Creator+Z16+Ports",
    ],
    badge: "Creator",
    inStock: true,
    stockCount: 4,
    description: "Professional creator laptop with powerful specs for content creation and design work.",
    features: ["Creator Center", "True Color Display", "Thunderbolt 4", "MSI Pen 2"],
  },
  {
    id: 14,
    name: "Dell Precision 5570",
    brand: "Dell",
    category: "creator",
    specs: {
      processor: "Intel Core i7-12700H",
      ram: "32GB DDR5",
      storage: "1TB NVMe SSD",
      graphics: "NVIDIA RTX A2000 8GB",
      display: '15.6" 4K OLED',
      os: "Windows 11 Pro",
    },
    price: 299900,
    rating: 4.7,
    reviews: 31,
    image: "/placeholder.svg?height=300&width=400&text=Dell+Precision+5570",
    images: [
      "/placeholder.svg?height=300&width=400&text=Dell+Precision+5570",
      "/placeholder.svg?height=400&width=600&text=Precision+5570+Display",
      "/placeholder.svg?height=400&width=600&text=Precision+5570+Side",
      "/placeholder.svg?height=400&width=600&text=Precision+5570+Ports",
    ],
    badge: "Workstation",
    inStock: true,
    stockCount: 3,
    description: "Professional workstation laptop with ISV certification for demanding applications.",
    features: ["ISV Certified", "4K OLED Display", "Professional Graphics", "Dell Optimizer"],
  },
]

// Helper functions
export function getLaptopsByCategory(category: string): Laptop[] {
  return laptopInventory.filter((laptop) => laptop.category === category)
}

export function getLaptopsByBrand(brand: string): Laptop[] {
  return laptopInventory.filter((laptop) => laptop.brand.toLowerCase() === brand.toLowerCase())
}

export function getLaptopById(id: number): Laptop | undefined {
  return laptopInventory.find((laptop) => laptop.id === id)
}

export function searchLaptops(query: string): Laptop[] {
  const searchTerm = query.toLowerCase()
  return laptopInventory.filter(
    (laptop) =>
      laptop.name.toLowerCase().includes(searchTerm) ||
      laptop.brand.toLowerCase().includes(searchTerm) ||
      laptop.specs.processor.toLowerCase().includes(searchTerm) ||
      laptop.description.toLowerCase().includes(searchTerm),
  )
}

export function getAvailableBrands(): string[] {
  return [...new Set(laptopInventory.map((laptop) => laptop.brand))].sort()
}

export function getAvailableCategories(): string[] {
  return [...new Set(laptopInventory.map((laptop) => laptop.category))].sort()
}
