import { Search, Filter, Eye, MoreHorizontal, Download, Calendar, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getAdminOrders } from "@/lib/queries";

export default async function AdminOrdersPage() {
  let orders: Awaited<ReturnType<typeof getAdminOrders>> = [];

  try {
    orders = await getAdminOrders();
  } catch (error: any) {
    console.error("Failed to fetch orders:", error?.message || error);
    console.error("Error details:", JSON.stringify(error, null, 2));
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-ZA', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR',
      minimumFractionDigits: 2
    }).format(amount);
  };

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      pending: 'bg-amber-100 text-amber-700 border-amber-200',
      paid: 'bg-green-100 text-green-700 border-green-200',
      shipped: 'bg-blue-100 text-blue-700 border-blue-200',
      delivered: 'bg-green-100 text-green-700 border-green-200',
      cancelled: 'bg-red-100 text-red-700 border-red-200',
    };
    return styles[status] || 'bg-gray-100 text-gray-700 border-gray-200';
  };

  const getPaymentBadge = (status: string) => {
    if (status === 'paid') {
      return 'bg-green-100 text-green-700 border-green-200';
    }
    return 'bg-amber-100 text-amber-700 border-amber-200';
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold font-heading text-gray-900 tracking-tight">Orders</h1>
          <p className="text-gray-500 text-sm mt-1">Manage and track customer orders, payments, and fulfillment.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2 rounded-lg border-gray-200 text-gray-700 hover:bg-gray-50 shadow-sm h-10">
            <Download className="w-4 h-4" />
            Export CSV
          </Button>
        </div>
      </div>

      <div className="bg-white p-2 border border-gray-200 rounded-xl shadow-sm flex flex-col sm:flex-row gap-2 items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search orders..."
            className="w-full pl-9 pr-4 py-2 bg-gray-50/50 border-transparent focus:bg-white rounded-lg text-sm focus:ring-2 focus:ring-furnco-purple/20 focus:border-furnco-purple transition-all outline-none"
          />
        </div>
        <div className="h-8 w-px bg-gray-200 hidden sm:block mx-1"></div>
        <div className="flex gap-2 w-full sm:w-auto">
          <div className="relative group">
            <select className="appearance-none bg-white border border-gray-200 rounded-lg pl-4 pr-10 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-furnco-purple/20 focus:border-furnco-purple outline-none cursor-pointer w-full">
              <option>All Statuses</option>
              <option>Pending</option>
              <option>Processing</option>
              <option>Shipped</option>
              <option>Delivered</option>
              <option>Cancelled</option>
            </select>
            <Filter className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
          <Button variant="outline" className="gap-2 rounded-lg border-gray-200 text-gray-700 hover:bg-gray-50 shadow-sm h-9">
            <Calendar className="w-4 h-4" />
            Date Range
          </Button>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50/80 text-gray-600 text-xs uppercase tracking-wider border-b border-gray-200 font-semibold">
              <tr>
                <th className="px-6 py-4 w-12">
                  <input type="checkbox" className="rounded border-gray-300 text-furnco-purple focus:ring-furnco-purple/30 w-4 h-4 cursor-pointer" />
                </th>
                <th className="px-6 py-4">
                  <div className="flex items-center gap-2 cursor-pointer hover:text-furnco-purple">Order ID <ArrowUpDown className="w-3 h-3" /></div>
                </th>
                <th className="px-6 py-4">
                  <div className="flex items-center gap-2 cursor-pointer hover:text-furnco-purple">Date <ArrowUpDown className="w-3 h-3" /></div>
                </th>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">
                  <div className="flex items-center gap-2 cursor-pointer hover:text-furnco-purple">Total <ArrowUpDown className="w-3 h-3" /></div>
                </th>
                <th className="px-6 py-4">Payment</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {orders.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-6 py-12 text-center text-gray-500">
                    No orders found. Orders will appear here once customers start placing them.
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50/80 transition-colors group">
                    <td className="px-6 py-4">
                      <input type="checkbox" className="rounded border-gray-300 text-furnco-purple focus:ring-furnco-purple/30 w-4 h-4 cursor-pointer" />
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-bold text-furnco-purple font-heading tracking-wide">#{order.id.slice(0, 8).toUpperCase()}</span>
                    </td>
                    <td className="px-6 py-4 text-gray-500 font-medium">{formatDate(order.created_at)}</td>
                    <td className="px-6 py-4">
                      <p className="font-bold text-gray-900 group-hover:text-furnco-purple transition-colors cursor-pointer">
                        {order.user?.full_name || 'Guest'}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {order.user?.email || 'No email'}
                      </p>
                    </td>
                    <td className="px-6 py-4 font-bold text-gray-900 font-heading">{formatCurrency(order.total)}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold border ${getPaymentBadge(order.status === 'paid' ? 'paid' : 'pending')}`}>
                        {order.status === 'paid' ? 'Paid' : 'Pending'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold border ${getStatusBadge(order.status)}`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button className="p-2 text-gray-400 hover:text-furnco-purple rounded-lg hover:bg-purple-50 transition-colors" title="View Details">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-gray-900 rounded-lg hover:bg-gray-100 transition-colors" title="More Actions">
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="bg-gray-50/50 border-t border-gray-200 p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            Showing <span className="font-bold text-gray-900">1</span> to <span className="font-bold text-gray-900">{orders.length}</span> of <span className="font-bold text-gray-900">{orders.length}</span> orders
          </p>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="rounded-lg h-8 px-3 text-xs font-medium" disabled>Previous</Button>
            <div className="flex items-center gap-1">
              <Button variant="outline" size="sm" className="rounded-lg h-8 w-8 p-0 text-xs font-bold bg-furnco-purple text-white border-furnco-purple hover:bg-furnco-purple/90 hover:text-white">1</Button>
            </div>
            <Button variant="outline" size="sm" className="rounded-lg h-8 px-3 text-xs font-medium text-gray-600">Next</Button>
          </div>
        </div>
      </div>
    </div>
  );
}