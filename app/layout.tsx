import type React from "react"
import type { Metadata } from "next"
import { Poppins } from "next/font/google"
import "./globals.css"
import { ContactBanner } from "@/components/contact-banner"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CartProvider } from "@/components/cart-provider"
import { WhatsAppFloat } from "@/components/whatsapp-float"
import { Toaster } from "@/components/ui/toaster"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
})

export const metadata: Metadata = {
  title: "Apex Electronics - Premium Laptops, Phones, TVs & More",
  description:
    "Your one-stop shop for premium electronics. Laptops, smartphones, TVs, desktops, printers and accessories. Free shipping, warranty, and expert support.",
  keywords: "electronics, laptops, phones, TVs, desktops, printers, accessories, Kenya, Nairobi",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} font-sans antialiased`}>
        <CartProvider>
          <ContactBanner />
          <Header />
          {children}
          <Footer />
          <WhatsAppFloat />
          <Toaster />
        </CartProvider>
      </body>
    </html>
  )
}
