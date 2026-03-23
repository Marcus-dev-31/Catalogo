import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import type { Product } from "../../types";
import styles from "./ProductCard.module.css";

interface ProductCardProps {
  product: Product;
}

const cardVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const } },
};

export const ProductCard = ({ product }: ProductCardProps) => {
  const navigate = useNavigate();

  return (
    <motion.div
      variants={cardVariants}
      className={styles.card}
      onClick={() => navigate(`/producto/${product.id}`)}
    >
      <div className={styles.imgWrap}>
        <img
          className={styles.photo}
          src={product.image}
          alt={product.name}
          onError={(e) => {
            e.currentTarget.src = '/placeholder.svg'
          }}
        />
      </div>

      <div className={styles.body}>
        <h3 className={styles.name}>{product.name}</h3>
        <span className={styles.price}>
          {product.price.toLocaleString("es-AR", {
            style: "currency",
            currency: "ARS",
          })}
        </span>
      </div>
    </motion.div>
  );
};
