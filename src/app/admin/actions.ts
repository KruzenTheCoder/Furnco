'use server';

import { getServiceSupabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createProductAction(formData: FormData) {
  const serviceSupabase = getServiceSupabase();
  
  const name = formData.get('name') as string;
  const description = formData.get('description') as string;
  const price = parseFloat(formData.get('price') as string);
  const stock = parseInt(formData.get('stock') as string || '0', 10);
  const category_id = formData.get('category_id') as string;
  const image_url = formData.get('image_url') as string;
  const is_active = formData.get('is_active') === 'active';
  const is_new = formData.get('is_new') === 'on';
  const is_take2 = formData.get('is_take2') === 'on';

  // Basic slug generation
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

  const { error } = await serviceSupabase
    .from('products')
    .insert({
      name,
      slug,
      description,
      price,
      stock,
      category_id: category_id || null,
      image_url: image_url || null,
      is_active,
      is_new,
      is_take2
    });

  if (error) {
    console.error('Error creating product:', error);
    throw new Error('Failed to create product');
  }

  revalidatePath('/admin/products');
  revalidatePath('/store');
  revalidatePath('/deals');
  revalidatePath('/new-arrivals');
  redirect('/admin/products');
}

export async function updateProductAction(productId: string, formData: FormData) {
  const serviceSupabase = getServiceSupabase();
  
  const name = formData.get('name') as string;
  const description = formData.get('description') as string;
  const price = parseFloat(formData.get('price') as string);
  const stock = parseInt(formData.get('stock') as string || '0', 10);
  const category_id = formData.get('category_id') as string;
  const image_url = formData.get('image_url') as string;
  const is_active = formData.get('is_active') === 'active';
  const is_new = formData.get('is_new') === 'on';
  const is_take2 = formData.get('is_take2') === 'on';

  const { error } = await serviceSupabase
    .from('products')
    .update({
      name,
      description,
      price,
      stock,
      category_id: category_id || null,
      image_url: image_url || null,
      is_active,
      is_new,
      is_take2,
      updated_at: new Date().toISOString()
    })
    .eq('id', productId);

  if (error) {
    console.error('Error updating product:', error);
    throw new Error('Failed to update product');
  }

  revalidatePath('/admin/products');
  revalidatePath('/store');
  revalidatePath('/deals');
  revalidatePath('/new-arrivals');
  redirect('/admin/products');
}

export async function deleteProductAction(productId: string) {
  const serviceSupabase = getServiceSupabase();
  
  const { error } = await serviceSupabase
    .from('products')
    .delete()
    .eq('id', productId);

  if (error) {
    console.error('Error deleting product:', error);
    throw new Error('Failed to delete product');
  }

  revalidatePath('/admin/products');
  revalidatePath('/store');
}

export async function updateOrderStatusAction(orderId: string, formData: FormData) {
  const serviceSupabase = getServiceSupabase();
  const status = formData.get('status') as string;

  const { error } = await serviceSupabase
    .from('orders')
    .update({ status, updated_at: new Date().toISOString() })
    .eq('id', orderId);

  if (error) {
    console.error('Error updating order status:', error);
    throw new Error('Failed to update order status');
  }

  revalidatePath('/admin/orders');
  revalidatePath(`/admin/orders/${orderId}`);
  redirect('/admin/orders');
}

export async function updatePageSectionAction(formData: FormData) {
  const serviceSupabase = getServiceSupabase();

  const sectionKey = formData.get('section_key') as string;
  const page = formData.get('page') as string;
  const title = formData.get('title') as string;
  const contentJson = formData.get('content') as string;
  const image_url = formData.get('image_url') as string;
  const link_url = formData.get('link_url') as string;
  const link_text = formData.get('link_text') as string;
  const is_active = formData.get('is_active') === 'true';

  const content = contentJson ? JSON.parse(contentJson) : {};

  const { error } = await serviceSupabase
    .from('page_sections')
    .update({
      title,
      content,
      image_url: image_url || null,
      link_url: link_url || null,
      link_text: link_text || null,
      is_active,
      updated_at: new Date().toISOString()
    })
    .eq('section_key', sectionKey)
    .eq('page', page);

  if (error) {
    console.error('Error updating page section:', error);
    throw new Error('Failed to update page section');
  }

  revalidatePath('/admin/content');
  redirect('/admin/content');
}

export async function reorderPageSectionsAction(page: string, orderedKeys: string[]) {
  const serviceSupabase = getServiceSupabase();

  const updates = orderedKeys.map((key, index) =>
    serviceSupabase
      .from('page_sections')
      .update({ sort_order: index, updated_at: new Date().toISOString() })
      .eq('section_key', key)
      .eq('page', page)
  );

  const results = await Promise.all(updates);
  const hasError = results.some(r => r.error);

  if (hasError) {
    console.error('Error reordering page sections');
    throw new Error('Failed to reorder sections');
  }

  revalidatePath('/admin/content');
}
