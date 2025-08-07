import { Phone, Mail, MapPin, Clock } from "lucide-react"

export function ContactBanner() {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-1">
              <Phone className="h-3 w-3" />
              <span>+254 700 000 000</span>
            </div>
            <div className="hidden sm:flex items-center space-x-1">
              <Mail className="h-3 w-3" />
              <span>info@apexlaptops.co.ke</span>
            </div>
            <div className="hidden md:flex items-center space-x-1">
              <MapPin className="h-3 w-3" />
              <span>Nairobi, Kenya</span>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="h-3 w-3" />
            <span>Mon-Sat: 8AM-8PM</span>
          </div>
        </div>
      </div>
    </div>
  )
}
