import { api } from "./client";

export interface ProductVariant {
  label: string;
  price: number;
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  category_id: number;
  sub_category: string;
  description: string;
  image_url: string;
  price: number | null;
  compare_price: number | null;
  badge: string;
  variants: ProductVariant[];
  is_available: boolean;
  is_featured: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  icon: string;
  description: string;
  sort_order: number;
  is_active: boolean;
}

export async function getProducts(params?: {
  category_id?: number;
  is_available?: boolean;
  search?: string;
}): Promise<Product[]> {
  const query = new URLSearchParams();
  if (params?.category_id) query.set("category_id", String(params.category_id));
  if (params?.is_available !== undefined) query.set("is_available", String(params.is_available));
  if (params?.search) query.set("search", params.search);
  const qs = query.toString();
  return api.get<Product[]>(`/products${qs ? `?${qs}` : ""}`);
}

export async function getProduct(id: number): Promise<Product> {
  return api.get<Product>(`/products/${id}`);
}

export async function getCategories(): Promise<Category[]> {
  return api.get<Category[]>("/categories");
}
