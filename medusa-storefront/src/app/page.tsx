import Link from 'next/link'
import { medusaClient } from '@/lib/medusa'
import { ShoppingCart, ArrowRight } from 'lucide-react'

async function getProducts() {
  try {
    const { products } = await medusaClient.products.list({
      limit: 8,
      fields: "id,title,handle,description,subtitle,thumbnail,*variants,*variants.prices,*images"
    })
    console.log('Fetched products:', products.length)
    return products
  } catch (error) {
    console.error('Failed to fetch products:', error)
    return []
  }
}

export default async function HomePage() {
  const products = await getProducts()

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Welcome to Our Store
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Discover amazing products with our modern e-commerce experience.
            Quality, style, and convenience all in one place.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/products"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors inline-flex items-center justify-center space-x-2"
            >
              <ShoppingCart className="w-5 h-5" />
              <span>Shop Now</span>
            </Link>
            <Link
              href="/about"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors inline-flex items-center justify-center space-x-2"
            >
              <span>Learn More</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Products
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover our handpicked selection of premium products,
              carefully chosen for quality and style.
            </p>
          </div>

          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product) => {
                const price = product.variants?.[0]?.prices?.[0]
                // FIX 1: Added null check for inventory_quantity
                const isInStock = (product.variants?.[0]?.inventory_quantity ?? 0) > 0

                return (
                  <Link
                    key={product.id}
                    href={`/products/${product.handle}`}
                    className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
                  >
                    {/* Product Image */}
                    <div className="aspect-square bg-gray-100 overflow-hidden">
                      {/* FIX 2: Added safe access to product.images */}
                      {product.thumbnail || (product.images && product.images.length > 0) ? (
                        <img
                          src={product.thumbnail || product.images?.[0]?.url}
                          alt={product.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          <div className="text-center">
                            <div className="text-4xl mb-2">📦</div>
                            <div className="text-sm">No Image</div>
                          </div>
                        </div>
                      )}

                      {/* Stock Badge */}
                      <div className="absolute top-3 left-3">
                        {isInStock ? (
                          <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">
                            In Stock
                          </span>
                        ) : (
                          <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded-full">
                            Out of Stock
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                        {product.title}
                      </h3>

                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {product.description || product.subtitle || 'Premium quality product with excellent features.'}
                      </p>

                      {/* Price */}
                      <div className="flex items-center justify-between">
                        {price ? (
                          <div className="text-xl font-bold text-gray-900">
                            ${(price.amount / 100).toFixed(2)}
                          </div>
                        ) : (
                          <div className="text-lg text-gray-500">
                            Price on request
                          </div>
                        )}

                        <div className="text-blue-600 font-medium group-hover:text-blue-700">
                          View Details →
                        </div>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🛍️</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No Products Found
              </h3>
              <p className="text-gray-600 mb-6">
                Make sure your Medusa backend is running and has products in the admin dashboard.
              </p>
              <Link
                href="/products"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Refresh Products
              </Link>
            </div>
          )}

          {/* View All Products */}
          {products.length > 0 && (
            <div className="text-center mt-12">
              <Link
                href="/products"
                className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-flex items-center space-x-2"
              >
                <span>View All Products</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingCart className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Easy Shopping
              </h3>
              <p className="text-gray-600">
                Browse and shop with our intuitive interface designed for the best user experience.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🚚</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Fast Delivery
              </h3>
              <p className="text-gray-600">
                Quick and reliable shipping to get your products to you as fast as possible.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Quality Products
              </h3>
              <p className="text-gray-600">
                Carefully curated selection of high-quality products you can trust.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}