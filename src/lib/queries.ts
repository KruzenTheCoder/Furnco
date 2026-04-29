import { supabase, getServiceSupabase } from './supabase'
import type { Product, Category, Order, PromoBanner, SiteContent, ProductWithCategory } from './database.types'

export async function getProducts(): Promise<ProductWithCategory[]> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return [];
  
  const { data, error } = await supabase
    .from('products')
    .select('*, category:categories(*)')
    .eq('is_active', true)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data || []
}

export async function getProductBySlug(slug: string): Promise<ProductWithCategory | null> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return null;
  
  const { data, error } = await supabase
    .from('products')
    .select('*, category:categories(*)')
    .eq('slug', slug)
    .eq('is_active', true)
    .single()

  if (error) return null
  return data
}

export async function getCategories(): Promise<Category[]> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return [];
  
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('name', { ascending: true })

  if (error) throw error
  return data || []
}

export async function getPromoBanners(): Promise<PromoBanner[]> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return [];
  
  const { data, error } = await supabase
    .from('promo_banners')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: true })
    .limit(1)

  if (error) {
    console.error('getPromoBanners error:', error)
    return []
  }
  return data || []
}

export async function getSiteContent(section: string): Promise<SiteContent | null> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return null;
  
  const { data, error } = await supabase
    .from('site_content')
    .select('*')
    .eq('section', section)
    .single()

  if (error) return null
  return data
}

export async function getAdminProducts() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return [];
  
  const { data, error } = await supabase
    .from('products')
    .select('*, category:categories(name)')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data || []
}

export async function getAdminOrders() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return [];
  
  const { data, error } = await supabase
    .from('orders')
    .select(`
      *,
      user:profiles(full_name, email)
    `)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data || []
}

export async function getOrderById(orderId: string) {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return null;
  
  const { data, error } = await supabase
    .from('orders')
    .select(`
      *,
      user:profiles(full_name, email),
      items:order_items(
        *,
        product:products(name, image_url, slug)
      )
    `)
    .eq('id', orderId)
    .single()

  if (error) throw error
  return data
}

export async function createOrder(orderData: {
  user_id?: string
  total: number
  items: { product_id: string; quantity: number; price_at_purchase: number }[]
}) {
  const serviceSupabase = getServiceSupabase()

  const { data: order, error: orderError } = await serviceSupabase
    .from('orders')
    .insert({
      user_id: orderData.user_id,
      total: orderData.total,
      status: 'pending'
    })
    .select()
    .single()

  if (orderError) throw orderError

  if (orderData.items.length > 0) {
    const { error: itemsError } = await serviceSupabase
      .from('order_items')
      .insert(
        orderData.items.map(item => ({
          order_id: order.id,
          product_id: item.product_id,
          quantity: item.quantity,
          price_at_purchase: item.price_at_purchase
        }))
      )

    if (itemsError) throw itemsError
  }

  return order
}

export async function updateOrderStatus(orderId: string, status: Order['status']) {
  const serviceSupabase = getServiceSupabase()

  const { data, error } = await serviceSupabase
    .from('orders')
    .update({ status, updated_at: new Date().toISOString() })
    .eq('id', orderId)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function createProduct(productData: {
  name: string
  slug: string
  description?: string
  price: number
  stock: number
  category_id?: string
  image_url?: string
  is_active?: boolean
}) {
  const serviceSupabase = getServiceSupabase()

  const { data, error } = await serviceSupabase
    .from('products')
    .insert({
      ...productData,
      updated_at: new Date().toISOString()
    })
    .select()
    .single()

  if (error) throw error
  return data
}

export async function updateProduct(productId: string, productData: Partial<Product>) {
  const serviceSupabase = getServiceSupabase()

  const { data, error } = await serviceSupabase
    .from('products')
    .update({
      ...productData,
      updated_at: new Date().toISOString()
    })
    .eq('id', productId)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function deleteProduct(productId: string) {
  const serviceSupabase = getServiceSupabase()

  const { error } = await serviceSupabase
    .from('products')
    .delete()
    .eq('id', productId)

  if (error) throw error
}

export async function updatePromoBanner(bannerId: string, bannerData: Partial<PromoBanner>) {
  const serviceSupabase = getServiceSupabase()

  const { data, error } = await serviceSupabase
    .from('promo_banners')
    .update({
      ...bannerData,
      updated_at: new Date().toISOString()
    })
    .eq('id', bannerId)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function updateSiteContent(section: string, content: object) {
  const serviceSupabase = getServiceSupabase()

  const { data, error } = await serviceSupabase
    .from('site_content')
    .update({
      content,
      updated_at: new Date().toISOString()
    })
    .eq('section', section)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function getNewProducts(): Promise<ProductWithCategory[]> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return [];
  
  const { data, error } = await supabase
    .from('products')
    .select('*, category:categories(*)')
    .eq('is_active', true)
    .eq('is_new', true)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data || []
}

export async function getTake2Products(): Promise<ProductWithCategory[]> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return [];
  
  const { data, error } = await supabase
    .from('products')
    .select('*, category:categories(*)')
    .eq('is_active', true)
    .eq('is_take2', true)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data || []
}

export async function getDealsProducts(): Promise<ProductWithCategory[]> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return [];

  const { data, error } = await supabase
    .from('products')
    .select('*, category:categories(*)')
    .eq('is_active', true)
    .or('is_new.eq.true,is_take2.eq.true')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data || []
}

export async function getPageSections(page: string = 'homepage') {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return [];

  const { data, error } = await supabase
    .from('page_sections')
    .select('*')
    .eq('page', page)
    .order('sort_order', { ascending: true })

  if (error) throw error
  return data || []
}

export async function updatePageSection(sectionKey: string, page: string, sectionData: {
  title?: string;
  content?: object;
  image_url?: string;
  link_url?: string;
  link_text?: string;
  sort_order?: number;
  is_active?: boolean;
}) {
  const serviceSupabase = getServiceSupabase()

  const { data, error } = await serviceSupabase
    .from('page_sections')
    .update({
      ...sectionData,
      updated_at: new Date().toISOString()
    })
    .eq('section_key', sectionKey)
    .eq('page', page)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function reorderPageSections(page: string, orderedKeys: string[]) {
  const serviceSupabase = getServiceSupabase()

  const updates = orderedKeys.map((key, index) =>
    serviceSupabase
      .from('page_sections')
      .update({ sort_order: index })
      .eq('section_key', key)
      .eq('page', page)
  )

  await Promise.all(updates)
}

export async function getProductsByCategory(categorySlug: string): Promise<ProductWithCategory[]> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return [];
  
  const { data, error } = await supabase
    .from('products')
    .select('*, category:categories(*)')
    .eq('is_active', true)
    .eq('category.slug', categorySlug)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data || []
}