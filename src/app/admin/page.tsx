import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, ShoppingCart, DollarSign, Users, TrendingUp, ArrowUpRight } from "lucide-react";
import { getAdminProducts, getAdminOrders } from "@/lib/queries";
import Link from "next/link";

export default async function AdminDashboardPage() {
  let products = [];
  let orders = [];

  try {
    products = await getAdminProducts();
    orders = await getAdminOrders();
  } catch (error) {
    console.error("Failed to fetch dashboard data:", error);
  }

  // Calculate metrics
  const totalProducts = products.length;
  const totalOrders = orders.length;
  
  // Calculate total revenue (only from paid, shipped, or delivered orders)
  const validOrderStatuses = ['paid', 'shipped', 'delivered'];
  const totalRevenue = orders
    .filter(order => validOrderStatuses.includes(order.status))
    .reduce((sum, order) => sum + Number(order.total), 0);

  // Extract unique customers
  const uniqueCustomers = new Set(orders.map(order => order.user_id).filter(Boolean)).size;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR',
      minimumFractionDigits: 2
    }).format(amount);
  };

  const recentOrders = orders.slice(0, 5);
  const topProducts = products.slice(0, 5);

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
            <div className="text-3xl font-bold text-gray-900 font-heading">{formatCurrency(totalRevenue)}</div>
            <p className="text-xs text-green-600 mt-2 flex items-center gap-1 font-medium">
              <ArrowUpRight className="w-3 h-3" /> From completed orders
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
            <div className="text-3xl font-bold text-gray-900 font-heading">{totalOrders}</div>
            <p className="text-xs text-blue-600 mt-2 flex items-center gap-1 font-medium">
              Lifetime orders
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
            <div className="text-3xl font-bold text-gray-900 font-heading">{totalProducts}</div>
            <p className="text-xs text-gray-500 mt-2 flex items-center gap-1 font-medium">
              Active in inventory
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
            <div className="text-3xl font-bold text-gray-900 font-heading">{uniqueCustomers}</div>
            <p className="text-xs text-orange-600 mt-2 flex items-center gap-1 font-medium">
              Registered buyers
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="col-span-1 border-gray-200 shadow-sm">
          <CardHeader className="border-b border-gray-100 bg-gray-50/50 pb-4">
            <CardTitle className="font-heading text-lg text-gray-900 flex items-center justify-between">
              Recent Orders
              <Link href="/admin/orders" className="text-xs font-sans font-medium text-furnco-purple hover:underline">View All</Link>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="space-y-5">
              {recentOrders.length === 0 ? (
                <p className="text-sm text-gray-500">No orders yet.</p>
              ) : (
                recentOrders.map((order, i) => (
                  <div key={order.id} className="flex items-center justify-between group">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 font-medium text-sm group-hover:bg-furnco-purple group-hover:text-white transition-colors">
                        {i + 1}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-sm text-gray-900">Order #{order.id.slice(0, 8).toUpperCase()}</span>
                        <span className="text-xs text-gray-500 font-medium">{order.user?.full_name || 'Guest Customer'}</span>
                      </div>
                    </div>
                    <div className="text-sm font-bold font-heading text-gray-900">{formatCurrency(Number(order.total))}</div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-1 border-gray-200 shadow-sm">
          <CardHeader className="border-b border-gray-100 bg-gray-50/50 pb-4">
            <CardTitle className="font-heading text-lg text-gray-900 flex items-center justify-between">
              Recent Products
              <Link href="/admin/products" className="text-xs font-sans font-medium text-furnco-purple hover:underline">View Catalog</Link>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="space-y-5">
              {topProducts.length === 0 ? (
                <p className="text-sm text-gray-500">No products added yet.</p>
              ) : (
                topProducts.map((product) => (
                  <div key={product.id} className="flex items-center gap-4 group">
                    <div className="h-12 w-12 rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center overflow-hidden">
                      {product.image_url ? (
                        <img src={product.image_url} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                      ) : (
                        <Package className="w-5 h-5 text-gray-400 group-hover:scale-110 transition-transform" />
                      )}
                    </div>
                    <div className="flex-1 flex flex-col">
                      <span className="font-bold text-sm text-gray-900 group-hover:text-furnco-purple transition-colors cursor-pointer">{product.name}</span>
                      <span className="text-xs text-gray-500 font-medium flex items-center gap-1">
                        In stock: {product.stock}
                      </span>
                    </div>
                    <div className="text-sm font-bold font-heading text-gray-900">{formatCurrency(Number(product.price))}</div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}