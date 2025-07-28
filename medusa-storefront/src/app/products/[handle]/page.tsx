// Create this file: src/app/products/[handle]/page.tsx

import { notFound } from 'next/navigation'
import { medusaClient } from '@/lib/medusa'
import ProductDetailClient from '@/components/product/ProductDetailClient'

async function getProduct(handle: string) {
    try {
        // Fixed: Removed expand parameter and used basic list call
        const { products } = await medusaClient.products.list({
            handle: handle
        })

        if (!products || products.length === 0) {
            return null
        }

        return products[0]
    } catch (error) {
        console.error('Failed to fetch product:', error)
        return null
    }
}

interface ProductPageProps {
    params: Promise<{
        handle: string
    }>
}

export default async function ProductPage({ params }: ProductPageProps) {
    // Fixed: Await params before accessing properties
    const { handle } = await params
    const product = await getProduct(handle)

    if (!product) {
        notFound()
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <ProductDetailClient product={product} />
        </div>
    )
}

// Generate metadata for SEO
export async function generateMetadata({ params }: ProductPageProps) {
    // Fixed: Await params before accessing properties
    const { handle } = await params
    const product = await getProduct(handle)

    if (!product) {
        return {
            title: 'Product Not Found',
        }
    }

    return {
        title: `${product.title} | Medusa Store`,
        description: product.description || `Shop ${product.title} at Medusa Store`,
    }
}