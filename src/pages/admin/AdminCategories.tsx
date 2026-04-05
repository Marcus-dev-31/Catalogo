import { useEffect, useState } from "react"
import { motion, type Variants } from "framer-motion"
import type { Category, Product } from "../../types"
import { deleteCategory, getCategories, getProducts } from "../../services/api"
import { Pencil, Trash2, Plus } from "lucide-react"
import { CategoryModal } from "../../components/admin/CategoryModal/CategoryModal"
import styles from "./AdminCategories.module.css"

const container: Variants = {
  animate: { transition: { staggerChildren: 0.06 } }
}

const item: Variants = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.4, 0, 0.2, 1] } }
}

export default function AdminCategories() {
  const [categories, setCategories]             = useState<Category[]>([])
  const [products, setProducts]                 = useState<Product[]>([])
  const [modalOpen, setModalOpen]               = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)

  const handleDelete = async (slug: string) => {
    if (!confirm('¿Seguro que querés eliminar esta categoría?')) return
    await deleteCategory(slug)
    setCategories(prev => prev.filter(c => c.slug !== slug))
  }

  useEffect(() => { getCategories().then(setCategories) }, [])
  useEffect(() => { getProducts().then(setProducts) },     [])

  const productCount = (categoryId: number) =>
    products.filter(p => p.categoryId === categoryId).length

  return (
    <motion.div
      className={styles.page}
      variants={container}
      initial="initial"
      animate="animate"
    >

      <motion.button
        variants={item}
        className={styles.btnAdd}
        onClick={() => { setSelectedCategory(null); setModalOpen(true) }}
      >
        <Plus size={16} strokeWidth={2.5} />
        Agregar categoría
      </motion.button>

      <motion.p variants={item} className={styles.sectionLabel}>
        Categorías ({categories.length})
      </motion.p>

      <motion.div variants={item} className={styles.card}>
        {categories.map((c) => (
          <div key={c.slug} className={styles.row}>
            <div className={styles.rowEmoji} style={{ background: c.pale }}>
              {c.emoji}
            </div>
            <div className={styles.rowInfo}>
              <span className={styles.rowName}>{c.name}</span>
              <span className={styles.rowCount}>
                {productCount(c.id)} productos
              </span>
            </div>
            <div className={styles.colorDot} style={{ background: c.color }} />
            <div className={styles.rowActions}>
              <button
                className={styles.btnEdit}
                onClick={() => { setSelectedCategory(c); setModalOpen(true) }}
                aria-label={`Editar ${c.name}`}
              >
                <Pencil size={15} strokeWidth={2} />
              </button>
              <button
                className={styles.btnDelete}
                onClick={() => handleDelete(c.slug)}
                aria-label={`Eliminar ${c.name}`}
              >
                <Trash2 size={15} strokeWidth={2} />
              </button>
            </div>
          </div>
        ))}
      </motion.div>

      <CategoryModal
        isOpen={modalOpen}
        selectedCategory={selectedCategory}
        onClose={() => { setModalOpen(false); setSelectedCategory(null) }}
        onSave={() => { getCategories().then(setCategories) }}
      />

    </motion.div>
  )
}