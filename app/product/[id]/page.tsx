import { electronicsInventory } from "@/lib/electronics-inventory";
import { notFound } from "next/navigation";
import { ProductGallery } from "@/components/product-gallery";
import { Button } from "@/components/ui/button";

export default function ProductDetailsPage({ params }: { params: { id: string } }) {
  const product = electronicsInventory.find((p) => String(p.id) === params.id);

  if (!product) {
    return (
      <div className="max-w-2xl mx-auto py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
        <p>The product you are looking for does not exist.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-10">
          {/* Product Gallery */}
          <div className="md:w-1/2 w-full">
            <ProductGallery productName={product.name} images={product.images || [product.image || "/placeholder.jpg"]} />
          </div>
          {/* Product Details */}
          <div className="md:w-1/2 w-full flex flex-col justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-3 leading-tight">{product.name}</h1>
              <div className="flex items-center gap-4 mb-4">
                <span className="text-2xl font-semibold text-blue-700">KSH {(product.salePrice || product.price).toLocaleString()}</span>
                {product.salePrice && (
                  <span className="text-lg line-through text-gray-400">KSH {product.price.toLocaleString()}</span>
                )}
                {product.badge && (
                  <span className="ml-2 px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-xs font-semibold">{product.badge}</span>
                )}
              </div>
              <p className="text-gray-700 mb-6 text-lg">{product.description || "No description available."}</p>
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-3">Key Specifications</h2>
                <div className="bg-white rounded-lg shadow-sm p-5 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
                  {product.specs &&
                    Object.entries(product.specs).map(([key, value]) => (
                      <div key={key} className="flex flex-col">
                        <span className="text-xs text-gray-500 capitalize">{key}</span>
                        <span className="font-medium text-gray-900">{value}</span>
                      </div>
                    ))}
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto">Add to Cart</Button>
              <Button size="lg" variant="outline" className="w-full sm:w-auto">Buy Now</Button>
            </div>
            <div className="mt-4 text-sm text-gray-500">Stock: {product.inStock ? <span className="text-green-600 font-semibold">In Stock</span> : <span className="text-red-600 font-semibold">Out of Stock</span>}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
