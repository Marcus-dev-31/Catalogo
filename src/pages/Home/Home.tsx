import { useState, useEffect } from "react";
import { SearchBar } from "../../components/SearchBar/SearchBar";
import { CategoryGrid } from "../../components/CategoryGrid/CategoryGrid";
import { ProductCard } from "../../components/ProductCard/ProductCard";
import styles from "./Home.module.css";
import { getCategories, getProducts } from "../../services/api";
import type { Category, Product } from "../../types";
import { useFetch } from "../../hooks/useApi";

export default function Home() {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const { data: categories, loading: loadingCategories, error: errorCategories } =
    useFetch<Category[]>(getCategories);
  const { data: products, loading: loadingProducts, error: errorProducts } =
    useFetch<Product[]>(getProducts);

  const loading = loadingCategories || loadingProducts;
  const error = errorCategories || errorProducts;

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);
    return () => clearTimeout(timer);
  }, [query]);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error al cargar los datos</div>
  if (!categories || !products) return null;

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(debouncedQuery.toLowerCase()),
  );

  return (
    <>
      <header className={styles.header}>
        <div className={styles.topbar}>
          <div className={styles.logoGroup}>
            <div className={styles.logoIcon}>🏪</div>
            <div className={styles.logoText}>
              <h1 className={styles.storeName}>Un Poco De Todo</h1>
              <span className={styles.storeSub}>
                Todo en un lugar · Precio justo
              </span>
            </div>
          </div>
          <div className={styles.liveBadge}>
            <span className={styles.liveDot} />
            <span className={styles.liveLabel}>En línea</span>
          </div>
        </div>
        <SearchBar value={query} onChange={setQuery} />
      </header>

      <main>
        {query ? (
          <div className={styles.searchResults}>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))
            ) : (
              <p className={styles.noResults}>Sin resultados para "{query}"</p>
            )}
          </div>
        ) : (
          <div>
            <h2 className={styles.sectionLabel}>Explorá por categoría</h2>
            <CategoryGrid categories={categories} products={products} />
          </div>
        )}
      </main>
    </>
  );
}
