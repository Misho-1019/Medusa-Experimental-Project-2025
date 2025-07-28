import medusa from "@/lib/medusa"
import { notFound } from "next/navigation"
import Image from "next/image"

interface ProductPageProps {
    params: { id: string }
}

export default async function ProductPage({ params }: ProductPageProps) {
    const { id: handle } = params

    try {
        const res = await medusa.products.list({ handle })

        if (!res.products || res.products.length === 0) {
            notFound()
        }

        const product = res.products[0]

        const variants = product.variants || []
        const selectedVariant = variants[0]
        const priceAmount = selectedVariant?.prices?.[0]?.amount
        const priceCurrency = selectedVariant?.prices?.[0]?.currency_code?.toUpperCase() || ""
        const price = priceAmount ? (priceAmount / 100).toFixed(2) : "N/A"

        return (
            <main className="p-6 max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold mb-4">{product.title}</h1>

                {/* ✅ Safe image rendering */}
                <div className="mb-6 flex gap-4 flex-wrap">
                    {Array.isArray(product.images) && product.images.length > 0 ? (
                        product.images.map((img) => (
                            <Image
                                key={img.id}
                                src={img.url}
                                alt={product.title || "image"}
                                width={300}
                                height={300}
                                className="rounded-lg object-cover"
                            />
                        ))
                    ) : product.thumbnail ? (
                        <Image
                            src={product.thumbnail}
                            alt={product.title || "image"}
                            width={300}
                            height={300}
                            className="rounded-lg object-cover"
                        />
                    ) : (
                        <div className="w-72 h-72 bg-gray-200 rounded-lg flex items-center justify-center">
                            <span className="text-gray-500">No image available</span>
                        </div>
                    )}
                </div>

                <p className="text-gray-700 mb-6">{product.description}</p>

                <div className="text-xl font-semibold mb-4">
                    Price: {price} {priceCurrency}
                </div>

                <button
                    disabled
                    className="bg-gray-400 text-white px-6 py-3 rounded cursor-not-allowed"
                    title="Add to Cart coming soon"
                >
                    Add to Cart
                </button>

                <div className="mt-8 text-sm text-gray-500 space-y-1">
                    {product.collection?.title && (
                        <div>
                            <strong>Collection:</strong> {product.collection.title}
                        </div>
                    )}

                    {/* ✅ Safe category rendering */}
                    {Array.isArray(product.categories) && product.categories.length > 0 && (
                        <div>
                            <strong>Categories:</strong>{" "}
                            {product.categories
                                .map((cat) => cat?.name || "Unnamed Category")
                                .join(", ")}
                        </div>
                    )}

                    {product.metadata && Object.keys(product.metadata).length > 0 && (
                        <div>
                            <strong>Metadata:</strong>{" "}
                            <pre className="bg-gray-100 p-2 rounded max-w-xl overflow-x-auto">
                                {JSON.stringify(product.metadata, null, 2)}
                            </pre>
                        </div>
                    )}
                </div>
            </main>
        )
    } catch (error) {
        console.error("Error fetching product:", error)
        notFound()
    }
}
