"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LogIn } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;
    setIsLoading(true);
    
    // Simulate auth check
    setTimeout(() => {
      // Intentionally not setting isLoading to false here to prevent flicker before redirect
      // Role-based redirect logic (Simulated for mockup)
      if (email === "admin@furnco.com" && password === "Admin@123!!!") {
        document.cookie = "mock_admin_session=true; path=/";
        router.push("/admin/products");
      } else {
        document.cookie = "mock_client_session=true; path=/";
        router.push("/account");
      }
    }, 1500);
  };

  const loginAsAdmin = () => {
    setEmail("admin@furnco.com");
    setPassword("Admin@123!!!");
  };

  const loginAsCustomer = () => {
    setEmail("customer@example.com");
    setPassword("password123");
  };

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 bg-gray-50 min-h-[calc(100vh-300px)]">
      <div className="w-full max-w-md bg-white p-8 rounded-sm shadow-sm border relative overflow-hidden">
        
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-2">Welcome Back</h1>
        <p className="text-sm text-gray-500 text-center mb-6">Sign in to your Furnco account</p>
        
        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-sm px-3 py-2 focus:ring-furnco-purple focus:border-furnco-purple" 
              placeholder="name@example.com" 
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex justify-between">
              Password
              <Link href="/forgot-password" className="text-xs text-furnco-orange hover:underline font-semibold">Forgot Password?</Link>
            </label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-sm px-3 py-2 focus:ring-furnco-purple focus:border-furnco-purple" 
              placeholder="••••••••" 
            />
          </div>
          
          <Button 
            type="submit" 
            disabled={isLoading} 
            className={`w-full rounded-sm mt-4 py-6 text-md transition-all duration-300 ${
              isLoading 
                ? "bg-gray-400 text-gray-200 cursor-not-allowed opacity-70" 
                : "bg-furnco-purple hover:bg-furnco-purple/90 text-white"
            }`}
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Logging In...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <LogIn className="w-5 h-5" /> Sign In
              </span>
            )}
          </Button>
        </form>
        
        <div className="mt-8 pt-6 border-t border-gray-100">
          <p className="text-xs text-center text-gray-500 mb-4 uppercase tracking-wider font-semibold">Demo Accounts</p>
          <div className="flex gap-3 justify-center">
            <Button variant="outline" size="sm" onClick={loginAsCustomer} className="text-xs">
              Fill Customer
            </Button>
            <Button variant="outline" size="sm" onClick={loginAsAdmin} className="text-xs border-furnco-purple/30 text-furnco-purple hover:bg-furnco-purple/5">
              Fill Admin
            </Button>
          </div>
          <p className="text-[10px] text-center text-gray-400 mt-4 leading-tight">
            * Note: In a real app, the Supabase Auth session checks your `profiles.role` to determine access to the Admin Dashboard vs Client Account. Try "Fill Admin" to see the redirect logic in action!
          </p>
        </div>

        <p className="text-center text-sm text-gray-600 mt-6">
          Don't have an account? <Link href="/signup" className="text-furnco-orange hover:underline font-semibold">Sign up</Link>
        </p>
      </div>
    </div>
  );
}