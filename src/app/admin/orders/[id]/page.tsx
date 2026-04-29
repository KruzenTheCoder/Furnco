import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, Save, Package } from "lucide-react";
import { getOrderById } from "@/lib/queries";
import { updateOrderStatusAction } from "@/app/admin/actions";
import { notFound } from "next/navigation";

export default async function OrderDetailsPage({ params }: { params: { id: string } }) {
  let order = null;

  try {
    order = await getOrderById(params.id);
  } catch (error) {
    console.error("Failed to fetch order details:", error);
  }

  if (!order) {
    notFound();
  }

  const updateOrderStatus = updateOrderStatusAction.bind(null, order.id);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-ZA', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR',
      minimumFractionDigits: 2
    }).format(amount);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/orders" className="p-2 text-gray-400 hover:text-gray-900 rounded-full hover:bg-gray-100 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-3xl font-bold font-heading text-gray-900 tracking-tight">Order #{order.id.slice(0, 8).toUpperCase()}</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white p-6 border rounded-sm shadow-sm">
            <h2 className="text-lg font-bold font-heading text-gray-900 mb-4">Order Items</h2>
            <div className="space-y-4">
              {order.items && order.items.length > 0 ? (
                order.items.map((item: any) => (
                  <div key={item.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-gray-100 rounded-sm border flex items-center justify-center overflow-hidden">
                        {item.product?.image_url ? (
                          <img src={item.product.image_url} alt={item.product.name} className="w-full h-full object-cover" />
                        ) : (
                          <Package className="w-6 h-6 text-gray-400" />
                        )}
                      </div>
                      <div>
                        <p className="font-bold text-gray-900">{item.product?.name || 'Unknown Product'}</p>
                        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-900">{formatCurrency(Number(item.price_at_purchase))}</p>
                      <p className="text-xs text-gray-500">Total: {formatCurrency(Number(item.price_at_purchase) * item.quantity)}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No items found in this order.</p>
              )}
            </div>
            
            <div className="mt-6 border-t pt-4">
              <div className="flex justify-between items-center text-lg font-bold">
                <span>Total Amount:</span>
                <span>{formatCurrency(Number(order.total))}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <form action={updateOrderStatus} className="bg-white p-6 border rounded-sm shadow-sm">
            <h2 className="text-lg font-bold font-heading text-gray-900 mb-4">Order Status</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Current Status</label>
                <select name="status" defaultValue={order.status} className="w-full border rounded-sm px-3 py-2 text-sm focus:ring-furnco-purple focus:border-furnco-purple">
                  <option value="pending">Pending</option>
                  <option value="paid">Paid</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
              <Button type="submit" className="w-full bg-furnco-purple hover:bg-furnco-purple/90">
                <Save className="w-4 h-4 mr-2" /> Update Status
              </Button>
            </div>
          </form>

          <div className="bg-white p-6 border rounded-sm shadow-sm">
            <h2 className="text-lg font-bold font-heading text-gray-900 mb-4">Customer Details</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Name:</span>
                <span className="font-medium text-gray-900">{order.user?.full_name || 'Guest'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Email:</span>
                <span className="font-medium text-gray-900">{order.user?.email || 'N/A'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Date:</span>
                <span className="font-medium text-gray-900">{formatDate(order.created_at)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}