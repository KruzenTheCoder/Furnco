import { ReactNode } from 'react';
import Link from 'next/link';
import { Plus_Jakarta_Sans, Playfair_Display } from 'next/font/google';
import { LayoutDashboard, ShoppingCart, Package, Settings, LogOut, MonitorPlay, Bell, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
});

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className={`flex h-screen bg-[#F8F9FA] font-sans selection:bg-furnco-purple/20 selection:text-furnco-purple ${plusJakartaSans.variable} ${playfairDisplay.variable}`}>
      {/* Sidebar */}
      <aside className="w-[280px] bg-white border-r border-gray-100 flex flex-col shadow-[4px_0_24px_rgba(0,0,0,0.02)] z-10 relative">
        <div className="h-20 flex items-center px-8 border-b border-gray-50">
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-gradient-to-br from-furnco-orange to-orange-500 p-1.5 rounded-lg shadow-sm">
              <div className="w-6 h-6 bg-furnco-purple rounded flex items-center justify-center text-white font-bold text-xs tracking-tighter">F</div>
            </div>
            <span className="text-xl font-bold font-heading tracking-tight text-gray-900">Furnco<span className="text-furnco-orange">.</span></span>
          </Link>
        </div>
        
        <div className="px-6 py-6">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Overview</p>
          <nav className="space-y-1.5">
            <Link href="/admin" className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-gray-600 rounded-lg hover:bg-gray-50 hover:text-gray-900 transition-all duration-200">
              <LayoutDashboard className="h-4 w-4 text-gray-400" />
              Dashboard
            </Link>
            <Link href="/admin/orders" className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-gray-600 rounded-lg hover:bg-gray-50 hover:text-gray-900 transition-all duration-200">
              <ShoppingCart className="h-4 w-4 text-gray-400" />
              Orders
              <span className="ml-auto bg-furnco-purple text-white text-[10px] font-bold px-2 py-0.5 rounded-full">12</span>
            </Link>
            <Link href="/admin/products" className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-gray-600 rounded-lg hover:bg-gray-50 hover:text-gray-900 transition-all duration-200">
              <Package className="h-4 w-4 text-gray-400" />
              Products
            </Link>
          </nav>
        </div>

        <div className="px-6 py-2 flex-1">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Management</p>
          <nav className="space-y-1.5">
            <Link href="/admin/content" className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-furnco-purple bg-furnco-purple/5 rounded-lg transition-all duration-200 border border-furnco-purple/10">
              <MonitorPlay className="h-4 w-4 text-furnco-purple" />
              Site Content
            </Link>
            <Link href="/admin/settings" className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-gray-600 rounded-lg hover:bg-gray-50 hover:text-gray-900 transition-all duration-200">
              <Settings className="h-4 w-4 text-gray-400" />
              Settings
            </Link>
          </nav>
        </div>

        <div className="p-6 border-t border-gray-50 mt-auto bg-gray-50/50">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-furnco-purple to-purple-900 flex items-center justify-center text-white font-bold shadow-md">
              A
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-bold text-gray-900 truncate">Admin User</p>
              <p className="text-xs text-gray-500 truncate">admin@furnco.com</p>
            </div>
          </div>
          <a href="/logout" className="flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-red-600 bg-white border border-red-100 rounded-lg hover:bg-red-50 hover:border-red-200 transition-all duration-200 w-full shadow-sm">
            <LogOut className="h-4 w-4" />
            Sign Out
          </a>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        {/* Subtle Background Elements */}
        <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-furnco-purple/[0.03] to-transparent pointer-events-none" />
        
        {/* Header */}
        <header className="h-20 bg-white/80 backdrop-blur-xl border-b border-gray-100 flex items-center justify-between px-8 sticky top-0 z-20">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative w-64 hidden md:block">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <Input 
                type="text" 
                placeholder="Search orders, products..." 
                className="pl-9 bg-gray-50/50 border-gray-200 focus-visible:ring-furnco-purple/30 rounded-lg h-9 text-sm"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-furnco-orange rounded-full border-2 border-white"></span>
            </button>
            <div className="h-6 w-px bg-gray-200 mx-2"></div>
            <Link href="/" target="_blank" className="text-sm font-medium text-furnco-purple hover:text-furnco-purple/80 transition-colors">
              View Live Store &rarr;
            </Link>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 p-8 overflow-y-auto custom-scrollbar relative z-10">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}