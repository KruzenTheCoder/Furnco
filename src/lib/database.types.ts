export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          full_name: string | null
          avatar_url: string | null
          role: 'admin' | 'customer'
          created_at: string
        }
        Insert: {
          id: string
          full_name?: string | null
          avatar_url?: string | null
          role?: 'admin' | 'customer'
          created_at?: string
        }
        Update: {
          id?: string
          full_name?: string | null
          avatar_url?: string | null
          role?: 'admin' | 'customer'
          created_at?: string
        }
      }
      categories: {
        Row: {
          id: string
          name: string
          slug: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          created_at?: string
        }
      }
      products: {
        Row: {
          id: string
          name: string
          slug: string
          description: string | null
          price: number
          stock: number
          category_id: string | null
          image_url: string | null
          is_active: boolean
          is_new: boolean
          is_take2: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description?: string | null
          price: number
          stock?: number
          category_id?: string | null
          image_url?: string | null
          is_active?: boolean
          is_new?: boolean
          is_take2?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string | null
          price?: number
          stock?: number
          category_id?: string | null
          image_url?: string | null
          is_active?: boolean
          is_new?: boolean
          is_take2?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      orders: {
        Row: {
          id: string
          user_id: string | null
          status: 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled'
          total: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          status?: 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled'
          total: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          status?: 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled'
          total?: number
          created_at?: string
          updated_at?: string
        }
      }
      order_items: {
        Row: {
          id: string
          order_id: string
          product_id: string | null
          quantity: number
          price_at_purchase: number
        }
        Insert: {
          id?: string
          order_id: string
          product_id?: string | null
          quantity: number
          price_at_purchase: number
        }
        Update: {
          id?: string
          order_id?: string
          product_id?: string | null
          quantity?: number
          price_at_purchase?: number
        }
      }
      promo_banners: {
        Row: {
          id: string
          title: string
          subtitle: string | null
          link: string | null
          is_active: boolean
          starts_at: string | null
          ends_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          subtitle?: string | null
          link?: string | null
          is_active?: boolean
          starts_at?: string | null
          ends_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          subtitle?: string | null
          link?: string | null
          is_active?: boolean
          starts_at?: string | null
          ends_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      site_content: {
        Row: {
          id: string
          section: string
          content: Json
          updated_at: string
        }
        Insert: {
          id?: string
          section: string
          content: Json
          updated_at?: string
        }
        Update: {
          id?: string
          section?: string
          content?: Json
          updated_at?: string
        }
      }
      addresses: {
        Row: {
          id: string
          user_id: string
          full_name: string
          line1: string
          line2: string | null
          city: string
          province: string
          postal_code: string
          phone: string | null
          is_default: boolean
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          full_name: string
          line1: string
          line2?: string | null
          city: string
          province: string
          postal_code: string
          phone?: string | null
          is_default?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          full_name?: string
          line1?: string
          line2?: string | null
          city?: string
          province?: string
          postal_code?: string
          phone?: string | null
          is_default?: boolean
          created_at?: string
        }
      }
      product_images: {
        Row: {
          id: string
          product_id: string
          url: string
          is_primary: boolean
          alt_text: string | null
          sort_order: number
          created_at: string
        }
        Insert: {
          id?: string
          product_id: string
          url: string
          is_primary?: boolean
          alt_text?: string | null
          sort_order?: number
          created_at?: string
        }
        Update: {
          id?: string
          product_id?: string
          url?: string
          is_primary?: boolean
          alt_text?: string | null
          sort_order?: number
          created_at?: string
        }
      }
    }
  }
}

export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']
export type InsertTables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Insert']
export type UpdateTables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Update']

export type Product = Tables<'products'>
export type Category = Tables<'categories'>
export type Order = Tables<'orders'>
export type OrderItem = Tables<'order_items'>
export type PromoBanner = Tables<'promo_banners'>
export type SiteContent = Tables<'site_content'>
export type Address = Tables<'addresses'>
export type Profile = Tables<'profiles'>

export interface ProductWithCategory extends Product {
  category?: Category | null
}

export interface OrderWithItems extends Order {
  items?: OrderItemWithProduct[]
}

export interface OrderItemWithProduct extends OrderItem {
  product?: Product | null
}