import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Store, CreditCard, Truck, Receipt, BellRing, ShieldCheck, Save } from "lucide-react";

export default function AdminSettingsPage() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold font-heading text-gray-900 tracking-tight">Settings</h1>
          <p className="text-gray-500 text-sm mt-1">Manage your store preferences and configurations.</p>
        </div>
        <Button className="bg-furnco-purple hover:bg-furnco-purple/90 gap-2 rounded-lg shadow-md shadow-furnco-purple/20 h-10">
          <Save className="w-4 h-4" />
          Save All Changes
        </Button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* Left Column (Main Settings) */}
        <div className="xl:col-span-2 space-y-8">
          
          {/* General Details */}
          <Card className="rounded-xl shadow-sm border-gray-200 overflow-hidden">
            <CardHeader className="bg-gray-50/50 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-blue-100 rounded-md">
                  <Store className="w-5 h-5 text-blue-600" />
                </div>
                <CardTitle className="text-lg">General Details</CardTitle>
              </div>
              <CardDescription className="text-sm mt-1">The name and contact info displayed to your customers.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5 pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2.5">
                  <Label htmlFor="storeName" className="text-gray-700">Store Name</Label>
                  <Input id="storeName" defaultValue="Furnco Furniture & Appliances" className="rounded-lg border-gray-200 focus-visible:ring-furnco-purple shadow-sm h-10" />
                </div>
                <div className="space-y-2.5">
                  <Label htmlFor="storeEmail" className="text-gray-700">Contact Email</Label>
                  <Input id="storeEmail" type="email" defaultValue="info@furnco.co.za" className="rounded-lg border-gray-200 focus-visible:ring-furnco-purple shadow-sm h-10" />
                </div>
                <div className="space-y-2.5">
                  <Label htmlFor="storePhone" className="text-gray-700">Support Phone</Label>
                  <Input id="storePhone" type="tel" defaultValue="+27 11 123 4567" className="rounded-lg border-gray-200 focus-visible:ring-furnco-purple shadow-sm h-10" />
                </div>
                <div className="space-y-2.5">
                  <Label htmlFor="storeCurrency" className="text-gray-700">Default Currency</Label>
                  <select id="storeCurrency" className="w-full h-10 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-furnco-purple/20 focus:border-furnco-purple shadow-sm bg-white appearance-none">
                    <option value="ZAR">ZAR (South African Rand)</option>
                    <option value="USD">USD (US Dollar)</option>
                    <option value="EUR">EUR (Euro)</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Providers */}
          <Card className="rounded-xl shadow-sm border-gray-200 overflow-hidden">
            <CardHeader className="bg-gray-50/50 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-green-100 rounded-md">
                    <CreditCard className="w-5 h-5 text-green-600" />
                  </div>
                  <CardTitle className="text-lg">Payment Providers</CardTitle>
                </div>
                <div className="flex items-center gap-2 bg-white px-2.5 py-1 rounded-full border shadow-sm">
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Stripe Active</span>
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                </div>
              </div>
              <CardDescription className="text-sm mt-1">Configure how your store accepts payments.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5 pt-6">
              <div className="p-5 border border-gray-200 rounded-xl bg-white shadow-sm hover:border-furnco-purple/30 transition-colors">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center font-bold text-indigo-600 text-xl tracking-tighter">S</div>
                    <div>
                      <h4 className="font-semibold font-heading text-gray-900">Stripe</h4>
                      <p className="text-xs text-gray-500">Credit cards, Apple Pay, Google Pay</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="rounded-lg text-xs h-8 border-gray-200">Manage</Button>
                </div>
                <div className="space-y-3 pt-4 border-t border-gray-100">
                  <div className="space-y-2">
                    <Label htmlFor="stripeKey" className="text-xs text-gray-500">Publishable Key</Label>
                    <Input id="stripeKey" type="password" defaultValue="pk_test_51xxxxxxxxxxxxxxxxxxxxx" className="rounded-lg border-gray-200 focus-visible:ring-furnco-purple shadow-sm h-9 text-sm font-mono bg-gray-50" readOnly />
                  </div>
                </div>
              </div>

              <div className="p-5 border border-gray-200 rounded-xl bg-white shadow-sm hover:border-furnco-purple/30 transition-colors opacity-70 grayscale">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center font-bold text-blue-600 text-lg">P</div>
                    <div>
                      <h4 className="font-semibold font-heading text-gray-900">PayFast</h4>
                      <p className="text-xs text-gray-500">Local South African payments</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="rounded-lg text-xs h-8 border-gray-200">Connect</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Shipping & Delivery */}
          <Card className="rounded-xl shadow-sm border-gray-200 overflow-hidden">
            <CardHeader className="bg-gray-50/50 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-orange-100 rounded-md">
                  <Truck className="w-5 h-5 text-furnco-orange" />
                </div>
                <CardTitle className="text-lg">Shipping & Delivery</CardTitle>
              </div>
              <CardDescription className="text-sm mt-1">Manage shipping zones and rates.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5 pt-6">
              <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                <table className="w-full text-sm text-left">
                  <thead className="bg-gray-50 border-b border-gray-200 text-xs text-gray-500 uppercase">
                    <tr>
                      <th className="px-4 py-3 font-medium">Zone Name</th>
                      <th className="px-4 py-3 font-medium">Regions</th>
                      <th className="px-4 py-3 font-medium">Rate</th>
                      <th className="px-4 py-3 text-right font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    <tr className="bg-white hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 font-medium text-gray-900">Gauteng (Local)</td>
                      <td className="px-4 py-3 text-gray-500">Gauteng Province</td>
                      <td className="px-4 py-3 text-gray-900">R 250.00</td>
                      <td className="px-4 py-3 text-right">
                        <button className="text-furnco-purple hover:underline text-xs font-medium">Edit</button>
                      </td>
                    </tr>
                    <tr className="bg-white hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 font-medium text-gray-900">National (Standard)</td>
                      <td className="px-4 py-3 text-gray-500">Rest of South Africa</td>
                      <td className="px-4 py-3 text-gray-900">R 600.00</td>
                      <td className="px-4 py-3 text-right">
                        <button className="text-furnco-purple hover:underline text-xs font-medium">Edit</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <Button variant="outline" className="w-full border-dashed border-2 border-gray-300 text-gray-600 hover:border-furnco-purple hover:text-furnco-purple rounded-xl h-12">
                + Add Shipping Zone
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Right Column (Secondary Settings) */}
        <div className="space-y-8">
          
          {/* Taxes */}
          <Card className="rounded-xl shadow-sm border-gray-200 overflow-hidden">
            <CardHeader className="bg-gray-50/50 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-gray-200 rounded-md">
                  <Receipt className="w-5 h-5 text-gray-700" />
                </div>
                <CardTitle className="text-lg">Taxes</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-5 pt-6">
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl bg-white shadow-sm">
                <div>
                  <h4 className="font-semibold font-heading text-gray-900 text-sm">Charge VAT</h4>
                  <p className="text-xs text-gray-500 mt-0.5">Apply 15% VAT on all products</p>
                </div>
                <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                  <input type="checkbox" name="toggle" id="toggle1" defaultChecked className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer border-furnco-purple" style={{ right: 0, borderColor: '#6B1953' }}/>
                  <label htmlFor="toggle1" className="toggle-label block overflow-hidden h-5 rounded-full bg-furnco-purple cursor-pointer"></label>
                </div>
              </div>
              <div className="space-y-2.5">
                <Label htmlFor="taxId" className="text-gray-700 text-sm">VAT Registration Number</Label>
                <Input id="taxId" defaultValue="ZA123456789" className="rounded-lg border-gray-200 focus-visible:ring-furnco-purple shadow-sm h-10 font-mono text-sm" />
              </div>
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card className="rounded-xl shadow-sm border-gray-200 overflow-hidden">
            <CardHeader className="bg-gray-50/50 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-yellow-100 rounded-md">
                  <BellRing className="w-5 h-5 text-yellow-600" />
                </div>
                <CardTitle className="text-lg">Notifications</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <div className="flex items-center gap-3">
                <input type="checkbox" id="notif1" defaultChecked className="w-4 h-4 text-furnco-purple border-gray-300 rounded focus:ring-furnco-purple" />
                <Label htmlFor="notif1" className="font-normal text-gray-700 cursor-pointer">New order emails</Label>
              </div>
              <div className="flex items-center gap-3">
                <input type="checkbox" id="notif2" defaultChecked className="w-4 h-4 text-furnco-purple border-gray-300 rounded focus:ring-furnco-purple" />
                <Label htmlFor="notif2" className="font-normal text-gray-700 cursor-pointer">Low inventory alerts</Label>
              </div>
              <div className="flex items-center gap-3">
                <input type="checkbox" id="notif3" className="w-4 h-4 text-furnco-purple border-gray-300 rounded focus:ring-furnco-purple" />
                <Label htmlFor="notif3" className="font-normal text-gray-700 cursor-pointer">Daily sales summary</Label>
              </div>
            </CardContent>
          </Card>

          {/* Security */}
          <Card className="rounded-xl shadow-sm border-gray-200 overflow-hidden border-red-100">
            <CardHeader className="bg-red-50/30 border-b border-red-50">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-red-100 rounded-md">
                  <ShieldCheck className="w-5 h-5 text-red-600" />
                </div>
                <CardTitle className="text-lg text-red-900">Security</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-5 pt-6">
              <Button variant="outline" className="w-full text-gray-700 border-gray-200 hover:bg-gray-50 rounded-lg h-10">
                Change Admin Password
              </Button>
              <Button variant="outline" className="w-full text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700 hover:border-red-300 rounded-lg h-10">
                Enable Two-Factor Auth (2FA)
              </Button>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
}
