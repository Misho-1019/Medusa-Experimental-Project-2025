
'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ShoppingCart, Search, User, Menu, X } from 'lucide-react'

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [cartCount, setCartCount] = useState(0) // We'll connect this to real cart later

    return (
        <header className="bg-white shadow-sm border-b sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">

                    {/* Logo */}
                    <div className="flex items-center">
                        <Link href="/" className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-sm">M</span>
                            </div>
                            <span className="text-xl font-bold text-gray-900">
                                Medusa Store
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
                        <Link
                            href="/"
                            className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                        >
                            Home
                        </Link>
                        <Link
                            href="/products"
                            className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                        >
                            Products
                        </Link>
                        <Link
                            href="/categories"
                            className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                        >
                            Categories
                        </Link>
                        <Link
                            href="/about"
                            className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                        >
                            About
                        </Link>
                    </nav>

                    {/* Search Bar (Desktop) */}
                    <div className="hidden lg:flex items-center flex-1 max-w-md mx-8">
                        <div className="relative w-full">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <input
                                type="text"
                                placeholder="Search products..."
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                    </div>

                    {/* Right Side Icons */}
                    <div className="flex items-center space-x-4">

                        {/* Search Icon (Mobile) */}
                        <button className="lg:hidden p-2 text-gray-400 hover:text-gray-600">
                            <Search className="w-5 h-5" />
                        </button>

                        {/* User Account */}
                        <Link
                            href="/account"
                            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            <User className="w-5 h-5" />
                        </Link>

                        {/* Shopping Cart */}
                        <Link
                            href="/cart"
                            className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            <ShoppingCart className="w-5 h-5" />
                            {cartCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                    {cartCount}
                                </span>
                            )}
                        </Link>

                        {/* Mobile Menu Button */}
                        <button
                            className="md:hidden p-2 text-gray-400 hover:text-gray-600"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden border-t border-gray-200 py-4">
                        <div className="flex flex-col space-y-3">

                            {/* Mobile Search */}
                            <div className="px-2 pb-3">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                    <input
                                        type="text"
                                        placeholder="Search products..."
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                            </div>

                            {/* Mobile Navigation Links */}
                            <Link
                                href="/"
                                className="px-2 py-2 text-gray-700 hover:text-blue-600 font-medium"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Home
                            </Link>
                            <Link
                                href="/products"
                                className="px-2 py-2 text-gray-700 hover:text-blue-600 font-medium"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Products
                            </Link>
                            <Link
                                href="/categories"
                                className="px-2 py-2 text-gray-700 hover:text-blue-600 font-medium"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Categories
                            </Link>
                            <Link
                                href="/about"
                                className="px-2 py-2 text-gray-700 hover:text-blue-600 font-medium"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                About
                            </Link>
                            <Link
                                href="/account"
                                className="px-2 py-2 text-gray-700 hover:text-blue-600 font-medium"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                My Account
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </header>
    )
}