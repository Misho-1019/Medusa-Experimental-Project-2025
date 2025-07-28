'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Header() {
    const pathname = usePathname()

    const navItems = [
        { name: 'Home', href: '/' },
        { name: 'Products', href: '/products' },
        { name: 'About', href: '/about' },
        { name: 'Contact', href: '/contact' },
    ]

    return (
        <header className="bg-white border-b shadow-sm sticky top-0 z-50">
            <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
                {/* Logo / Brand */}
                <Link href="/" className="text-xl font-bold text-gray-900">
                    Medusa Store
                </Link>

                {/* Navigation */}
                <nav className="space-x-6 hidden sm:block">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`text-sm font-medium transition-colors ${pathname === item.href
                                    ? 'text-black underline underline-offset-4'
                                    : 'text-gray-600 hover:text-black'
                                }`}
                        >
                            {item.name}
                        </Link>
                    ))}
                </nav>

                {/* Cart (Placeholder) */}
                <button
                    disabled
                    title="Cart coming soon"
                    className="text-gray-500 hover:text-black transition-colors"
                >
                    🛒
                </button>
            </div>
        </header>
    )
}
