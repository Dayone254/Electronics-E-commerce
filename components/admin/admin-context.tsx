"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import { electronicsInventory, type Product } from "@/lib/electronics-inventory"

interface Sale {
  id: number
  productId: number
  productName: string
  quantity: number
  unitPrice: number
  totalPrice: number
  customerName: string
  customerEmail: string
  customerPhone: string
  saleDate: string
  status: "completed" | "pending" | "cancelled"
  paymentMethod: "mpesa" | "card" | "cash" | "bank_transfer"
}

interface HotDeal {
  id: number
  productId: number
  discountPercentage: number
  startDate: string
  endDate: string
  isActive: boolean
  priority: number
}

interface AdminContextType {
  products: Product[]
  sales: Sale[]
  hotDeals: HotDeal[]
  selectedTab: string
  setSelectedTab: (tab: string) => void
  addProduct: (product: Omit<Product, "id">) => void
  updateProduct: (id: number, product: Partial<Product>) => void
  deleteProduct: (id: number) => void
  addSale: (sale: Omit<Sale, "id">) => void
  updateSale: (id: number, sale: Partial<Sale>) => void
  addHotDeal: (deal: Omit<HotDeal, "id">) => void
  updateHotDeal: (id: number, deal: Partial<HotDeal>) => void
  deleteHotDeal: (id: number) => void
  getProductById: (id: number) => Product | undefined
  getSalesByDateRange: (startDate: string, endDate: string) => Sale[]
  getTotalRevenue: () => number
  getLowStockProducts: () => Product[]
  getTopSellingProducts: () => { product: Product; totalSold: number }[]
}

const AdminContext = createContext<AdminContextType | null>(null)

// Mock data for demonstration
const mockSales: Sale[] = [
  {
    id: 1,
    productId: 1,
    productName: "ASUS ROG Strix G15",
    quantity: 1,
    unitPrice: 119900,
    totalPrice: 119900,
    customerName: "John Doe",
    customerEmail: "john@example.com",
    customerPhone: "+254700123456",
    saleDate: "2024-01-15",
    status: "completed",
    paymentMethod: "mpesa",
  },
  {
    id: 2,
    productId: 101,
    productName: "iPhone 15 Pro Max",
    quantity: 2,
    unitPrice: 149900,
    totalPrice: 299800,
    customerName: "Jane Smith",
    customerEmail: "jane@example.com",
    customerPhone: "+254700654321",
    saleDate: "2024-01-14",
    status: "completed",
    paymentMethod: "card",
  },
  {
    id: 3,
    productId: 201,
    productName: 'Samsung 65" Neo QLED 4K',
    quantity: 1,
    unitPrice: 159900,
    totalPrice: 159900,
    customerName: "Mike Johnson",
    customerEmail: "mike@example.com",
    customerPhone: "+254700987654",
    saleDate: "2024-01-13",
    status: "pending",
    paymentMethod: "bank_transfer",
  },
]

const mockHotDeals: HotDeal[] = [
  {
    id: 1,
    productId: 1,
    discountPercentage: 8,
    startDate: "2024-01-01",
    endDate: "2024-01-31",
    isActive: true,
    priority: 1,
  },
  {
    id: 2,
    productId: 101,
    discountPercentage: 6,
    startDate: "2024-01-10",
    endDate: "2024-01-25",
    isActive: true,
    priority: 2,
  },
]

export function AdminProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(electronicsInventory)
  const [sales, setSales] = useState<Sale[]>(mockSales)
  const [hotDeals, setHotDeals] = useState<HotDeal[]>(mockHotDeals)
  const [selectedTab, setSelectedTab] = useState("dashboard")

  const addProduct = (product: Omit<Product, "id">) => {
    const newId = Math.max(...products.map((p) => p.id)) + 1
    setProducts([...products, { ...product, id: newId }])
  }

  const updateProduct = (id: number, updatedProduct: Partial<Product>) => {
    setProducts(products.map((p) => (p.id === id ? { ...p, ...updatedProduct } : p)))
  }

  const deleteProduct = (id: number) => {
    setProducts(products.filter((p) => p.id !== id))
  }

  const addSale = (sale: Omit<Sale, "id">) => {
    const newId = Math.max(...sales.map((s) => s.id)) + 1
    setSales([...sales, { ...sale, id: newId }])
  }

  const updateSale = (id: number, updatedSale: Partial<Sale>) => {
    setSales(sales.map((s) => (s.id === id ? { ...s, ...updatedSale } : s)))
  }

  const addHotDeal = (deal: Omit<HotDeal, "id">) => {
    const newId = Math.max(...hotDeals.map((d) => d.id)) + 1
    setHotDeals([...hotDeals, { ...deal, id: newId }])
  }

  const updateHotDeal = (id: number, updatedDeal: Partial<HotDeal>) => {
    setHotDeals(hotDeals.map((d) => (d.id === id ? { ...d, ...updatedDeal } : d)))
  }

  const deleteHotDeal = (id: number) => {
    setHotDeals(hotDeals.filter((d) => d.id !== id))
  }

  const getProductById = (id: number) => {
    return products.find((p) => p.id === id)
  }

  const getSalesByDateRange = (startDate: string, endDate: string) => {
    return sales.filter((sale) => sale.saleDate >= startDate && sale.saleDate <= endDate)
  }

  const getTotalRevenue = () => {
    return sales.filter((sale) => sale.status === "completed").reduce((total, sale) => total + sale.totalPrice, 0)
  }

  const getLowStockProducts = () => {
    return products.filter((product) => product.stockCount <= 5)
  }

  const getTopSellingProducts = () => {
    const salesByProduct = sales.reduce(
      (acc, sale) => {
        if (sale.status === "completed") {
          acc[sale.productId] = (acc[sale.productId] || 0) + sale.quantity
        }
        return acc
      },
      {} as Record<number, number>,
    )

    return Object.entries(salesByProduct)
      .map(([productId, totalSold]) => ({
        product: getProductById(Number(productId))!,
        totalSold,
      }))
      .filter((item) => item.product)
      .sort((a, b) => b.totalSold - a.totalSold)
      .slice(0, 10)
  }

  return (
    <AdminContext.Provider
      value={{
        products,
        sales,
        hotDeals,
        selectedTab,
        setSelectedTab,
        addProduct,
        updateProduct,
        deleteProduct,
        addSale,
        updateSale,
        addHotDeal,
        updateHotDeal,
        deleteHotDeal,
        getProductById,
        getSalesByDateRange,
        getTotalRevenue,
        getLowStockProducts,
        getTopSellingProducts,
      }}
    >
      {children}
    </AdminContext.Provider>
  )
}

export function useAdmin() {
  const context = useContext(AdminContext)
  if (!context) {
    throw new Error("useAdmin must be used within an AdminProvider")
  }
  return context
}
