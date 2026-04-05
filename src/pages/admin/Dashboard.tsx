import { Link } from "react-router-dom"
import { motion, type Variants } from "framer-motion"
import { useFetch } from "../../hooks/useApi"
import { getProducts, getCategories } from "../../services/api"
import type { Product, Category } from "../../types"
import { Plus, Tag, Link2, ChevronRight } from "lucide-react"
import styles from "./Dashboard.module.css"

const container: Variants = {
  animate: { transition: { staggerChildren: 0.07 } }
}

const item: Variants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.38, ease: [0.4, 0, 0.2, 1] } }
}

export default function Dashboard() {
  const { data: products }   = useFetch<Product[]>(getProducts)
  const { data: categories } = useFetch<Category[]>(getCategories)

  return (
    <motion.div
      className={styles.page}
      variants={container}
      initial="initial"
      animate="animate"
    >

      {/* Encabezado */}
      <motion.div variants={item} className={styles.heading}>
        <h1 className={styles.title}>Hola, Admin 👋</h1>
        <p className={styles.sub}>Todo bajo control</p>
      </motion.div>

      {/* Resumen */}
      <motion.div variants={item}>
        <h2 className={styles.sectionLabel}>Resumen</h2>
        <div className={styles.statsGrid}>
          <div className={`${styles.statCard} ${styles.cOrange}`}>
            <span className={styles.statIcon}>📦</span>
            <span className={styles.statValue}>{products?.length ?? '—'}</span>
            <span className={styles.statLabel}>Productos</span>
          </div>
          <div className={`${styles.statCard} ${styles.cGreen}`}>
            <span className={styles.statIcon}>🏷️</span>
            <span className={styles.statValue}>{categories?.length ?? '—'}</span>
            <span className={styles.statLabel}>Categorías</span>
          </div>
        </div>
      </motion.div>

      {/* Acciones rápidas */}
      <motion.div variants={item}>
        <h2 className={styles.sectionLabel}>Acciones rápidas</h2>
        <div className={styles.quickList}>
          <Link to="/admin/products" className={styles.quickItem}>
            <div className={`${styles.quickIco} ${styles.icoOrange}`}>
              <Plus size={18} strokeWidth={2.5} color="#FF4500" />
            </div>
            <div className={styles.quickText}>
              <strong className={styles.quickName}>Agregar producto</strong>
              <small className={styles.quickDesc}>Nuevo item al catálogo</small>
            </div>
            <ChevronRight size={16} strokeWidth={2} color="var(--muted)" />
          </Link>
          <Link to="/admin/categories" className={styles.quickItem}>
            <div className={`${styles.quickIco} ${styles.icoGreen}`}>
              <Tag size={18} strokeWidth={2.5} color="#2F9E44" />
            </div>
            <div className={styles.quickText}>
              <strong className={styles.quickName}>Agregar categoría</strong>
              <small className={styles.quickDesc}>Nueva sección en el home</small>
            </div>
            <ChevronRight size={16} strokeWidth={2} color="var(--muted)" />
          </Link>
          <a href="/" target="_blank" rel="noopener noreferrer" className={styles.quickItem}>
            <div className={`${styles.quickIco} ${styles.icoPurple}`}>
              <Link2 size={18} strokeWidth={2.5} color="#7048E8" />
            </div>
            <div className={styles.quickText}>
              <strong className={styles.quickName}>Ver catálogo</strong>
              <small className={styles.quickDesc}>Cómo lo ve el cliente</small>
            </div>
            <ChevronRight size={16} strokeWidth={2} color="var(--muted)" />
          </a>
        </div>
      </motion.div>

      {/* Últimos productos */}
      <motion.div variants={item}>
        <h2 className={styles.sectionLabel}>Últimos productos</h2>
        <div className={styles.card}>
          {products?.slice(-4).map((p) => {
            const category = categories?.find((c) => c.id === p.categoryId)
            return (
              <div key={p.id} className={styles.productRow}>
                <div
                  className={styles.productEmoji}
                  style={{ background: category?.pale }}
                >
                  {category?.emoji ?? '📦'}
                </div>
                <div className={styles.productInfo}>
                  <span className={styles.productName}>{p.name}</span>
                  <span
                    className={styles.productChip}
                    style={{ background: category?.pale, color: category?.color }}
                  >
                    {category?.name}
                  </span>
                </div>
                <span className={styles.productPrice}>
                  ${p.price.toLocaleString('es-AR')}
                </span>
              </div>
            )
          })}
        </div>
      </motion.div>

    </motion.div>
  )
}