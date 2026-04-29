import { ProductCard } from "@/components/ui/ProductCard";
import { getDealsProducts } from "@/lib/queries";
import type { ProductWithCategory } from "@/lib/database.types";

export default async function DealsPage() {
  let products: ProductWithCategory[] = [];

  try {
    products = await getDealsProducts();
  } catch (error: any) {
    console.error("Failed to fetch deals:", error?.message || error);
    console.error("Error details:", JSON.stringify(error, null, 2));
  }

  const formatCurrency = (amount: number) => new Intl.NumberFormat('en-ZA', { style: 'currency', currency: 'ZAR' }).format(amount);

  const take2Products = products.filter(p => p.is_take2);
  const newProducts = products.filter(p => p.is_new && !p.is_take2);

  return (
    <div className="min-h-screen">
      <div className="bg-furnco-orange py-12 px-6 text-center text-white">
        <h1 className="text-4xl font-extrabold mb-4">Current Deals & Promotions</h1>
        <p className="text-lg opacity-90 max-w-2xl mx-auto">Shop our latest deals on bedroom suites, kitchen schemes, and appliances. Hurry, offers valid while stocks last!</p>
      </div>

      <div className="p-6 max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-8 mt-4 border-b pb-2">Take 2 Combos</h2>
        {take2Products.length === 0 ? (
          <div className="text-center py-8 mb-12">
            <p className="text-gray-500">No Take 2 combos available at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {take2Products.map((product) => (
              <ProductCard 
                key={product.id}
                title={product.name} 
                price={formatCurrency(product.price)} 
                imageUrl={product.image_url}
                isNew={product.is_new}
                isTake2={true}
              />
            ))}
          </div>
        )}

        <h2 className="text-2xl font-bold text-gray-800 mb-8 border-b pb-2">New Arrivals</h2>
        {newProducts.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">No clearance items available at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {newProducts.map((product) => (
              <ProductCard 
                key={product.id}
                title={product.name} 
                price={formatCurrency(product.price)} 
                imageUrl={product.image_url}
                isNew={true}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}