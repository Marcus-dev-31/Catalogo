import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { ProductGrid } from "../../components/ProductGrid/ProductGrid";
import styles from "./CategoryPage.module.css";
import { getCategories, getProducts } from "../../services/api";
import type { Category, Product } from "../../types";
import { useFetch } from "../../hooks/useApi";

export default function CategoryPage() {
  const {
    data: categories,
    loading: loadingCategories,
    error: errorCategories,
  } = useFetch<Category[]>(getCategories);
  const {
    data: products,
    loading: loadingProducts,
    error: errorProducts,
  } = useFetch<Product[]>(getProducts);

  const loading = loadingCategories || loadingProducts;
  const error = errorCategories || errorProducts;
  const { slug } = useParams();
  const navigate = useNavigate();

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error al cargar los datos</div>;
  if (!categories || !products) return null;

  const category = categories.find((c) => c.slug === slug);
  const filteredProducts = products.filter(
    (p) => p.categoryId === category?.id,
  );

  if (!category) return <div>Categoría no encontrada</div>;

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <button className={styles.backBtn} onClick={() => navigate("/")}>
          <ChevronLeft size={16} strokeWidth={2.5} />
          Inicio
        </button>
        <div className={styles.titleRow}>
          <span className={styles.dot} style={{ background: category.color }} />
          <h1 className={styles.title}>{category.name}</h1>
        </div>
      </header>
      <ProductGrid products={filteredProducts} />
    </div>
  );
}
