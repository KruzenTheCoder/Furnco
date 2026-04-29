import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, Save, Image as ImageIcon } from "lucide-react";
import { getCategories, getProductBySlug } from "@/lib/queries";
import { updateProductAction } from "@/app/admin/actions";
import { getServiceSupabase } from "@/lib/supabase";
import { notFound } from "next/navigation";

export default async function EditProductPage({ params }: { params: { id: string } }) {
  const categories = await getCategories();
  
  const serviceSupabase = getServiceSupabase();
  const { data: product } = await serviceSupabase
    .from('products')
    .select('*')
    .eq('id', params.id)
    .single();

  if (!product) {
    notFound();
  }

  // We bind the productId to the action
  const updateProductWithId = updateProductAction.bind(null, product.id);

  return (
    <form action={updateProductWithId} className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/products" className="p-2 text-gray-400 hover:text-gray-900 rounded-full hover:bg-gray-100 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-3xl font-bold font-heading text-gray-900 tracking-tight">Edit Product</h1>
        </div>
        <div className="flex gap-3">
          <Link href="/admin/products">
            <Button type="button" variant="outline" className="border-gray-300 text-gray-700">Discard</Button>
          </Link>
          <Button type="submit" className="bg-furnco-purple hover:bg-furnco-purple/90">
            <Save className="w-4 h-4 mr-2" /> Save Changes
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main Details */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white p-6 border rounded-sm shadow-sm">
            <h2 className="text-lg font-bold font-heading text-gray-900 mb-4">Basic Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Product Title</label>
                <input name="name" required type="text" defaultValue={product.name} className="w-full border rounded-sm px-3 py-2 text-sm focus:ring-furnco-purple focus:border-furnco-purple" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea name="description" rows={4} defaultValue={product.description || ''} className="w-full border rounded-sm px-3 py-2 text-sm focus:ring-furnco-purple focus:border-furnco-purple"></textarea>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 border rounded-sm shadow-sm">
            <h2 className="text-lg font-bold font-heading text-gray-900 mb-4">Media</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                <input name="image_url" type="url" defaultValue={product.image_url || ''} className="w-full border rounded-sm px-3 py-2 text-sm focus:ring-furnco-purple focus:border-furnco-purple" />
                <p className="text-xs text-gray-500 mt-1">Provide a direct link to the product image.</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 border rounded-sm shadow-sm">
            <h2 className="text-lg font-bold font-heading text-gray-900 mb-4">Pricing & Inventory</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price (ZAR)</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">R</span>
                  <input name="price" required type="number" step="0.01" min="0" defaultValue={product.price} className="w-full border rounded-sm pl-8 pr-3 py-2 text-sm focus:ring-furnco-purple focus:border-furnco-purple" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Stock Quantity</label>
                <input name="stock" type="number" min="0" defaultValue={product.stock} className="w-full border rounded-sm px-3 py-2 text-sm focus:ring-furnco-purple focus:border-furnco-purple" />
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="bg-white p-6 border rounded-sm shadow-sm">
            <h2 className="text-lg font-bold font-heading text-gray-900 mb-4">Status</h2>
            <select name="is_active" defaultValue={product.is_active ? 'active' : 'draft'} className="w-full border rounded-sm px-3 py-2 text-sm focus:ring-furnco-purple focus:border-furnco-purple">
              <option value="active">Active</option>
              <option value="draft">Draft</option>
            </select>
          </div>

          <div className="bg-white p-6 border rounded-sm shadow-sm">
            <h2 className="text-lg font-bold font-heading text-gray-900 mb-4">Organization</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select name="category_id" defaultValue={product.category_id || ''} className="w-full border rounded-sm px-3 py-2 text-sm focus:ring-furnco-purple focus:border-furnco-purple">
                  <option value="">Select category...</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 border rounded-sm shadow-sm">
            <h2 className="text-lg font-bold font-heading text-gray-900 mb-4">Badges</h2>
            <div className="space-y-2">
              <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-700">
                <input name="is_new" type="checkbox" defaultChecked={product.is_new || false} className="rounded border-gray-300 text-furnco-purple focus:ring-furnco-purple" />
                Mark as "New Item"
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-700">
                <input name="is_take2" type="checkbox" defaultChecked={product.is_take2 || false} className="rounded border-gray-300 text-furnco-purple focus:ring-furnco-purple" />
                Mark as "Take 2 Combo"
              </label>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}