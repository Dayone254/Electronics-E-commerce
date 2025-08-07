import Link from "next/link"
import { Button } from "@/components/ui/button"

export function PromotionalBanner() {
  return (
    <section className="relative bg-gradient-to-r from-blue-600 to-purple-700 text-white overflow-hidden">
      <div className="absolute inset-0 bg-black/20" />
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{
          backgroundImage: `url('/placeholder.svg?height=300&width=1200')`,
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Limited Time Offer</h2>
          <p className="text-xl mb-6 text-blue-100">Save up to $500 on select gaming and business laptops</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/deals">
              <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white px-8">
                Shop Deals Now
              </Button>
            </Link>
            <Link href="/laptops">
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-blue-600 px-8 bg-transparent"
              >
                View All Laptops
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
