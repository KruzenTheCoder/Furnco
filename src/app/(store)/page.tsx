import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ui/ProductCard";
import { ProductSlider } from "@/components/ui/ProductSlider";
import Link from "next/link";
import { getProducts, getNewProducts, getTake2Products, getPromoBanners, getCategories, getSiteContent } from "@/lib/queries";

export default async function HomePage() {
  let featuredProducts: Awaited<ReturnType<typeof getProducts>> = [];
  let newProducts: Awaited<ReturnType<typeof getNewProducts>> = [];
  let take2Products: Awaited<ReturnType<typeof getTake2Products>> = [];
  let categories: Awaited<ReturnType<typeof getCategories>> = [];
  let banners: Awaited<ReturnType<typeof getPromoBanners>> = [];
  let heroContent: any = null;

  try {
    featuredProducts = await getProducts();
    newProducts = await getNewProducts();
    take2Products = await getTake2Products();
    categories = await getCategories();
    banners = await getPromoBanners();
    
    const siteContent = await getSiteContent('hero');
    if (siteContent && siteContent.content) {
      heroContent = siteContent.content;
    }
  } catch (error: any) {
    console.error("Failed to fetch homepage data:", error.message || error);
    console.error("Error details:", JSON.stringify(error, null, 2));
  }

  const promoBanner = banners[0];
  const formatCurrency = (amount: number) => new Intl.NumberFormat('en-ZA', { style: 'currency', currency: 'ZAR' }).format(amount);

  const heroHeadline = heroContent?.headline || "YEAR END";
  const heroSubheadline = heroContent?.subheadline || "PRE-BOOK NEW YEAR DEALS";
  const heroCta = heroContent?.cta || "Sale";
  const heroImage = heroContent?.image_url || 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=2070&auto=format&fit=crop';

  return (
    <div className="space-y-12 pb-16" suppressHydrationWarning>
      {promoBanner && (
        <div className="bg-gradient-to-r from-furnco-orange to-amber-500 text-white text-center py-2 font-bold text-sm shadow-sm">
          {promoBanner.title} - {promoBanner.subtitle}
        </div>
      )}

      <section className="relative h-[400px] w-full overflow-hidden bg-furnco-purple rounded-sm group flex items-center">
        <div className="absolute inset-0 bg-gradient-to-r from-furnco-purple/90 to-transparent z-10 flex flex-col justify-center px-12 md:px-24">
          <div className="space-y-2">
            <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight leading-none drop-shadow-md">
              {heroHeadline}
              <span className="block text-furnco-orange font-script transform -rotate-2 mt-2">{heroCta}</span>
            </h1>
            <p className="text-white/90 text-lg md:text-xl font-medium tracking-wide mt-4 uppercase bg-furnco-purple/50 inline-block px-3 py-1 rounded-sm backdrop-blur-sm border border-white/10">
              {heroSubheadline}
            </p>
          </div>
        </div>
        <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-gray-200" style={{ backgroundImage: `url("${heroImage}")`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
      </section>

      <section className="px-4">
        <div className="flex justify-between items-end border-b pb-2 mb-6">
          <h2 className="text-2xl font-bold text-gray-800 tracking-tight">Featured Deals</h2>
          <Link href="/deals" className="text-sm font-semibold text-furnco-purple hover:underline flex items-center">View all</Link>
        </div>
        <ProductSlider>
          {take2Products.length > 0 ? (
            take2Products.slice(0, 5).map((product) => (
              <div key={product.id} className="min-w-[280px] snap-center">
                <ProductCard 
                  title={product.name} 
                  price={formatCurrency(product.price)} 
                  imageUrl={product.image_url}
                  isTake2={true} 
                />
              </div>
            ))
          ) : (
            <div className="min-w-[280px] snap-center">
              <ProductCard title="Comfort Bed Set" price="R1,499.00" isTake2={true} imagePlaceholder="Bed Image" />
            </div>
          )}
        </ProductSlider>
      </section>

      <section className="px-4">
        <div className="flex justify-between items-end border-b pb-2 mb-6">
          <h2 className="text-2xl font-bold text-gray-800 tracking-tight">New Items</h2>
          <Link href="/new" className="text-sm font-semibold text-furnco-purple hover:underline flex items-center">View all</Link>
        </div>
        <ProductSlider>
          {newProducts.length > 0 ? (
            newProducts.slice(0, 5).map((product) => (
              <div key={product.id} className="min-w-[280px] snap-center">
                <ProductCard 
                  title={product.name} 
                  price={formatCurrency(product.price)} 
                  imageUrl={product.image_url}
                  isNew={true} 
                />
              </div>
            ))
          ) : (
            <>
              <div className="min-w-[280px] snap-center">
                <ProductCard title="Oak Wardrobe" price="R1,399.00" isNew={true} imagePlaceholder="Wardrobe" />
              </div>
            </>
          )}
        </ProductSlider>
      </section>

      <section className="px-4">
        <div className="border-b pb-2 mb-6">
          <h2 className="text-2xl font-bold text-gray-800 tracking-tight">Shop by Category</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          {categories.length > 0 ? (
            categories.map((cat) => (
              <Link key={cat.id} href={`/store?category=${cat.slug}`} className="flex flex-col items-center gap-3 p-4 bg-gray-50 rounded-sm hover:bg-furnco-purple/5 transition-colors group border border-transparent hover:border-furnco-purple/20 cursor-pointer">
                <div className="w-20 h-20 bg-white rounded-sm shadow-sm flex items-center justify-center text-3xl group-hover:scale-105 transition-transform">
                  {cat.name.charAt(0)}
                </div>
                <span className="font-semibold text-sm text-gray-700">{cat.name}</span>
              </Link>
            ))
          ) : (
            [
              { name: "Beds", icon: "🛏️" },
              { name: "Wardrobes", icon: "🚪" },
              { name: "Lounge", icon: "🛋️" },
              { name: "Kitchen", icon: "🍽️" },
              { name: "Office", icon: "🪑" },
              { name: "Appliances", icon: "🧊" }
            ].map((cat, i) => (
              <Link key={i} href={`/store?category=${cat.name.toLowerCase()}`} className="flex flex-col items-center gap-3 p-4 bg-gray-50 rounded-sm hover:bg-furnco-purple/5 transition-colors group border border-transparent hover:border-furnco-purple/20 cursor-pointer">
                <div className="w-20 h-20 bg-white rounded-sm shadow-sm flex items-center justify-center text-3xl group-hover:scale-105 transition-transform">
                  {cat.icon}
                </div>
                <span className="font-semibold text-sm text-gray-700">{cat.name}</span>
              </Link>
            ))
          )}
        </div>
      </section>

      <section className="px-4">
        <div className="border-b pb-2 mb-6">
          <h2 className="text-2xl font-bold text-gray-800 tracking-tight">Take 2 Combo</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {take2Products.length > 0 ? (
            take2Products.slice(0, 4).map((product) => (
              <ProductCard 
                key={product.id}
                title={product.name} 
                price={formatCurrency(product.price)} 
                imageUrl={product.image_url}
                isTake2={true} 
              />
            ))
          ) : (
            <>
              <ProductCard title="Bedroom Combo" price="R1,995.00" isTake2={true} imagePlaceholder="Bed & Wardrobe" />
              <ProductCard title="Lounge Combo" price="R2,759.00" isTake2={true} imagePlaceholder="Sofa & TV Stand" />
              <ProductCard title="Kitchen Combo" price="R5,950.00" isTake2={true} imagePlaceholder="Fridge & Stove" />
              <ProductCard title="Appliance Combo" price="R4,250.00" isTake2={true} imagePlaceholder="Fridge & Microwave" />
            </>
          )}
        </div>
      </section>
    </div>
  );
}