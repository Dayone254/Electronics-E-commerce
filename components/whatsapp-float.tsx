"use client"

import { useState } from "react"
import { MessageCircle, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function WhatsAppFloat() {
  const [isExpanded, setIsExpanded] = useState(false)

  const handleWhatsAppClick = () => {
    const message = "Hi! I'm interested in your laptops. Could you help me find the perfect one?"
    const whatsappUrl = `https://wa.me/254700000000?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Expanded Chat Bubble */}
      {isExpanded && (
        <div className="mb-4 bg-white rounded-lg shadow-xl border p-4 max-w-xs animate-in slide-in-from-bottom-2">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <MessageCircle className="h-4 w-4 text-white" />
              </div>
              <div>
                <div className="font-semibold text-sm">Apex Laptops</div>
                <div className="text-xs text-green-600">Online now</div>
              </div>
            </div>
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={() => setIsExpanded(false)}>
              <X className="h-3 w-3" />
            </Button>
          </div>
          <p className="text-sm text-gray-600 mb-3">
            Hi! 👋 Need help finding the perfect laptop? Chat with us on WhatsApp!
          </p>
          <Button size="sm" className="w-full bg-green-500 hover:bg-green-600 text-white" onClick={handleWhatsAppClick}>
            Start Chat
          </Button>
        </div>
      )}

      {/* WhatsApp Button */}
      <Button
        className="w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <MessageCircle className="h-6 w-6" />
      </Button>

      {/* Pulse Animation */}
      <div className="absolute inset-0 w-14 h-14 rounded-full bg-green-500 animate-ping opacity-20"></div>
    </div>
  )
}
