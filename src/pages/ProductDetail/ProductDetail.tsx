import { useParams, useNavigate } from "react-router-dom";
import { WhatsAppButton } from "../../components/WhatsAppButton/WhatsAppButton";
import { ChevronLeft } from "lucide-react";
import styles from "./ProductDetail.module.css";
import { useState, useEffect } from "react";
import { getCategories, getProducts } from "../../services/api";
import type { Category, Product } from "../../types";

export default function ProductDetail() {

  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      async function fetchData() {
        const [categoriesData, productsData] = await Promise.all([
          getCategories(),
          getProducts()
        ])
        setCategories(categoriesData);
        setProducts(productsData);
        setLoading(false);
      }
      fetchData()
    }, [])

  const { id } = useParams();
  const productSelected = products.find((p) => p.id === Number(id));

  const navigate = useNavigate();

  const category = categories.find((c) => c.id === productSelected?.categoryId);

  if (loading) return <div>Cargando...</div>
  if (!productSelected) return <div>Producto no encontrado</div>;

  return (
    <main className={styles.page}>

      {/* Hero */}
      <section className={styles.hero}>
        <button className={styles.backBtn} onClick={() => navigate(`/categoria/${category?.slug}`)}>
          <ChevronLeft size={18} strokeWidth={2.5} color="#1A120B" />
        </button>
        <img
          className={styles.photo}
          src={productSelected.image}
          alt={productSelected.name}
          onError={(e) => {
            e.currentTarget.src = '/placeholder.svg'
          }}
        />
        <div className={styles.pricePill}>
          <span className={styles.pillCur}>$</span>
          <span className={styles.pillAmt}>
            {productSelected.price.toLocaleString("es-AR")}
          </span>
        </div>
      </section>

      {/* Contenido */}
      <section className={styles.content}>
        {category && (
          <div
            className={styles.chip}
            style={{ background: category.pale, color: category.color }}
          >
            <span>{category.emoji}</span>
            {category.name}
          </div>
        )}
        <h1 className={styles.name}>{productSelected.name}</h1>
        <div className={styles.sep} />
        <p className={styles.desc}>{productSelected.description}</p>
      </section>

      {/* CTA */}
      <footer className={styles.cta}>
        <WhatsAppButton name={productSelected.name} price={productSelected.price} />
      </footer>

    </main>
  );
}
