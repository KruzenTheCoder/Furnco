import { 
  LayoutDashboard, 
  ShoppingBag, 
  MapPin, 
  CreditCard, 
  Heart, 
  User, 
  LogOut 
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AccountOrdersPage() {
  return (
    <div className="flex flex-col md:flex-row gap-8 p-6 min-h-screen">
      {/* Account Sidebar */}
      <aside className="w-full md:w-64 flex-shrink-0">
        <nav className="flex flex-col text-sm border rounded-sm overflow-hidden bg-white shadow-sm">
          <Link href="/account" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 border-l-4 border-transparent hover:border-gray-200">
            <LayoutDashboard className="w-4 h-4" /> Dashboard
          </Link>
          <Link href="/account/orders" className="flex items-center gap-3 px-4 py-3 bg-furnco-purple/5 text-furnco-purple border-l-4 border-furnco-purple font-semibold">
            <ShoppingBag className="w-4 h-4" /> My Orders
          </Link>
          <Link href="/account/addresses" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 border-l-4 border-transparent hover:border-gray-200">
            <MapPin className="w-4 h-4" /> Addresses
          </Link>
          <Link href="/account/payment" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 border-l-4 border-transparent hover:border-gray-200">
            <CreditCard className="w-4 h-4" /> Payment Methods
          </Link>
          <Link href="/account/wishlist" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 border-l-4 border-transparent hover:border-gray-200">
            <Heart className="w-4 h-4" /> My Wishlist
          </Link>
          <Link href="/account/details" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 border-l-4 border-transparent hover:border-gray-200">
            <User className="w-4 h-4" /> Account Details
          </Link>
          <a href="/logout" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 border-l-4 border-transparent hover:border-gray-200 mt-2 border-t">
            <LogOut className="w-4 h-4" /> Sign Out
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">My Orders</h1>
          <p className="text-gray-500 text-sm mt-1">View your order history and track deliveries.</p>
        </div>

        <div className="overflow-x-auto border rounded-sm shadow-sm bg-white">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b">
              <tr>
                <th className="px-4 py-3">Order #</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="px-4 py-3 font-medium">000003840</td>
                <td className="px-4 py-3 text-gray-500">24 Jun 2026</td>
                <td className="px-4 py-3"><span className="text-green-600 font-semibold">Active</span></td>
                <td className="px-4 py-3">R1959.00</td>
                <td className="px-4 py-3 text-right">
                  <Button size="sm" className="bg-furnco-orange hover:bg-furnco-orange/90 h-7 text-xs rounded-sm">View order</Button>
                </td>
              </tr>
              <tr className="border-b bg-gray-50/50">
                <td className="px-4 py-3 font-medium">000001889</td>
                <td className="px-4 py-3 text-gray-500">22 Jun 2026</td>
                <td className="px-4 py-3 text-gray-500">Canceled</td>
                <td className="px-4 py-3">R1400.00</td>
                <td className="px-4 py-3 text-right">
                  <Button size="sm" variant="outline" className="h-7 text-xs rounded-sm">Reorder</Button>
                </td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-medium">000008888</td>
                <td className="px-4 py-3 text-gray-500">22 Jun 2026</td>
                <td className="px-4 py-3 text-gray-500">Delivered</td>
                <td className="px-4 py-3">R89.00</td>
                <td className="px-4 py-3 text-right">
                  <Button size="sm" variant="outline" className="h-7 text-xs rounded-sm">Review</Button>
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium">000001160</td>
                <td className="px-4 py-3 text-gray-500">22 Jun 2026</td>
                <td className="px-4 py-3 text-gray-500">Pending</td>
                <td className="px-4 py-3">R400.00</td>
                <td className="px-4 py-3 text-right">
                  <Button size="sm" className="bg-furnco-orange hover:bg-furnco-orange/90 h-7 text-xs rounded-sm">Pay now</Button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}