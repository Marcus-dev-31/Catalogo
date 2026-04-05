export interface ProductImage {
  id: number;
  url: string;
  order: number;
  productId: number;
}

export interface Product {
  id: number;
  categoryId: number;
  name: string;
  images: ProductImage[];
  price: number;
  description: string;
}

export interface Category {
  id: number;
  name: string;
  emoji: string;
  slug: string;
  color: string;
  pale: string;
  gradient: string;
}
