
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Header from '@/components/layout/Header'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Medusa Storefront - Modern E-commerce',
  description: 'Professional e-commerce storefront built with Next.js and Medusa',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main className="min-h-screen bg-gray-50">
          {children}
        </main>
        <footer className="bg-white border-t">
          <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

              {/* Company Info */}
              <div className="col-span-1 md:col-span-2">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">M</span>
                  </div>
                  <span className="text-xl font-bold text-gray-900">
                    Medusa Store
                  </span>
                </div>
                <p className="text-gray-600 max-w-md">
                  Your premier destination for quality products. Built with modern
                  technology to provide the best shopping experience.
                </p>
              </div>

              {/* Quick Links */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
                  Shop
                </h3>
                <ul className="space-y-2">
                  <li><a href="/products" className="text-gray-600 hover:text-blue-600">All Products</a></li>
                  <li><a href="/categories" className="text-gray-600 hover:text-blue-600">Categories</a></li>
                  <li><a href="/new" className="text-gray-600 hover:text-blue-600">New Arrivals</a></li>
                  <li><a href="/sale" className="text-gray-600 hover:text-blue-600">Sale</a></li>
                </ul>
              </div>

              {/* Support */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
                  Support
                </h3>
                <ul className="space-y-2">
                  <li><a href="/contact" className="text-gray-600 hover:text-blue-600">Contact Us</a></li>
                  <li><a href="/shipping" className="text-gray-600 hover:text-blue-600">Shipping Info</a></li>
                  <li><a href="/returns" className="text-gray-600 hover:text-blue-600">Returns</a></li>
                  <li><a href="/faq" className="text-gray-600 hover:text-blue-600">FAQ</a></li>
                </ul>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-200">
              <p className="text-center text-gray-500 text-sm">
                © 2025 Medusa Storefront. Built with Next.js and Medusa for demonstration purposes.
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}