import Image from "next/image";

export function LifestyleSection() {
  const lifestyleImages = [
    {
      title: "Work From Anywhere",
      description: "Premium laptops for the modern professional",
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      title: "Gaming Excellence",
      description: "Unleash your gaming potential",
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      title: "Creative Power",
      description: "Tools for designers and creators",
      image: "/placeholder.svg?height=400&width=600",
    },
  ]

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Built for Your Lifestyle</h2>
          <p className="text-lg text-gray-600">See how our laptops fit seamlessly into your daily routine</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {lifestyleImages.map((item, index) => (
            <div key={index} className="relative group cursor-pointer">
              <div className="aspect-[4/3] bg-gray-100 rounded-lg overflow-hidden">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  fill
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  priority={index === 0}
                  placeholder="blur"
                  blurDataURL="/placeholder.svg"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
                <div className="absolute inset-0 flex items-end p-6">
                  <div className="text-white">
                    <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                    <p className="text-gray-200">{item.description}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
