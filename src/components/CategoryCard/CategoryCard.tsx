import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import type { Category } from "../../types";
import styles from './CategoryCard.module.css';

interface CategoryCardProps {
  category: Category;
  productCount: number;
}

const cardVariants = {
  initial: { opacity: 0, scale: 0.88 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.35, ease: [0.34, 1.56, 0.64, 1] } },
};

export const CategoryCard = ({ category, productCount }: CategoryCardProps) => {
  const navigate = useNavigate();

  return (
    <motion.div
        variants={cardVariants}
        className={styles.card}
        onClick={() => navigate(`/categoria/${category.slug}`)}
        style={{ background: category.gradient }}
    >
      <span
        className={styles.emoji}
        role="img"
        aria-label={category.name}>
        {category.emoji}
      </span>
      <h2 className={styles.name}>{category.name}</h2>
      <span className={styles.count}>{productCount} productos</span>
    </motion.div>
  );
};
