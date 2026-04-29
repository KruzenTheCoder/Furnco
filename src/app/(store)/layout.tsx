import { ReactNode } from 'react';
import { ShoppingCart, User, Globe } from 'lucide-react';
import Link from 'next/link';
import { cookies } from 'next/headers';
import { StoreNav } from '@/components/layout/StoreNav';

export default async function StoreLayout({ children }: { children: ReactNode }) {
  const cookieStore = await cookies();
  const isLoggedIn = cookieStore.has('mock_client_session') || cookieStore.has('mock_admin_session');

  return (
    <div className="min-h-screen flex flex-col bg-furnco-bg font-sans" suppressHydrationWarning>
      {/* Top Bar */}
      <div className="bg-furnco-purple text-white text-xs py-1 px-4 flex justify-end items-center gap-4">
        {isLoggedIn ? (
          <a href="/logout" className="hover:underline">Logout</a>
        ) : (
          <Link href="/login" className="hover:underline">Login</Link>
        )}
        <span className="text-gray-400">|</span>
        <Link href="#" className="flex items-center gap-1 hover:underline">
          <Globe className="w-3 h-3" /> Socials
        </Link>
      </div>

      {/* Main Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center w-full">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-furnco-orange p-1.5 rounded-sm">
              <div className="w-6 h-6 bg-furnco-purple flex items-center justify-center text-white font-bold text-xs">F</div>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold tracking-tight text-furnco-purple leading-none">furnco</span>
              <span className="text-[0.6rem] text-gray-500 uppercase tracking-wider leading-none">Furniture & Appliances</span>
            </div>
          </Link>

          {/* Navigation */}
          <StoreNav />

          {/* Cart */}
          <Link href="/cart" className="flex items-center gap-2 text-furnco-purple hover:text-furnco-orange transition-colors">
            <div className="relative">
              <ShoppingCart className="w-6 h-6" />
              <span className="absolute -top-2 -right-2 bg-furnco-orange text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">0</span>
            </div>
            <span className="text-sm font-semibold hidden sm:inline">Cart</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto bg-white shadow-sm min-h-screen">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-furnco-purple text-white py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl font-bold tracking-tight text-white leading-none">furnco</span>
            </div>
            <p className="text-xs text-gray-300 mb-4">Furniture & Appliances</p>
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-furnco-orange cursor-pointer transition-colors"><Globe className="w-4 h-4" /></div>
              {/* Add more social icons here */}
            </div>
          </div>
          <div>
            <h4 className="font-bold mb-4">Home</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link href="/beds" className="hover:text-white">Beds</Link></li>
              <li><Link href="/wardrobes" className="hover:text-white">Wardrobes</Link></li>
              <li><Link href="/lounge" className="hover:text-white">Lounge</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Deals</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link href="/payment-methods" className="hover:text-white">Payment Methods</Link></li>
              <li><Link href="/confirm-password" className="hover:text-white">Confirm Password</Link></li>
              <li><Link href="/account-details" className="hover:text-white">Account Details</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>1223 Tautenbos, co.za</li>
              <li>+27 081 531 3144</li>
              <li>info@furnco.co.za</li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}