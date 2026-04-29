import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, Save, Image as ImageIcon } from "lucide-react";

export default function CreateProductPage() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/products" className="p-2 text-gray-400 hover:text-gray-900 rounded-full hover:bg-gray-100 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-3xl font-bold font-heading text-gray-900 tracking-tight">Add New Product</h1>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="border-gray-300 text-gray-700">Discard</Button>
          <Button className="bg-furnco-purple hover:bg-furnco-purple/90">
            <Save className="w-4 h-4 mr-2" /> Save Product
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
                <input type="text" className="w-full border rounded-sm px-3 py-2 text-sm focus:ring-furnco-purple focus:border-furnco-purple" placeholder="e.g. Mandy Table and Chair" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea rows={4} className="w-full border rounded-sm px-3 py-2 text-sm focus:ring-furnco-purple focus:border-furnco-purple" placeholder="Write a detailed product description..."></textarea>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 border rounded-sm shadow-sm">
            <h2 className="text-lg font-bold font-heading text-gray-900 mb-4">Media</h2>
            <div className="border-2 border-dashed border-gray-300 rounded-sm p-8 text-center hover:bg-gray-50 transition-colors cursor-pointer group">
              <div className="flex flex-col items-center justify-center space-y-3">
                <div className="w-12 h-12 bg-furnco-purple/10 rounded-full flex items-center justify-center text-furnco-purple group-hover:scale-110 transition-transform">
                  <ImageIcon className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Click to upload or drag and drop</p>
                  <p className="text-xs text-gray-500 mt-1">SVG, PNG, JPG or GIF (max. 800x400px)</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 border rounded-sm shadow-sm">
            <h2 className="text-lg font-bold font-heading text-gray-900 mb-4">Pricing</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price (ZAR)</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">R</span>
                  <input type="number" className="w-full border rounded-sm pl-8 pr-3 py-2 text-sm focus:ring-furnco-purple focus:border-furnco-purple" placeholder="0.00" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Compare at price (Optional)</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">R</span>
                  <input type="number" className="w-full border rounded-sm pl-8 pr-3 py-2 text-sm focus:ring-furnco-purple focus:border-furnco-purple" placeholder="0.00" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="bg-white p-6 border rounded-sm shadow-sm">
            <h2 className="text-lg font-bold font-heading text-gray-900 mb-4">Status</h2>
            <select className="w-full border rounded-sm px-3 py-2 text-sm focus:ring-furnco-purple focus:border-furnco-purple">
              <option value="active">Active</option>
              <option value="draft">Draft</option>
            </select>
          </div>

          <div className="bg-white p-6 border rounded-sm shadow-sm">
            <h2 className="text-lg font-bold font-heading text-gray-900 mb-4">Organization</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select className="w-full border rounded-sm px-3 py-2 text-sm focus:ring-furnco-purple focus:border-furnco-purple">
                  <option>Select category...</option>
                  <option>Bedroom</option>
                  <option>Kitchen</option>
                  <option>Lounge</option>
                  <option>Appliances</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Brand</label>
                <select className="w-full border rounded-sm px-3 py-2 text-sm focus:ring-furnco-purple focus:border-furnco-purple">
                  <option>Select brand...</option>
                  <option>Defy</option>
                  <option>KIC</option>
                  <option>Furnco</option>
                </select>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 border rounded-sm shadow-sm">
            <h2 className="text-lg font-bold font-heading text-gray-900 mb-4">Badges</h2>
            <div className="space-y-2">
              <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-700">
                <input type="checkbox" className="rounded border-gray-300 text-furnco-purple focus:ring-furnco-purple" />
                Mark as "New Item"
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-700">
                <input type="checkbox" className="rounded border-gray-300 text-furnco-purple focus:ring-furnco-purple" />
                Mark as "Take 2 Combo"
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}