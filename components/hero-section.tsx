import Link from "next/link"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900 text-white">
      <div className="absolute inset-0 bg-black/20" />
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
        style={{
          backgroundImage: `url('/modern-laptop-workspace.png')`,
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-24">
        <div className="max-w-2xl">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight mb-5">
            Find Your Next <span className="text-blue-400">Powerhouse</span>
          </h1>
          <p className="text-base sm:text-lg text-gray-300 mb-6 leading-relaxed font-light">
            Curated selections for professionals, gamers, and students. Discover the perfect laptop that matches your
            ambitions.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/laptops">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 text-sm font-medium">
                Shop All Laptops
              </Button>
            </Link>
            <Link href="/deals">
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-gray-900 px-6 py-2.5 text-sm font-medium bg-transparent"
              >
                View Deals
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
