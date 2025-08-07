import Link from "next/link"

export function BrandShowcase() {
  const brands = [
    { name: "Apple", href: "/laptops/apple", logo: "/placeholder.svg?height=60&width=120" },
    { name: "Dell", href: "/laptops/dell", logo: "/placeholder.svg?height=60&width=120" },
    { name: "HP", href: "/laptops/hp", logo: "/placeholder.svg?height=60&width=120" },
    { name: "Lenovo", href: "/laptops/lenovo", logo: "/placeholder.svg?height=60&width=120" },
    { name: "ASUS", href: "/laptops/asus", logo: "/placeholder.svg?height=60&width=120" },
    { name: "MSI", href: "/laptops/msi", logo: "/placeholder.svg?height=60&width=120" },
  ]

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Trusted Brands</h2>
          <p className="text-lg text-gray-600">We partner with the world's leading laptop manufacturers</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
          {brands.map((brand, index) => (
            <Link
              key={index}
              href={brand.href}
              className="flex items-center justify-center p-4 grayscale hover:grayscale-0 transition-all duration-300 hover:scale-110"
            >
              <img src={brand.logo || "/placeholder.svg"} alt={`${brand.name} logo`} className="max-h-12 w-auto" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
