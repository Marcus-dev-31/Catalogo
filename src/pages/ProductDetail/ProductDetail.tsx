import { useParams, useNavigate } from "react-router-dom";
import { products } from "../../data/products";
import { categories } from "../../data/categories";
import { WhatsAppButton } from "../../components/WhatsAppButton/WhatsAppButton";
import { ChevronLeft } from "lucide-react";
import styles from "./ProductDetail.module.css";

export default function ProductDetail() {
  const { id } = useParams();
  const productSelected = products.find((p) => p.id === Number(id));

  const navigate = useNavigate();

  const category = categories.find((c) => c.id === productSelected?.categoryId);

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
