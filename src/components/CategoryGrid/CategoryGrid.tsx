import type { Category, Product } from "../../types";
import { CategoryCard } from "../CategoryCard/CategoryCard";

interface CategoryGridProps {
  categories: Category[];
  products: Product[];
}

export const CategoryGrid = ({ categories, products }: CategoryGridProps) => {
  return (
    <>
      {categories.map((c) => (
        <CategoryCard
          key={c.id}
          category={c}
          productCount={products.filter((p) => p.categoryId === c.id).length}
        />
      ))}
    </>
  );
};
