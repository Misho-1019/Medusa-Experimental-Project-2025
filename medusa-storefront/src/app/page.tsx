'use client'

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import medusa from "@/lib/medusa"

// Infer product type from SDK
type ProductType = Awaited<ReturnType<typeof medusa.products.list>>["products"][0]

export default function Home() {
  const [products, setProducts] = useState<ProductType[]>([])

  useEffect(() => {
    medusa.products
      .list()
      .then(({ products }) => setProducts(products))
      .catch(console.error)
  }, [])

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <li key={product.id} className="border p-4 rounded-lg hover:shadow transition">
            <Link href={`/products/${product.handle}`}>
              <div>
                {product.thumbnail && (
                  <div className="mb-3 aspect-[4/3] bg-gray-100 relative rounded overflow-hidden">
                    <Image
                      src={product.thumbnail}
                      alt={product.title || 'image'}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <h2 className="font-semibold text-lg">{product.title}</h2>
                <p className="text-sm text-gray-600">{product.description}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  )
}
