"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, Heart, ShoppingCart, User, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/components/cart-provider"
import { SearchModal } from "@/components/search-modal"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const { items } = useCart()
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

  const navigation = [
    {
      name: "Laptops",
      href: "/laptops",
      submenu: [
        { name: "Gaming Laptops", href: "/laptops/gaming" },
        { name: "Business Laptops", href: "/laptops/business" },
        { name: "Student Laptops", href: "/laptops/student" },
        { name: "2-in-1 Convertibles", href: "/laptops/convertible" },
        { name: "Creator Laptops", href: "/laptops/creator" },
        { name: "All Laptops", href: "/laptops" },
      ],
    },
    {
      name: "Accessories",
      href: "/accessories",
      submenu: [
        { name: "Laptop Bags", href: "/accessories/bags" },
        { name: "Chargers & Adapters", href: "/accessories/chargers" },
        { name: "External Keyboards", href: "/accessories/keyboards" },
        { name: "Wireless Mice", href: "/accessories/mice" },
        { name: "Laptop Stands", href: "/accessories/stands" },
        { name: "USB Hubs", href: "/accessories/hubs" },
        { name: "Screen Protectors", href: "/accessories/protection" },
        { name: "Cooling Pads", href: "/accessories/cooling" },
      ],
    },
    {
      name: "Phones",
      href: "/phones",
      submenu: [
        { name: "Smartphones", href: "/phones/smartphones" },
        { name: "iPhone", href: "/phones/iphone" },
        { name: "Samsung Galaxy", href: "/phones/samsung" },
        { name: "Google Pixel", href: "/phones/pixel" },
        { name: "Phone Cases", href: "/phones/cases" },
        { name: "Screen Protectors", href: "/phones/protection" },
        { name: "Chargers & Cables", href: "/phones/chargers" },
      ],
    },
    {
      name: "TVs",
      href: "/tvs",
      submenu: [
        { name: "Smart TVs", href: "/tvs/smart" },
        { name: "4K Ultra HD", href: "/tvs/4k" },
        { name: "OLED TVs", href: "/tvs/oled" },
        { name: "Gaming TVs", href: "/tvs/gaming" },
        { name: "TV Mounts", href: "/tvs/mounts" },
        { name: "Streaming Devices", href: "/tvs/streaming" },
      ],
    },
    {
      name: "Desktops",
      href: "/desktops",
      submenu: [
        { name: "Gaming PCs", href: "/desktops/gaming" },
        { name: "Business PCs", href: "/desktops/business" },
        { name: "All-in-One PCs", href: "/desktops/all-in-one" },
        { name: "Mini PCs", href: "/desktops/mini" },
        { name: "Monitors", href: "/desktops/monitors" },
        { name: "PC Components", href: "/desktops/components" },
      ],
    },
    {
      name: "Printers",
      href: "/printers",
      submenu: [
        { name: "Inkjet Printers", href: "/printers/inkjet" },
        { name: "Laser Printers", href: "/printers/laser" },
        { name: "All-in-One Printers", href: "/printers/all-in-one" },
        { name: "Photo Printers", href: "/printers/photo" },
        { name: "Printer Ink", href: "/printers/ink" },
        { name: "Paper & Supplies", href: "/printers/supplies" },
      ],
    },
    { name: "Deals", href: "/deals" },
    { name: "Support", href: "/support" },
  ]

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-semibold text-sm">A</span>
            </div>
            <span className="text-lg font-semibold text-gray-900">Apex Electronics</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            {navigation.map((item) => (
              <div key={item.name} className="relative group">
                <Link
                  href={item.href}
                  className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
                >
                  {item.name}
                </Link>
                {item.submenu && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <div className="py-2">
                      {item.submenu.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className="block px-4 py-2 text-xs text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors"
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Right side icons */}
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              className="hidden sm:flex h-8 w-8 p-0"
              onClick={() => setIsSearchOpen(true)}
            >
              <Search className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="hidden sm:flex h-8 w-8 p-0">
              <Heart className="h-4 w-4" />
            </Button>
            <Link href="/cart">
              <Button variant="ghost" size="sm" className="relative h-8 w-8 p-0">
                <ShoppingCart className="h-4 w-4" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center font-medium">
                    {itemCount}
                  </span>
                )}
              </Button>
            </Link>
            <Link href="/profile">
              <Button variant="ghost" size="sm" className="hidden sm:flex h-8 w-8 p-0">
                <User className="h-4 w-4" />
              </Button>
            </Link>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden h-8 w-8 p-0"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 py-3 max-h-96 overflow-y-auto">
            <div className="space-y-3">
              {navigation.map((item) => (
                <div key={item.name}>
                  <Link
                    href={item.href}
                    className="block text-sm font-medium text-gray-700 hover:text-blue-600 py-1"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                  {item.submenu && (
                    <div className="ml-4 mt-2 space-y-1 border-l-2 border-gray-100 pl-3">
                      {item.submenu.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className="block text-xs text-gray-600 hover:text-blue-600 py-1"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Search Modal */}
        <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      </div>
    </header>
  )
}
