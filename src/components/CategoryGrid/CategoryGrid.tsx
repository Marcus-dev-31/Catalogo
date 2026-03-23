import { motion } from "framer-motion";
import type { Category, Product } from "../../types";
import { CategoryCard } from "../CategoryCard/CategoryCard";
import styles from './CategoryGrid.module.css';

interface CategoryGridProps {
  categories: Category[];
  products: Product[];
}

const container = {
  animate: { transition: { staggerChildren: 0.07 } },
};

export const CategoryGrid = ({ categories, products }: CategoryGridProps) => {
  return (
    <motion.div className={styles.grid} variants={container} initial="initial" animate="animate">
      {categories.map((c) => (
        <CategoryCard
          key={c.id}
          category={c}
          productCount={products.filter((p) => p.categoryId === c.id).length}
        />
      ))}
    </motion.div>
  );
};
