import { Truck, Shield, Headphones, CreditCard } from "lucide-react"

export function TrustBar() {
  const benefits = [
    {
      icon: Truck,
      title: "Free Shipping",
      description: "On orders over KSH 50,000",
    },
    {
      icon: Shield,
      title: "1-Year Warranty",
      description: "Comprehensive coverage",
    },
    {
      icon: Headphones,
      title: "Expert Support",
      description: "24/7 technical help",
    },
    {
      icon: CreditCard,
      title: "Secure Payments",
      description: "M-Pesa & Card accepted",
    },
  ]

  return (
    <section className="bg-gray-50 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div className="flex-shrink-0">
                <benefit.icon className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium text-sm text-gray-900">{benefit.title}</h3>
                <p className="text-xs text-gray-600">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
