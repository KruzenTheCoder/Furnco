import { ProductCard } from "@/components/ui/ProductCard";
import { getNewProducts } from "@/lib/queries";
import type { ProductWithCategory } from "@/lib/database.types";

export default async function NewArrivalsPage() {
  let products: ProductWithCategory[] = [];

  try {
    products = await getNewProducts();
  } catch (error: any) {
    console.error("Failed to fetch new arrivals:", error?.message || error);
    console.error("Error details:", JSON.stringify(error, null, 2));
  }

  const formatCurrency = (amount: number) => new Intl.NumberFormat('en-ZA', { style: 'currency', currency: 'ZAR' }).format(amount);

  return (
    <div className="min-h-screen">
      <div className="bg-gray-900 py-12 px-6 text-center text-white">
        <h1 className="text-4xl font-extrabold mb-4 text-furnco-orange">New Arrivals</h1>
        <p className="text-lg opacity-90 max-w-2xl mx-auto">Discover the latest furniture and appliances added to our collection. Be the first to bring these fresh styles into your home.</p>
      </div>

      <div className="p-6 max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8 mt-4 border-b pb-2">
          <h2 className="text-2xl font-bold text-gray-800">Just In</h2>
          <span className="text-sm text-gray-500">Showing newest items first</span>
        </div>
        
        {products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No new arrivals at the moment. Check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard 
                key={product.id}
                title={product.name} 
                price={formatCurrency(product.price)} 
                imageUrl={product.image_url}
                isNew={true}
                isTake2={product.is_take2}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}