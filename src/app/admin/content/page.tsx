"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Image as ImageIcon, Megaphone, Info, Link as LinkIcon, FileText, Save, Eye, Palette, LayoutTemplate, MonitorSmartphone, GripVertical, Bold, Italic, List, Heading1, Code, Plus, Trash2, ChevronUp, ChevronDown, X, Check, Image as ImageIcon2 } from "lucide-react";
import { updatePageSectionAction, reorderPageSectionsAction } from "@/app/admin/actions";

interface PageSection {
  id: string;
  page: string;
  section_key: string;
  title: string | null;
  content: any;
  image_url: string | null;
  link_url: string | null;
  link_text: string | null;
  sort_order: number;
  is_active: boolean;
}

export default function AdminContentPage() {
  const [activeTab, setActiveTab] = useState<"homepage" | "pages" | "theme">("homepage");
  const [sections, setSections] = useState<PageSection[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [draggedId, setDraggedId] = useState<string | null>(null);

  const fetchSections = useCallback(async () => {
    try {
      const res = await fetch('/api/page-sections?page=homepage');
      if (res.ok) {
        const data = await res.json();
        setSections(data);
      }
    } catch (error) {
      console.error('Failed to fetch sections:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (activeTab === "homepage") {
      fetchSections();
    }
  }, [activeTab, fetchSections]);

  const handleDragStart = (e: React.DragEvent, sectionId: string) => {
    setDraggedId(sectionId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = async (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    if (!draggedId || draggedId === targetId) return;

    const draggedIdx = sections.findIndex(s => s.id === draggedId);
    const targetIdx = sections.findIndex(s => s.id === targetId);

    if (draggedIdx === -1 || targetIdx === -1) return;

    const newSections = [...sections];
    const [draggedItem] = newSections.splice(draggedIdx, 1);
    newSections.splice(targetIdx, 0, draggedItem);

    setSections(newSections);
    setDraggedId(null);

    const orderedKeys = newSections.map(s => s.section_key);
    try {
      await reorderPageSectionsAction('homepage', orderedKeys);
    } catch (error) {
      console.error('Failed to reorder:', error);
      fetchSections();
    }
  };

  const handleSave = async (section: PageSection) => {
    setSaving(true);
    try {
      const formData = new FormData();
      formData.append('section_key', section.section_key);
      formData.append('page', section.page);
      formData.append('title', section.title || '');
      formData.append('content', JSON.stringify(section.content || {}));
      formData.append('image_url', section.image_url || '');
      formData.append('link_url', section.link_url || '');
      formData.append('link_text', section.link_text || '');
      formData.append('is_active', String(section.is_active));

      await updatePageSectionAction(formData);
      setEditingSection(null);
      fetchSections();
    } catch (error) {
      console.error('Failed to save:', error);
    } finally {
      setSaving(false);
    }
  };

  const getSectionIcon = (key: string) => {
    switch (key) {
      case 'promo_banner': return <Megaphone className="w-4 h-4 text-furnco-orange" />;
      case 'hero': return <ImageIcon2 className="w-4 h-4 text-furnco-purple" />;
      case 'featured_deals': return <LayoutTemplate className="w-4 h-4 text-green-600" />;
      case 'new_arrivals': return <LayoutTemplate className="w-4 h-4 text-blue-600" />;
      case 'categories': return <Info className="w-4 h-4 text-purple-600" />;
      case 'take2_combo': return <LayoutTemplate className="w-4 h-4 text-orange-600" />;
      case 'newsletter': return <FileText className="w-4 h-4 text-cyan-600" />;
      default: return <LayoutTemplate className="w-4 h-4 text-gray-400" />;
    }
  };

  const moveSection = async (index: number, direction: 'up' | 'down') => {
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= sections.length) return;

    const newSections = [...sections];
    [newSections[index], newSections[newIndex]] = [newSections[newIndex], newSections[index]];
    setSections(newSections);

    const orderedKeys = newSections.map(s => s.section_key);
    try {
      await reorderPageSectionsAction('homepage', orderedKeys);
    } catch (error) {
      fetchSections();
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold font-heading text-gray-900 tracking-tight">Page Builder</h1>
          <p className="text-gray-500 text-sm mt-1">Drag and drop to arrange homepage sections, click to edit content.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2 rounded-lg border-gray-200 text-gray-700 hover:bg-gray-50 shadow-sm h-10">
            <MonitorSmartphone className="w-4 h-4" />
            Preview
          </Button>
        </div>
      </div>

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

      {activeTab === "homepage" && (
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_380px] gap-8">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900">Section Order</h2>
              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                {sections.length} sections
              </span>
            </div>

            {loading ? (
              <div className="text-center py-12 text-gray-500">Loading sections...</div>
            ) : sections.length === 0 ? (
              <Card className="rounded-xl border-dashed border-2 border-gray-200">
                <CardContent className="py-12 text-center">
                  <LayoutTemplate className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">No sections found. Run the page builder SQL migration.</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-2">
                {sections.map((section, index) => (
                  <div
                    key={section.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, section.id)}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, section.id)}
                    className={`bg-white border rounded-xl shadow-sm transition-all cursor-move group ${
                      editingSection === section.section_key ? 'ring-2 ring-furnco-purple border-furnco-purple' : 'border-gray-200 hover:border-furnco-purple/40'
                    } ${draggedId === section.id ? 'opacity-50 scale-[0.98]' : ''}`}
                  >
                    <div className="flex items-center justify-between p-4">
                      <div className="flex items-center gap-3">
                        <GripVertical className="w-5 h-5 text-gray-300 group-hover:text-furnco-purple flex-shrink-0 cursor-grab" />
                        <div className="p-1.5 bg-gray-50 rounded-md">
                          {getSectionIcon(section.section_key)}
                        </div>
                        <div>
                          <p className="font-bold text-gray-900 text-sm">{section.title || section.section_key}</p>
                          <p className="text-xs text-gray-400 font-mono">{section.section_key}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => moveSection(index, 'up')}
                          disabled={index === 0}
                          className="p-1 text-gray-400 hover:text-gray-900 disabled:opacity-30"
                        >
                          <ChevronUp className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => moveSection(index, 'down')}
                          disabled={index === sections.length - 1}
                          className="p-1 text-gray-400 hover:text-gray-900 disabled:opacity-30"
                        >
                          <ChevronDown className="w-4 h-4" />
                        </button>
                        <div className={`w-8 h-4 rounded-full transition-colors ${section.is_active ? 'bg-green-500' : 'bg-gray-300'}`}>
                          <div className={`w-3 h-3 rounded-full bg-white shadow-sm transition-all mt-0.5 ${section.is_active ? 'ml-4' : 'ml-0.5'}`} />
                        </div>
                        <button
                          onClick={() => setEditingSection(editingSection === section.section_key ? null : section.section_key)}
                          className={`p-2 rounded-lg transition-colors ${editingSection === section.section_key ? 'bg-furnco-purple text-white' : 'text-gray-400 hover:bg-gray-100'}`}
                        >
                          {editingSection === section.section_key ? <X className="w-4 h-4" /> : <Info className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    {editingSection === section.section_key && (
                      <div className="border-t border-gray-100 p-4 bg-gray-50/50 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label className="text-gray-700 text-xs font-semibold uppercase tracking-wider">Title</Label>
                            <Input
                              value={section.title || ''}
                              onChange={(e) => setSections(sections.map(s => s.id === section.id ? { ...s, title: e.target.value } : s))}
                              className="rounded-lg border-gray-200 h-9"
                              placeholder="Section title"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-gray-700 text-xs font-semibold uppercase tracking-wider">Button Text</Label>
                            <Input
                              value={section.link_text || ''}
                              onChange={(e) => setSections(sections.map(s => s.id === section.id ? { ...s, link_text: e.target.value } : s))}
                              className="rounded-lg border-gray-200 h-9"
                              placeholder="e.g. Shop Now"
                            />
                          </div>
                        </div>

                        {section.section_key === 'hero' && (
                          <>
                            <div className="space-y-2">
                              <Label className="text-gray-700 text-xs font-semibold uppercase tracking-wider">Headline Text</Label>
                              <Input
                                value={section.content?.headline || ''}
                                onChange={(e) => setSections(sections.map(s => s.id === section.id ? { ...s, content: { ...s.content, headline: e.target.value } } : s))}
                                className="rounded-lg border-gray-200 h-9"
                                placeholder="YEAR END"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label className="text-gray-700 text-xs font-semibold uppercase tracking-wider">Subheadline Text</Label>
                              <Input
                                value={section.content?.subheadline || ''}
                                onChange={(e) => setSections(sections.map(s => s.id === section.id ? { ...s, content: { ...s.content, subheadline: e.target.value } } : s))}
                                className="rounded-lg border-gray-200 h-9"
                                placeholder="PRE-BOOK NEW YEAR DEALS"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label className="text-gray-700 text-xs font-semibold uppercase tracking-wider">CTA Button Text</Label>
                              <Input
                                value={section.content?.cta || ''}
                                onChange={(e) => setSections(sections.map(s => s.id === section.id ? { ...s, content: { ...s.content, cta: e.target.value } } : s))}
                                className="rounded-lg border-gray-200 h-9"
                                placeholder="Sale"
                              />
                            </div>
                          </>
                        )}

                        {(section.section_key === 'hero' || section.section_key === 'promo_banner') && (
                          <div className="space-y-2">
                            <Label className="text-gray-700 text-xs font-semibold uppercase tracking-wider">Background Image URL</Label>
                            <Input
                              value={section.image_url || ''}
                              onChange={(e) => setSections(sections.map(s => s.id === section.id ? { ...s, image_url: e.target.value } : s))}
                              className="rounded-lg border-gray-200 h-9 font-mono text-sm"
                              placeholder="https://images.unsplash.com/..."
                            />
                          </div>
                        )}

                        <div className="space-y-2">
                          <Label className="text-gray-700 text-xs font-semibold uppercase tracking-wider">Link URL</Label>
                          <Input
                            value={section.link_url || ''}
                            onChange={(e) => setSections(sections.map(s => s.id === section.id ? { ...s, link_url: e.target.value } : s))}
                            className="rounded-lg border-gray-200 h-9 font-mono text-sm"
                            placeholder="/deals"
                          />
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={section.is_active}
                              onChange={(e) => setSections(sections.map(s => s.id === section.id ? { ...s, is_active: e.target.checked } : s))}
                              className="rounded border-gray-300 text-furnco-purple focus:ring-furnco-purple w-4 h-4"
                            />
                            <span className="text-sm text-gray-700">Active</span>
                          </label>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setEditingSection(null)}
                              className="h-8 rounded-lg"
                            >
                              Cancel
                            </Button>
                            <Button
                              size="sm"
                              onClick={() => handleSave(section)}
                              disabled={saving}
                              className="h-8 rounded-lg bg-furnco-purple hover:bg-furnco-purple/90 gap-1"
                            >
                              {saving ? 'Saving...' : <><Check className="w-3 h-3" /> Save</>}
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="hidden xl:block">
            <div className="sticky top-28">
              <Card className="rounded-xl shadow-lg border-gray-200 overflow-hidden">
                <CardHeader className="bg-gray-50 border-b py-3">
                  <CardTitle className="text-sm font-bold flex items-center gap-2">
                    <Eye className="w-4 h-4" />
                    Live Preview
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="h-[500px] bg-gradient-to-b from-gray-100 to-white overflow-y-auto">
                    <div className="p-3 space-y-3">
                      {sections.filter(s => s.is_active).slice(0, 4).map((section) => (
                        <div key={section.id} className="bg-white rounded-lg border border-gray-200 p-3 shadow-sm">
                          <p className="text-[10px] text-gray-400 font-mono mb-1">{section.section_key}</p>
                          <p className="font-bold text-gray-900 text-sm">{section.title || 'Untitled'}</p>
                          {section.content?.headline && (
                            <p className="text-xs text-furnco-purple font-semibold mt-1">{section.content.headline}</p>
                          )}
                        </div>
                      ))}
                      {sections.filter(s => s.is_active).length === 0 && (
                        <p className="text-center text-gray-400 text-xs py-8">No active sections</p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
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
            <div className="flex justify-end">
              <Button className="bg-furnco-purple hover:bg-furnco-purple/90 gap-2 rounded-lg">
                <Save className="w-4 h-4" /> Save Page
              </Button>
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
            <div className="flex justify-end pt-4 border-t border-gray-100">
              <Button className="bg-furnco-purple hover:bg-furnco-purple/90 gap-2 rounded-lg">
                <Save className="w-4 h-4" /> Save Settings
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
