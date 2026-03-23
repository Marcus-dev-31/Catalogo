export interface Product {
    id: number;
    categoryId: number;
    name: string;
    image: string;
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

