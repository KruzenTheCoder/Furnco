"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Image as ImageIcon, Megaphone, Info, Link as LinkIcon, FileText, Save, Eye, Palette, LayoutTemplate, MonitorSmartphone, GripVertical, Bold, Italic, List, Heading1, Code } from "lucide-react";

export default function AdminContentPage() {
  const [activeTab, setActiveTab] = useState<"homepage" | "pages" | "theme">("homepage");

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold font-heading text-gray-900 tracking-tight">Site Content</h1>
          <p className="text-gray-500 text-sm mt-1">Design and manage your storefront experience.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2 rounded-lg border-gray-200 text-gray-700 hover:bg-gray-50 shadow-sm h-10">
            <MonitorSmartphone className="w-4 h-4" />
            Live Preview
          </Button>
          <Button className="bg-furnco-purple hover:bg-furnco-purple/90 gap-2 rounded-lg shadow-md shadow-furnco-purple/20 h-10">
            <Save className="w-4 h-4" />
            Publish Changes
          </Button>
        </div>
      </div>

      {/* Custom Tabs */}
      <div className="flex items-center gap-1 border-b border-gray-200">
        <button 
          onClick={() => setActiveTab("homepage")}
          className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === "homepage" ? "border-furnco-purple text-furnco-purple" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"}`}
        >
          <LayoutTemplate className="w-4 h-4" />
          Homepage Layout
        </button>
        <button 
          onClick={() => setActiveTab("pages")}
          className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === "pages" ? "border-furnco-purple text-furnco-purple" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"}`}
        >
          <FileText className="w-4 h-4" />
          Static Pages
        </button>
        <button 
          onClick={() => setActiveTab("theme")}
          className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === "theme" ? "border-furnco-purple text-furnco-purple" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"}`}
        >
          <Palette className="w-4 h-4" />
          Theme & Footer
        </button>
      </div>
      
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_400px] gap-8">
        
        {/* Main Editor Column */}
        <div className="space-y-6">
          
          {activeTab === "homepage" && (
            <>
              {/* Promotional Banner */}
              <Card className="rounded-xl shadow-sm border-gray-200 overflow-hidden">
                <CardHeader className="bg-gray-50/50 border-b border-gray-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 bg-orange-100 rounded-md">
                        <Megaphone className="w-4 h-4 text-furnco-orange" />
                      </div>
                      <CardTitle className="text-base">Top Promotional Banner</CardTitle>
                    </div>
                    <div className="flex items-center gap-2 bg-white px-2.5 py-1 rounded-full border shadow-sm">
                      <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Active</span>
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-5 pt-6">
                  <div className="space-y-2.5">
                    <Label htmlFor="promoText" className="text-gray-700">Banner Text</Label>
                    <Input id="promoText" defaultValue="UP TO 50% OFF! - Starts 15 Jan until 15 Feb 2026" className="rounded-lg border-gray-200 focus-visible:ring-furnco-purple shadow-sm h-10" />
                  </div>
                  <div className="space-y-2.5">
                    <Label htmlFor="promoLink" className="text-gray-700">Banner Link <span className="text-gray-400 font-normal">(Optional)</span></Label>
                    <Input id="promoLink" defaultValue="/deals" className="rounded-lg border-gray-200 focus-visible:ring-furnco-purple shadow-sm h-10 font-mono text-sm" />
                  </div>
                </CardContent>
              </Card>

              {/* Hero Section */}
              <Card className="rounded-xl shadow-sm border-gray-200 overflow-hidden">
                <CardHeader className="bg-gray-50/50 border-b border-gray-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 bg-purple-100 rounded-md">
                        <ImageIcon className="w-4 h-4 text-furnco-purple" />
                      </div>
                      <CardTitle className="text-base">Hero Section</CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6 pt-6">
                  
                  {/* Image Upload Area */}
                  <div className="space-y-2.5">
                    <Label className="text-gray-700">Hero Background Image</Label>
                    <div className="p-8 border-2 border-dashed border-gray-200 rounded-xl text-center flex flex-col items-center justify-center gap-3 bg-gray-50/50 hover:bg-gray-50 transition-colors group cursor-pointer relative overflow-hidden">
                      <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center border border-gray-100 group-hover:scale-110 transition-transform">
                        <ImageIcon className="w-5 h-5 text-gray-400" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-700 font-medium">Click to upload or drag and drop</div>
                        <div className="text-xs text-gray-400 mt-1">SVG, PNG, JPG or GIF (max. 1920x800px)</div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2.5">
                    <Label htmlFor="heroHeadline" className="text-gray-700">Headline</Label>
                    <Input id="heroHeadline" defaultValue="Elevate Your Living Space" className="rounded-lg border-gray-200 focus-visible:ring-furnco-purple shadow-sm h-10 font-heading text-lg" />
                  </div>
                  <div className="space-y-2.5">
                    <Label htmlFor="heroSub" className="text-gray-700">Subheadline</Label>
                    <textarea 
                      id="heroSub" 
                      rows={3}
                      defaultValue="Discover premium furniture and appliances that transform your house into a dream home. Shop our exclusive 2026 collection today."
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-furnco-purple/20 focus:border-furnco-purple shadow-sm resize-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2.5">
                      <Label htmlFor="heroBtnText" className="text-gray-700">Primary Button Text</Label>
                      <Input id="heroBtnText" defaultValue="Shop the Sale" className="rounded-lg border-gray-200 focus-visible:ring-furnco-purple shadow-sm h-10" />
                    </div>
                    <div className="space-y-2.5">
                      <Label htmlFor="heroBtnLink" className="text-gray-700">Button Destination</Label>
                      <Input id="heroBtnLink" defaultValue="/deals" className="rounded-lg border-gray-200 focus-visible:ring-furnco-purple shadow-sm h-10 font-mono text-sm" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Manage Sections Drag & Drop */}
              <Card className="rounded-xl shadow-sm border-gray-200 overflow-hidden">
                <CardHeader className="bg-gray-50/50 border-b border-gray-100">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-green-100 rounded-md">
                      <LayoutTemplate className="w-4 h-4 text-green-600" />
                    </div>
                    <CardTitle className="text-base">Manage Sections</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3 pt-6">
                  {[
                    { id: 1, name: "Featured Deals Carousel", active: true },
                    { id: 2, name: "New Arrivals Grid", active: true },
                    { id: 3, name: "Shop by Category", active: true },
                    { id: 4, name: "Newsletter Signup", active: false },
                  ].map((section) => (
                    <div key={section.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg bg-white shadow-sm hover:border-furnco-purple/30 transition-colors group cursor-move">
                      <div className="flex items-center gap-3">
                        <GripVertical className="w-4 h-4 text-gray-300 group-hover:text-furnco-purple" />
                        <span className="text-sm font-medium text-gray-700">{section.name}</span>
                      </div>
                      <div className="relative inline-block w-8 mr-2 align-middle select-none transition duration-200 ease-in">
                        <input type="checkbox" name="toggle" id={`section-${section.id}`} defaultChecked={section.active} className="toggle-checkbox absolute block w-4 h-4 rounded-full bg-white border-4 appearance-none cursor-pointer border-furnco-purple" style={section.active ? { right: 0, borderColor: '#6B1953' } : { right: '1rem', borderColor: '#D1D5DB' }}/>
                        <label htmlFor={`section-${section.id}`} className={`toggle-label block overflow-hidden h-4 rounded-full cursor-pointer ${section.active ? 'bg-furnco-purple' : 'bg-gray-300'}`}></label>
                      </div>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full mt-4 border-dashed border-gray-300 text-gray-500 hover:text-furnco-purple hover:bg-furnco-purple/5">
                    + Add New Section
                  </Button>
                </CardContent>
              </Card>
            </>
          )}

          {activeTab === "pages" && (
            <Card className="rounded-xl shadow-sm border-gray-200 overflow-hidden">
              <CardHeader className="bg-gray-50/50 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-blue-100 rounded-md">
                    <FileText className="w-4 h-4 text-blue-600" />
                  </div>
                  <CardTitle className="text-base">About Us Page</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-5 pt-6">
                <div className="space-y-2.5">
                  <Label htmlFor="aboutTitle" className="text-gray-700">Page Title</Label>
                  <Input id="aboutTitle" defaultValue="Our Story" className="rounded-lg border-gray-200 focus-visible:ring-furnco-purple shadow-sm h-10 font-heading" />
                </div>
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="aboutContent" className="text-gray-700">Main Content</Label>
                    <span className="text-[10px] bg-gray-100 px-2 py-0.5 rounded text-gray-500 font-mono">Markdown Supported</span>
                  </div>
                  <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                    <div className="bg-gray-50 border-b border-gray-200 px-3 py-2 flex items-center gap-1">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded hover:bg-gray-200"><Bold className="w-4 h-4 text-gray-600" /></Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded hover:bg-gray-200"><Italic className="w-4 h-4 text-gray-600" /></Button>
                      <div className="w-px h-4 bg-gray-300 mx-1"></div>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded hover:bg-gray-200"><Heading1 className="w-4 h-4 text-gray-600" /></Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded hover:bg-gray-200"><List className="w-4 h-4 text-gray-600" /></Button>
                      <div className="w-px h-4 bg-gray-300 mx-1"></div>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded hover:bg-gray-200"><LinkIcon className="w-4 h-4 text-gray-600" /></Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded hover:bg-gray-200"><ImageIcon className="w-4 h-4 text-gray-600" /></Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded hover:bg-gray-200"><Code className="w-4 h-4 text-gray-600" /></Button>
                    </div>
                    <textarea 
                      id="aboutContent" 
                      rows={12}
                      defaultValue="# Welcome to Furnco\n\nFurnco Furniture & Appliances has been South Africa's premier destination for high-quality home furnishings since our founding.\n\n## Our Mission\n\nOur mission is to provide exceptional value, outstanding customer service, and pieces that bring joy to your everyday life."
                      className="w-full border-0 px-4 py-3 text-sm focus:outline-none focus:ring-0 font-mono leading-relaxed bg-white resize-none"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === "theme" && (
            <Card className="rounded-xl shadow-sm border-gray-200 overflow-hidden">
              <CardHeader className="bg-gray-50/50 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-indigo-100 rounded-md">
                    <Info className="w-4 h-4 text-indigo-600" />
                  </div>
                  <CardTitle className="text-base">Footer & Global Information</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-6 pt-6">
                <div className="space-y-2.5">
                  <Label htmlFor="footerDesc" className="text-gray-700">Short Footer Description</Label>
                  <textarea 
                    id="footerDesc" 
                    rows={3}
                    defaultValue="South Africa's trusted retailer for premium home furnishings and appliances."
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-furnco-purple/20 focus:border-furnco-purple shadow-sm resize-none"
                  />
                </div>
                
                <div className="pt-4 border-t border-gray-100">
                  <Label className="flex items-center gap-2 mb-4 text-gray-700">
                    <LinkIcon className="w-4 h-4" /> Social Media Links
                  </Label>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-24 text-sm font-medium text-gray-600">TikTok</div>
                      <Input defaultValue="https://tiktok.com/@furnco_za" className="flex-1 rounded-lg border-gray-200 focus-visible:ring-furnco-purple h-9 text-sm font-mono" />
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-24 text-sm font-medium text-gray-600">Instagram</div>
                      <Input defaultValue="https://instagram.com/furnco.za" className="flex-1 rounded-lg border-gray-200 focus-visible:ring-furnco-purple h-9 text-sm font-mono" />
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-24 text-sm font-medium text-gray-600">Facebook</div>
                      <Input defaultValue="https://facebook.com/furnco" className="flex-1 rounded-lg border-gray-200 focus-visible:ring-furnco-purple h-9 text-sm font-mono" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

        </div>

        {/* Right Preview Column */}
        <div className="hidden xl:block">
          <div className="sticky top-28 border border-gray-200 rounded-xl overflow-hidden shadow-xl shadow-gray-200/40 bg-white">
            <div className="bg-gray-100 border-b border-gray-200 px-4 py-2.5 flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
              </div>
              <div className="mx-auto bg-white px-24 py-1 rounded-md text-[10px] text-gray-400 font-mono shadow-sm">
                furnco.co.za
              </div>
            </div>
            <div className="h-[600px] bg-gray-50 flex flex-col relative">
              {/* Mockup Preview based on tab */}
              {activeTab === "homepage" && (
                <div className="w-full h-full opacity-80 pointer-events-none p-4 space-y-4">
                  <div className="w-full h-6 bg-furnco-purple/20 rounded"></div>
                  <div className="w-full h-48 bg-gray-200 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
                    <span className="text-gray-400 font-heading text-xl">Hero Area</span>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {[1,2,3,4].map(i => <div key={i} className="h-24 bg-gray-200 rounded"></div>)}
                  </div>
                </div>
              )}
              {activeTab === "pages" && (
                <div className="w-full h-full opacity-80 pointer-events-none p-6 space-y-4">
                  <div className="w-1/3 h-8 bg-gray-200 rounded"></div>
                  <div className="space-y-2">
                    <div className="w-full h-3 bg-gray-200 rounded"></div>
                    <div className="w-full h-3 bg-gray-200 rounded"></div>
                    <div className="w-5/6 h-3 bg-gray-200 rounded"></div>
                  </div>
                  <div className="w-1/4 h-6 bg-gray-200 rounded mt-6"></div>
                  <div className="space-y-2">
                    <div className="w-full h-3 bg-gray-200 rounded"></div>
                    <div className="w-4/5 h-3 bg-gray-200 rounded"></div>
                  </div>
                </div>
              )}
              {activeTab === "theme" && (
                <div className="w-full h-full opacity-80 pointer-events-none p-0 flex flex-col justify-end">
                  <div className="w-full h-40 bg-furnco-purple/10 border-t border-furnco-purple/20 p-6 grid grid-cols-4 gap-4">
                    <div className="space-y-2">
                      <div className="w-1/2 h-4 bg-furnco-purple/30 rounded"></div>
                      <div className="w-full h-2 bg-furnco-purple/20 rounded mt-4"></div>
                      <div className="w-5/6 h-2 bg-furnco-purple/20 rounded"></div>
                    </div>
                    <div className="col-span-3"></div>
                  </div>
                </div>
              )}
              
              <div className="absolute inset-0 flex items-center justify-center bg-white/40 backdrop-blur-[1px]">
                <div className="bg-white px-4 py-2 rounded-full shadow-lg border border-gray-100 flex items-center gap-2 text-xs font-semibold text-gray-600">
                  <Eye className="w-3.5 h-3.5" /> Live Preview Mockup
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}