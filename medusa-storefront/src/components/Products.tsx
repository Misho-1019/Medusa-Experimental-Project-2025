// "use client"
// import { useEffect, useState } from "react"
// import { listProducts } from "@/lib/data/products"

// // type StoreProduct = Awaited<ReturnType<typeof listProducts>>[number]

// export default function Products() {
//     const [loading, setLoading] = useState(true)
//     const [products, setProducts] = useState<StoreProduct[]>([])

//     useEffect(() => {
//         listProducts().then((data) => {
//             setProducts(data ?? []) // Ensure data is always an array
//             setLoading(false)
//         })
//     }, [])

//     if (loading) return <div>Loading...</div>
//     if (!products.length) return <div>No products found.</div>

//     return (
//         <ul>
//             {products.map((product) => (
//                 <li key={product.id}>{product.title}</li>
//             ))}
//         </ul>
//     )
// }