// Create this file: src/components/product/ProductDetailClient.tsx

'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Star, Heart, Share2, ShoppingCart, Minus, Plus } from 'lucide-react'

// Use the actual Medusa types - this will be more flexible
interface ProductDetailClientProps {
    product: any // We'll use 'any' for now to avoid complex type definitions
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
    const [selectedImageIndex, setSelectedImageIndex] = useState(0)
    const [selectedVariant, setSelectedVariant] = useState(product.variants?.[0])
    const [quantity, setQuantity] = useState(1)
    const [isAddingToCart, setIsAddingToCart] = useState(false)
    const [isWishlisted, setIsWishlisted] = useState(false)

    const images = product.images?.length > 0 ? product.images :
        product.thumbnail ? [{ id: 'thumb', url: product.thumbnail }] : []

    const price = selectedVariant?.prices?.[0]
    const isInStock = selectedVariant?.inventory_quantity > 0

    const handleAddToCart = async () => {
        setIsAddingToCart(true)

        // Simulate API call - we'll implement real cart later
        setTimeout(() => {
            setIsAddingToCart(false)
            alert(`Added ${quantity} x ${product.title} to cart!`)
        }, 1000)
    }

    const incrementQuantity = () => {
        if (selectedVariant && quantity < selectedVariant.inventory_quantity) {
            setQuantity(prev => prev + 1)
        }
    }

    const decrementQuantity = () => {
        if (quantity > 1) {
            setQuantity(prev => prev - 1)
        }
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">

            {/* Product Images */}
            <div className="space-y-4">
                {/* Main Image */}
                <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                    {images.length > 0 ? (
                        <img
                            src={images[selectedImageIndex].url}
                            alt={product.title}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                            <div className="text-center">
                                <div className="text-6xl mb-4">📦</div>
                                <div>No Image Available</div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Thumbnail Gallery */}
                {images.length > 1 && (
                    <div className="flex space-x-2 overflow-x-auto">
                        {images.map((image: any, index: number) => (
                            <button
                                key={image.id}
                                onClick={() => setSelectedImageIndex(index)}
                                className={`flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 transition-colors ${index === selectedImageIndex
                                        ? 'border-blue-500'
                                        : 'border-gray-200 hover:border-gray-300'
                                    }`}
                            >
                                <img
                                    src={image.url}
                                    alt={`${product.title} ${index + 1}`}
                                    className="w-full h-full object-cover"
                                />
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Product Information */}
            <div className="space-y-6">

                {/* Breadcrumb */}
                <nav className="flex items-center space-x-2 text-sm text-gray-500">
                    <a href="/" className="hover:text-gray-700">Home</a>
                    <span>/</span>
                    <a href="/products" className="hover:text-gray-700">Products</a>
                    {product.collection && (
                        <>
                            <span>/</span>
                            <a href={`/collections/${product.collection.handle}`} className="hover:text-gray-700">
                                {product.collection.title}
                            </a>
                        </>
                    )}
                    <span>/</span>
                    <span className="text-gray-900">{product.title}</span>
                </nav>

                {/* Product Title & Rating */}
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        {product.title}
                    </h1>
                    {product.subtitle && (
                        <p className="text-lg text-gray-600 mb-4">
                            {product.subtitle}
                        </p>
                    )}

                    {/* Mock Rating */}
                    <div className="flex items-center space-x-2">
                        <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                                <Star
                                    key={i}
                                    className={`w-4 h-4 ${i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                                />
                            ))}
                        </div>
                        <span className="text-sm text-gray-600">(4.0) · 128 reviews</span>
                    </div>
                </div>

                {/* Price */}
                <div className="space-y-2">
                    {price && (
                        <div className="text-3xl font-bold text-gray-900">
                            ${(price.amount / 100).toFixed(2)}
                        </div>
                    )}
                    <div className="flex items-center space-x-2">
                        <span className={`text-sm font-medium ${isInStock ? 'text-green-600' : 'text-red-600'}`}>
                            {isInStock ? 'In Stock' : 'Out of Stock'}
                        </span>
                        {isInStock && (
                            <span className="text-sm text-gray-500">
                                ({selectedVariant.inventory_quantity} available)
                            </span>
                        )}
                    </div>
                </div>

                {/* Variant Selection */}
                {product.variants && product.variants.length > 1 && (
                    <div>
                        <h3 className="text-sm font-medium text-gray-900 mb-3">Select Variant</h3>
                        <div className="grid grid-cols-2 gap-2">
                            {product.variants.map((variant: any) => (
                                <button
                                    key={variant.id}
                                    onClick={() => setSelectedVariant(variant)}
                                    className={`p-3 text-sm border rounded-lg transition-colors ${selectedVariant?.id === variant.id
                                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                                            : 'border-gray-300 hover:border-gray-400'
                                        }`}
                                >
                                    {variant.title}
                                    {variant.prices?.[0] && (
                                        <div className="text-xs text-gray-500 mt-1">
                                            ${(variant.prices[0].amount / 100).toFixed(2)}
                                        </div>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Quantity & Add to Cart */}
                <div className="space-y-4">
                    <div>
                        <label className="text-sm font-medium text-gray-900 mb-2 block">
                            Quantity
                        </label>
                        <div className="flex items-center space-x-3">
                            <button
                                onClick={decrementQuantity}
                                disabled={quantity <= 1}
                                className="p-2 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <Minus className="w-4 h-4" />
                            </button>
                            <span className="text-lg font-medium w-12 text-center">
                                {quantity}
                            </span>
                            <button
                                onClick={incrementQuantity}
                                disabled={!selectedVariant || quantity >= selectedVariant.inventory_quantity}
                                className="p-2 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <Plus className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    <div className="flex space-x-3">
                        <button
                            onClick={handleAddToCart}
                            disabled={!isInStock || isAddingToCart}
                            className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
                        >
                            <ShoppingCart className="w-5 h-5" />
                            <span>
                                {isAddingToCart ? 'Adding...' : 'Add to Cart'}
                            </span>
                        </button>

                        <button
                            onClick={() => setIsWishlisted(!isWishlisted)}
                            className={`p-3 border rounded-lg transition-colors ${isWishlisted
                                    ? 'border-red-300 bg-red-50 text-red-600'
                                    : 'border-gray-300 hover:border-gray-400'
                                }`}
                        >
                            <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
                        </button>

                        <button className="p-3 border border-gray-300 rounded-lg hover:border-gray-400 transition-colors">
                            <Share2 className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Product Description */}
                {product.description && (
                    <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-3">
                            Description
                        </h3>
                        <div className="prose prose-sm text-gray-600">
                            <p>{product.description}</p>
                        </div>
                    </div>
                )}

                {/* Tags */}
                {product.tags && product.tags.length > 0 && (
                    <div>
                        <h3 className="text-sm font-medium text-gray-900 mb-2">Tags</h3>
                        <div className="flex flex-wrap gap-2">
                            {product.tags.map((tag: any, index: number) => (
                                <span
                                    key={index}
                                    className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                                >
                                    {tag.value}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}