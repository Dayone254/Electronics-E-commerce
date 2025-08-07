import { Suspense } from "react"
import { TrustBar } from "@/components/trust-bar"
import { ShopByCategory } from "@/components/shop-by-category"
import { UniversalDealsSlider } from "@/components/universal-deals-slider"
import { HomepageProductsSection } from "@/components/homepage-products-section"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <TrustBar />
      <ShopByCategory />
      <Suspense fallback={<div className="h-32 animate-pulse bg-gray-100" />}>
        <UniversalDealsSlider />
      </Suspense>
      <Suspense fallback={<div className="h-96 animate-pulse bg-gray-100" />}>
        <HomepageProductsSection />
      </Suspense>
    </main>
  )
}
