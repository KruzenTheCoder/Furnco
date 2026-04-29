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
        <div className="bg-gradient-to-r from-furnco-orange to-amber-500 text-white text-center py-2.5 font-bold text-sm shadow-sm">
          {promoBanner.title} - {promoBanner.subtitle}
        </div>
      )}

      <section className="relative min-h-[520px] w-full overflow-hidden bg-furnco-purple group">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-furnco-purple via-furnco-purple/95 to-furnco-purple/70 z-10"></div>
          <img 
            src={heroImage} 
            alt="Hero background" 
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out" 
          />
        </div>
        
        <div className="relative z-20 min-h-[520px] flex items-center">
          <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
            <div className="max-w-2xl">
              <div className="inline-block mb-4 px-3 py-1 bg-furnco-orange/20 border border-furnco-orange/30 rounded-full">
                <span className="text-furnco-orange text-xs font-bold uppercase tracking-widest">Year End Sale 2024</span>
              </div>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tight leading-[0.9] mb-4">
                {heroHeadline}
                <span className="block text-furnco-orange mt-2">{heroCta}</span>
              </h1>
              <p className="text-white/90 text-lg md:text-xl font-medium tracking-wide mb-8 max-w-lg">
                {heroSubheadline}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/deals" className="inline-flex items-center gap-2 bg-furnco-orange hover:bg-furnco-orange/90 text-white font-bold px-8 py-4 rounded-sm transition-all hover:scale-105 hover:shadow-xl">
                  Shop Now
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link href="/store" className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold px-8 py-4 rounded-sm backdrop-blur-sm border border-white/20 transition-all hover:scale-105">
                  Browse Catalog
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-furnco-bg/20 to-transparent z-10"></div>
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