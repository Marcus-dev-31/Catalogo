import { motion } from "framer-motion";
import type { Product } from "../../types";
import { ProductCard } from "../ProductCard/ProductCard";
import styles from "./ProductGrid.module.css";

interface ProductGridProps {
  products: Product[];
}

const container = {
  animate: { transition: { staggerChildren: 0.06 } },
};

export const ProductGrid = ({ products }: ProductGridProps) => {
  return (
    <motion.div className={styles.grid} variants={container} initial="initial" animate="animate">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </motion.div>
  );
};
