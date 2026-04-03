import { API_URL } from "../config";
import type { Product, Category } from "../types";

export async function getProducts(): Promise<Product[]> {
    const response = await fetch(`${API_URL}/api/products`)
    return response.json()
}

export async function getCategories(): Promise<Category[]> {
  const response = await fetch(`${API_URL}/api/categories`)
  return response.json()
}