import { API_URL } from "../config";
import type { Product, Category } from "../types";

export async function getProducts(): Promise<Product[]> {
    const response = await fetch(`${API_URL}/api/products`);
    return response.json();
}

export async function getCategories(): Promise<Category[]> {
  const response = await fetch(`${API_URL}/api/categories`);
  return response.json();
}

export async function getProductsByCategory(categoryId: number): Promise<Product[]> {
  const response = await fetch(`${API_URL}/api/products`);
  const products: Product[] = await response.json();
  return products.filter(p => p.categoryId === categoryId);
}

export async function getProductById(id: number): Promise<Product | null> {
  const response = await fetch(`${API_URL}/api/products/${id}`);
  if (!response.ok) return null;
  return response.json();
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const response = await fetch(`${API_URL}/api/categories/${slug}`);
  if (!response.ok) return null;
  return response.json();
}

export async function getCategoryById(id: number): Promise<Category | null> {
  const response = await fetch(`${API_URL}/api/categories`)
  const categories: Category[] = await response.json()
  return categories.find(c => c.id === id) || null
}

export async function login(email: string, password: string): Promise<{ token: string }> {
  const response = await fetch(`${API_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  })
  
  if (!response.ok) throw new Error('Credenciales inválidas')
  
  return response.json()
}