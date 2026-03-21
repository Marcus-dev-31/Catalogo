import { useNavigate } from "react-router-dom";
import type { Category } from "../../types";

interface CategoryCardProps {
  category: Category;
  productCount: number;
}

export const CategoryCard = ({ category, productCount }: CategoryCardProps) => {
  const navigate = useNavigate();

  return (
    <div 
        onClick={() => navigate(`/categoria/${category.slug}`)}
        style={{ background: category.gradient }}
    >
      <span role="img" aria-label={category.name}>
        {category.emoji}
      </span>
      <h2>{category.name}</h2>
      <span>{productCount} productos</span>
    </div>
  );
};
