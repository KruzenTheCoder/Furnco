import { ProductCard } from "@/components/ui/ProductCard";
import { getProducts, getCategories } from "@/lib/queries";
import type { ProductWithCategory, Category } from "@/lib/database.types";

export default async function StorePage() {
  let products: ProductWithCategory[] = [];
  let categories: Category[] = [];

  try {
    products = await getProducts();
    categories = await getCategories();
  } catch (error: any) {
    console.error("Failed to fetch store data:", error?.message || error);
    console.error("Error details:", JSON.stringify(error, null, 2));
  }

  const formatCurrency = (amount: number) => new Intl.NumberFormat('en-ZA', { style: 'currency', currency: 'ZAR' }).format(amount);

  return (
    <div className="flex flex-col gap-6 p-4 md:p-8 min-h-screen max-w-7xl mx-auto">
      <div className="w-full bg-gradient-to-r from-furnco-purple to-purple-900 rounded-2xl p-6 md:p-10 text-white shadow-xl relative overflow-hidden group">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-all duration-700"></div>
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="inline-block px-3 py-1 bg-furnco-orange text-white text-xs font-bold rounded-full uppercase tracking-wider mb-2">Summer Sale</span>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Revamp Your Space</h2>
            <p className="text-purple-100 max-w-md text-sm md:text-base">Get up to 40% off on premium furniture. Transform your home with our exclusive collection today.</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8 mt-2">
        <aside className="w-full md:w-64 flex-shrink-0 space-y-8">
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wider flex items-center justify-between">
              Categories
            </h3>
            <div className="space-y-2">
              <div className="px-3 py-2 rounded-lg text-sm bg-furnco-purple text-white font-medium">
                All Products
              </div>
              {categories.map((cat) => (
                <div key={cat.id} className="px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-purple-50 hover:text-furnco-purple transition-colors cursor-pointer">
                  {cat.name}
                </div>
              ))}
            </div>
          </div>
        </aside>

        <div className="flex-1">
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-gray-800">All Products</h1>
              <span className="bg-purple-100 text-furnco-purple text-xs font-bold px-2.5 py-1 rounded-full">
                {products.length}
              </span>
            </div>
          </div>

          {products.length === 0 ? (
            <div className="bg-white rounded-xl border border-gray-100 p-12 text-center flex flex-col items-center justify-center">
              <div className="w-16 h-16 bg-purple-50 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">📦</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No products found</h3>
              <p className="text-gray-500 max-w-md">No products available at the moment. Check back soon!</p>
            </div>
          ) : (
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => (
                <ProductCard 
                  key={product.id}
                  title={product.name} 
                  price={formatCurrency(product.price)} 
                  imageUrl={product.image_url}
                  isNew={product.is_new} 
                  isTake2={product.is_take2}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}