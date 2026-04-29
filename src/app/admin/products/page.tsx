import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus, Search, Edit, Trash2, Filter, MoreHorizontal, Download, ArrowUpDown, PackageOpen, AlertTriangle, TrendingUp, CheckSquare, Image as ImageIcon } from "lucide-react";
import { getAdminProducts } from "@/lib/queries";
import { deleteProductAction } from "../actions";

export default async function AdminProductsPage() {
  let products: Awaited<ReturnType<typeof getAdminProducts>> = [];

  try {
    products = await getAdminProducts();
  } catch (error) {
    console.error("Failed to fetch products:", error);
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR',
      minimumFractionDigits: 2
    }).format(amount);
  };

  const metrics = {
    total: products.length,
    active: products.filter(p => p.is_active).length,
    lowStock: products.filter(p => p.stock > 0 && p.stock <= 10).length,
    outOfStock: products.filter(p => p.stock === 0).length,
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold font-heading text-gray-900 tracking-tight">Products Catalog</h1>
          <p className="text-gray-500 text-sm mt-1">Manage your store's inventory, pricing, and categories.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2 rounded-lg border-gray-200 text-gray-700 hover:bg-gray-50 shadow-sm h-10">
            <Download className="w-4 h-4" />
            Export CSV
          </Button>
          <Link href="/admin/products/create">
            <Button className="bg-furnco-purple hover:bg-furnco-purple/90 gap-2 rounded-lg shadow-md shadow-furnco-purple/20 h-10">
              <Plus className="w-4 h-4" />
              Add New Product
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-gray-200 p-5 rounded-xl shadow-sm flex items-center gap-4 hover:border-furnco-purple/30 transition-colors">
          <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
            <PackageOpen className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Total Products</p>
            <h3 className="text-2xl font-bold font-heading text-gray-900">{metrics.total}</h3>
          </div>
        </div>
        <div className="bg-white border border-gray-200 p-5 rounded-xl shadow-sm flex items-center gap-4 hover:border-furnco-purple/30 transition-colors">
          <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0">
            <CheckSquare className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Active on Store</p>
            <h3 className="text-2xl font-bold font-heading text-gray-900">{metrics.active}</h3>
          </div>
        </div>
        <div className="bg-white border border-gray-200 p-5 rounded-xl shadow-sm flex items-center gap-4 hover:border-furnco-purple/30 transition-colors">
          <div className="w-12 h-12 rounded-lg bg-amber-100 flex items-center justify-center flex-shrink-0">
            <AlertTriangle className="w-6 h-6 text-amber-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Low Stock Alert</p>
            <h3 className="text-2xl font-bold font-heading text-gray-900">{metrics.lowStock}</h3>
          </div>
        </div>
        <div className="bg-white border border-gray-200 p-5 rounded-xl shadow-sm flex items-center gap-4 hover:border-furnco-purple/30 transition-colors">
          <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
            <TrendingUp className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Out of Stock</p>
            <h3 className="text-2xl font-bold font-heading text-gray-900">{metrics.outOfStock}</h3>
          </div>
        </div>
      </div>

      <div className="bg-white p-2 border border-gray-200 rounded-xl shadow-sm flex flex-col sm:flex-row gap-2 items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search by product name, SKU, or tag..."
            className="w-full pl-9 pr-4 py-2 bg-gray-50/50 border-transparent focus:bg-white rounded-lg text-sm focus:ring-2 focus:ring-furnco-purple/20 focus:border-furnco-purple transition-all outline-none"
          />
        </div>
        <div className="h-8 w-px bg-gray-200 hidden sm:block mx-1"></div>
        <div className="flex gap-2 w-full sm:w-auto">
          <div className="relative group">
            <select className="appearance-none bg-white border border-gray-200 rounded-lg pl-4 pr-10 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-furnco-purple/20 focus:border-furnco-purple outline-none cursor-pointer w-full">
              <option>All Categories</option>
              <option>Bedroom</option>
              <option>Kitchen</option>
              <option>Lounge</option>
              <option>Appliances</option>
            </select>
            <Filter className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
          <div className="relative group">
            <select className="appearance-none bg-white border border-gray-200 rounded-lg pl-4 pr-10 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-furnco-purple/20 focus:border-furnco-purple outline-none cursor-pointer w-full">
              <option>All Statuses</option>
              <option>Active</option>
              <option>Draft</option>
              <option>Out of Stock</option>
            </select>
            <Filter className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
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
                  <div className="flex items-center gap-2 cursor-pointer hover:text-furnco-purple">Product <ArrowUpDown className="w-3 h-3" /></div>
                </th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">
                  <div className="flex items-center gap-2 cursor-pointer hover:text-furnco-purple">Inventory <ArrowUpDown className="w-3 h-3" /></div>
                </th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">
                  <div className="flex items-center gap-2 cursor-pointer hover:text-furnco-purple">Price <ArrowUpDown className="w-3 h-3" /></div>
                </th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {products.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                    No products found. Add your first product to get started.
                  </td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="px-6 py-4">
                      <input type="checkbox" className="rounded border-gray-300 text-furnco-purple focus:ring-furnco-purple/30 w-4 h-4 cursor-pointer" />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        {product.image_url ? (
                          <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-xs text-gray-400 flex-shrink-0 border border-gray-200 overflow-hidden">
                            <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
                          </div>
                        ) : (
                          <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-xs text-gray-400 flex-shrink-0 border border-gray-200 overflow-hidden relative">
                            <ImageIcon className="w-5 h-5 text-gray-400" />
                          </div>
                        )}
                        <div>
                          <p className="font-bold text-gray-900 group-hover:text-furnco-purple transition-colors cursor-pointer">{product.name}</p>
                          <p className="text-gray-500 text-xs font-mono mt-0.5">SKU: {product.slug.toUpperCase().slice(0, 8)}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {product.is_active ? (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-green-50 text-green-700 border border-green-200 shadow-sm">
                          <div className="w-1.5 h-1.5 rounded-full bg-green-500 mr-1.5"></div>
                          Active
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-gray-100 text-gray-600 border border-gray-200 shadow-sm">
                          <div className="w-1.5 h-1.5 rounded-full bg-gray-400 mr-1.5"></div>
                          Draft
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {product.stock === 0 ? (
                          <>
                            <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                              <div className="bg-red-500 h-full w-0 rounded-full"></div>
                            </div>
                            <span className="text-red-500 font-bold">0</span>
                          </>
                        ) : product.stock <= 10 ? (
                          <>
                            <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                              <div className="bg-amber-500 h-full w-[40%] rounded-full"></div>
                            </div>
                            <span className="text-amber-600 font-bold">{product.stock}</span>
                          </>
                        ) : (
                          <>
                            <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                              <div className="bg-green-500 h-full w-[80%] rounded-full"></div>
                            </div>
                            <span className="text-gray-600 font-medium">{product.stock}</span>
                          </>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="bg-gray-100 text-gray-600 px-2.5 py-1 rounded-md text-xs font-medium border border-gray-200">
                        {product.category?.name || 'Uncategorized'}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-bold text-gray-900">{formatCurrency(product.price)}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Link href={`/admin/products/${product.id}/edit`}>
                          <button className="p-1.5 text-gray-400 hover:text-furnco-purple rounded-md hover:bg-furnco-purple/10 transition-colors" title="Edit">
                            <Edit className="w-4 h-4" />
                          </button>
                        </Link>
                        <form action={async () => {
                          'use server';
                          await deleteProductAction(product.id);
                        }}>
                          <button type="submit" className="p-1.5 text-gray-400 hover:text-red-600 rounded-md hover:bg-red-50 transition-colors" title="Delete">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </form>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-gray-200 bg-gray-50/50 flex items-center justify-between text-sm">
          <div className="text-gray-500 font-medium">
            Showing <span className="text-gray-900 font-bold">1</span> to <span className="text-gray-900 font-bold">{products.length}</span> of <span className="text-gray-900 font-bold">{products.length}</span> results
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled className="border-gray-200 rounded-lg">Previous</Button>
            <Button variant="outline" size="sm" className="border-gray-200 rounded-lg bg-white hover:bg-gray-50">Next</Button>
          </div>
        </div>
      </div>
    </div>
  );
}