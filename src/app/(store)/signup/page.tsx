import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function SignUpPage() {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 bg-gray-50 min-h-[calc(100vh-300px)]">
      <div className="w-full max-w-md bg-white p-8 rounded-sm shadow-sm border">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Create Account</h1>
        
        <form className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
              <input type="text" className="w-full border border-gray-300 rounded-sm px-3 py-2 focus:ring-furnco-purple focus:border-furnco-purple" placeholder="John" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
              <input type="text" className="w-full border border-gray-300 rounded-sm px-3 py-2 focus:ring-furnco-purple focus:border-furnco-purple" placeholder="Doe" />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input type="email" className="w-full border border-gray-300 rounded-sm px-3 py-2 focus:ring-furnco-purple focus:border-furnco-purple" placeholder="john@example.com" />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Create Password</label>
            <input type="password" className="w-full border border-gray-300 rounded-sm px-3 py-2 focus:ring-furnco-purple focus:border-furnco-purple" placeholder="••••••••" />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
            <input type="password" className="w-full border border-gray-300 rounded-sm px-3 py-2 focus:ring-furnco-purple focus:border-furnco-purple" placeholder="••••••••" />
          </div>
          
          <div className="flex items-start gap-2 pt-2">
            <input type="checkbox" id="subscribe" className="mt-1 rounded border-gray-300 text-furnco-purple focus:ring-furnco-purple" />
            <label htmlFor="subscribe" className="text-sm text-gray-600">
              Subscribe to newsletter for deals and updates
            </label>
          </div>
          
          <Button type="submit" className="w-full bg-furnco-purple hover:bg-furnco-purple/90 rounded-sm mt-4">
            Create Account
          </Button>
        </form>
        
        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account? <Link href="/login" className="text-furnco-orange hover:underline font-semibold">Log in</Link>
        </p>
      </div>
    </div>
  );
}