import { API_URL } from "../config";
import type { Product, Category } from "../types";

export async function getProducts(): Promise<Product[]> {
    const response = await fetch(`${API_URL}/api/products`);
    if (!response.ok) throw new Error('Error al obtener productos');
    return response.json();
}

export async function getCategories(): Promise<Category[]> {
  const response = await fetch(`${API_URL}/api/categories`);
  if (!response.ok) throw new Error('Error al obtener categorías');
  return response.json();
}

export async function getProductsByCategory(categoryId: number): Promise<Product[]> {
  const response = await fetch(`${API_URL}/api/products`);
  if (!response.ok) throw new Error('Error al obtener productos');
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
  if (!response.ok) throw new Error('Error al obtener categorías')
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

export async function createProduct(data: Omit<Product, 'id' | 'images'>): Promise<Product> {
  const token = localStorage.getItem('token')
  const response = await fetch(`${API_URL}/api/products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(data)
  })
  if (!response.ok) throw new Error('Error al crear el producto')
  return response.json()
}

export async function updateProduct(id: number, data: Omit<Product, 'id' | 'images'>): Promise<Product> {
  const token = localStorage.getItem('token')
  const response = await fetch(`${API_URL}/api/products/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(data)
  })
  if (!response.ok) throw new Error('Error al actualizar el producto')
  return response.json()
}

export async function deleteProduct(id: number): Promise<void> {
  const token = localStorage.getItem('token')
  const response = await fetch(`${API_URL}/api/products/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` }
  })
  if (!response.ok) throw new Error('Error al eliminar el producto')
}

export async function createCategory(data: Omit<Category, 'id'>): Promise<Category> {
  const token = localStorage.getItem('token')
  const response = await fetch(`${API_URL}/api/categories`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(data)
  })
  if (!response.ok) throw new Error('Error al crear la categoría')
  return response.json()
}

export async function updateCategory(slug: string, data: Omit<Category, 'id'>): Promise<Category> {
  const token = localStorage.getItem('token')
  const response = await fetch(`${API_URL}/api/categories/${slug}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(data)
  })
  if (!response.ok) throw new Error('Error al actualizar la categoría')
  return response.json()
}

export async function deleteCategory(slug: string): Promise<void> {
  const token = localStorage.getItem('token')
  const response = await fetch(`${API_URL}/api/categories/${slug}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` }
  })
  if (!response.ok) throw new Error('Error al eliminar la categoría')
}

