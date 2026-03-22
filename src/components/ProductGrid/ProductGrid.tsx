import type { Category, Product } from "../../types";
import { ProductCard } from "../ProductCard/ProductCard";

interface ProductGridProps {
  products: Product[];
  category: Category;
}

export const ProductGrid = ({ products, category }: ProductGridProps) => {
  return (
    <div>
      <h2>{category.name}</h2>
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
};
