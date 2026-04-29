import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, ShoppingCart, DollarSign, Users, TrendingUp, ArrowUpRight } from "lucide-react";

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold font-heading text-gray-900 tracking-tight">Dashboard Overview</h1>
          <p className="text-gray-500 text-sm mt-1">Welcome back! Here's what's happening with your store today.</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium bg-furnco-purple/10 text-furnco-purple px-3 py-1 rounded-full flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-furnco-purple animate-pulse"></span>
            Live Updates
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-gray-200 shadow-sm hover:border-furnco-purple/30 transition-colors">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-bold text-gray-500 uppercase tracking-wider">Total Revenue</CardTitle>
            <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
              <DollarSign className="h-4 w-4 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900 font-heading">R452,318.90</div>
            <p className="text-xs text-green-600 mt-2 flex items-center gap-1 font-medium">
              <ArrowUpRight className="w-3 h-3" /> +20.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card className="border-gray-200 shadow-sm hover:border-furnco-purple/30 transition-colors">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-bold text-gray-500 uppercase tracking-wider">Orders</CardTitle>
            <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
              <ShoppingCart className="h-4 w-4 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900 font-heading">+2350</div>
            <p className="text-xs text-green-600 mt-2 flex items-center gap-1 font-medium">
              <ArrowUpRight className="w-3 h-3" /> +180.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card className="border-gray-200 shadow-sm hover:border-furnco-purple/30 transition-colors">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-bold text-gray-500 uppercase tracking-wider">Products</CardTitle>
            <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center">
              <Package className="h-4 w-4 text-furnco-purple" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900 font-heading">124</div>
            <p className="text-xs text-gray-500 mt-2 flex items-center gap-1 font-medium">
              +12 new products added
            </p>
          </CardContent>
        </Card>
        <Card className="border-gray-200 shadow-sm hover:border-furnco-purple/30 transition-colors">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-bold text-gray-500 uppercase tracking-wider">Active Customers</CardTitle>
            <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center">
              <Users className="h-4 w-4 text-furnco-orange" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900 font-heading">+573</div>
            <p className="text-xs text-green-600 mt-2 flex items-center gap-1 font-medium">
              <ArrowUpRight className="w-3 h-3" /> +201 since last week
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="col-span-1 border-gray-200 shadow-sm">
          <CardHeader className="border-b border-gray-100 bg-gray-50/50 pb-4">
            <CardTitle className="font-heading text-lg text-gray-900 flex items-center justify-between">
              Recent Orders
              <button className="text-xs font-sans font-medium text-furnco-purple hover:underline">View All</button>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="space-y-5">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center justify-between group">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 font-medium text-sm group-hover:bg-furnco-purple group-hover:text-white transition-colors">
                      {i}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold text-sm text-gray-900">Order #{1000 + i}</span>
                      <span className="text-xs text-gray-500 font-medium">Customer {i}</span>
                    </div>
                  </div>
                  <div className="text-sm font-bold font-heading text-gray-900">R3,599.00</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-1 border-gray-200 shadow-sm">
          <CardHeader className="border-b border-gray-100 bg-gray-50/50 pb-4">
            <CardTitle className="font-heading text-lg text-gray-900 flex items-center justify-between">
              Top Products
              <button className="text-xs font-sans font-medium text-furnco-purple hover:underline">View Report</button>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="space-y-5">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center gap-4 group">
                  <div className="h-12 w-12 rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center overflow-hidden">
                    <Package className="w-5 h-5 text-gray-400 group-hover:scale-110 transition-transform" />
                  </div>
                  <div className="flex-1 flex flex-col">
                    <span className="font-bold text-sm text-gray-900 group-hover:text-furnco-purple transition-colors cursor-pointer">Premium Modern Sofa {i}</span>
                    <span className="text-xs text-amber-600 font-medium flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" /> {30 - i} trending up
                    </span>
                  </div>
                  <div className="text-sm font-bold font-heading text-gray-900">R8,999.00</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}