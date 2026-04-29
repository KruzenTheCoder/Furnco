import Image from "next/link";
import { CheckCircle2, ShieldCheck, Truck } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-5xl mx-auto space-y-16">
        
        {/* Hero Section */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">About Furnco</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your trusted South African destination for high-quality furniture and reliable home appliances since 2010.
          </p>
        </div>

        {/* Story Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center bg-white p-8 rounded-sm shadow-sm border">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-furnco-purple">Our Story</h2>
            <p className="text-gray-600 leading-relaxed">
              Founded with a simple mission: to bring comfortable, stylish, and affordable furniture to every South African home. What started as a small showroom has grown into a leading nationwide retailer, serving thousands of happy customers.
            </p>
            <p className="text-gray-600 leading-relaxed">
              We carefully curate our collections, partnering with top brands like Defy and KIC, alongside our own signature furniture lines, to ensure you get the best value for your Rand.
            </p>
          </div>
          <div className="bg-gray-200 h-64 md:h-full min-h-[300px] rounded-sm flex items-center justify-center text-gray-400 border-2 border-dashed border-gray-300">
            [ Company Image Placeholder ]
          </div>
        </div>

        {/* Values Section */}
        <div>
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">Why Choose Us?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            
            <div className="bg-white p-6 rounded-sm shadow-sm border text-center space-y-4 hover:-translate-y-1 transition-transform">
              <div className="w-16 h-16 bg-furnco-purple/10 rounded-full flex items-center justify-center mx-auto text-furnco-purple">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-800">Quality Guaranteed</h3>
              <p className="text-gray-600">Every piece of furniture and appliance is thoroughly vetted to meet our high durability standards.</p>
            </div>

            <div className="bg-white p-6 rounded-sm shadow-sm border text-center space-y-4 hover:-translate-y-1 transition-transform">
              <div className="w-16 h-16 bg-furnco-orange/10 rounded-full flex items-center justify-center mx-auto text-furnco-orange">
                <Truck className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-800">Nationwide Delivery</h3>
              <p className="text-gray-600">Fast and reliable delivery to your doorstep, anywhere in South Africa, handled with care.</p>
            </div>

            <div className="bg-white p-6 rounded-sm shadow-sm border text-center space-y-4 hover:-translate-y-1 transition-transform">
              <div className="w-16 h-16 bg-furnco-purple/10 rounded-full flex items-center justify-center mx-auto text-furnco-purple">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-800">Secure Shopping</h3>
              <p className="text-gray-600">Shop with peace of mind knowing your data and payments are protected by enterprise-grade security.</p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}