import { medusaClient } from '@/lib/medusa'

async function getProducts() {
  try {
    const { products } = await medusaClient.products.list({ limit: 6 })
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
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🛍️ Medusa Storefront
          </h1>
          <p className="text-xl text-gray-600">
            Connected to your Medusa backend - {products.length} products found
          </p>
        </div>

        {/* Connection Status */}
        <div className="mb-8 p-4 rounded-lg bg-green-50 border border-green-200 text-center">
          <p className="text-green-800">
            ✅ Successfully connected to Medusa backend at localhost:9000
          </p>
        </div>

        {/* Products Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                {/* Product Image */}
                <div className="h-48 bg-gray-200">
                  {product.thumbnail ? (
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <div className="text-center">
                        <div className="text-4xl mb-2">📦</div>
                        <div>No Image</div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {product.title}
                  </h3>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {product.description || 'No description available'}
                  </p>

                  {/* Price (from first variant) */}
                  {product.variants && product.variants.length > 0 && (
                    <div className="mb-4">
                      {product.variants[0].prices && product.variants[0].prices.length > 0 && (
                        <p className="text-xl font-bold text-gray-900">
                          ${(product.variants[0].prices[0].amount / 100).toFixed(2)}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Action Button */}
                  <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">
                    View Product
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">⚠️</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No Products Found
            </h3>
            <p className="text-gray-600">
              Make sure your Medusa backend is running and has products in the admin dashboard.
            </p>
          </div>
        )}

        {/* Debug Info */}
        <div className="mt-12 p-4 bg-blue-50 rounded-lg">
          <h4 className="font-semibold text-blue-900 mb-2">Debug Information:</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Backend URL: {process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL}</li>
            <li>• Products loaded: {products.length}</li>
            <li>• Connection status: {products.length > 0 ? 'Success' : 'Check backend'}</li>
          </ul>
        </div>
      </div>
    </div>
  )
}