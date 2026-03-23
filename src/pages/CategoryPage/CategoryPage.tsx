import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { categories } from "../../data/categories";
import { products } from "../../data/products";
import { ProductGrid } from "../../components/ProductGrid/ProductGrid";
import styles from "./CategoryPage.module.css";

export default function CategoryPage() {
  const { slug } = useParams();
  const category = categories.find((c) => c.slug === slug);
  const filteredProducts = products.filter(
    (p) => p.categoryId === category?.id,
  );

  const navigate = useNavigate();

  if (!category) return <div>Categoria no encontrada</div>;

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <button className={styles.backBtn} onClick={() => navigate("/")}>
          <ChevronLeft size={16} strokeWidth={2.5} />
          Inicio
        </button>
        <div className={styles.titleRow}>
          <span
            className={styles.dot}
            style={{ background: category.color }}
          />
          <h1 className={styles.title}>{category.name}</h1>
        </div>
      </header>
      <ProductGrid products={filteredProducts} />
    </div>
  );
}
