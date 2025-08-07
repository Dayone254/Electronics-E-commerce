export function TechSpecsShowcase() {
  const techHighlights = [
    {
      title: "Latest Processors",
      description: "Intel 13th Gen & AMD Ryzen 7000 Series",
      image: "/placeholder.svg?height=200&width=300",
      icon: "🚀",
    },
    {
      title: "Advanced Graphics",
      description: "NVIDIA RTX 40 Series & AMD Radeon",
      image: "/placeholder.svg?height=200&width=300",
      icon: "🎮",
    },
    {
      title: "Lightning Fast Storage",
      description: "PCIe 4.0 NVMe SSD up to 2TB",
      image: "/placeholder.svg?height=200&width=300",
      icon: "⚡",
    },
    {
      title: "Stunning Displays",
      description: "4K OLED & High Refresh Rate Screens",
      image: "/placeholder.svg?height=200&width=300",
      icon: "🖥️",
    },
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Cutting-Edge Technology</h2>
          <p className="text-lg text-gray-600">Experience the latest innovations in laptop technology</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {techHighlights.map((tech, index) => (
            <div key={index} className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="aspect-video bg-gray-100 rounded-lg mb-4 overflow-hidden">
                <img src={tech.image || "/placeholder.svg"} alt={tech.title} className="w-full h-full object-cover" />
              </div>
              <div className="text-center">
                <div className="text-2xl mb-2">{tech.icon}</div>
                <h3 className="font-semibold text-gray-900 mb-2">{tech.title}</h3>
                <p className="text-sm text-gray-600">{tech.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
