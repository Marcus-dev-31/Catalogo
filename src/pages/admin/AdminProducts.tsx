import { useState, useEffect } from "react"
import { motion, type Variants } from "framer-motion"
import type { Category, Product } from "../../types"
import { deleteProduct, getCategories, getProducts } from "../../services/api"
import { Pencil, Trash2, Plus } from 'lucide-react'
import { ProductModal } from "../../components/admin/ProductModal/ProductModal"
import styles from "./AdminProducts.module.css"

const container: Variants = {
  animate: { transition: { staggerChildren: 0.06 } }
}

const item: Variants = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.4, 0, 0.2, 1] } }
}

export default function AdminProducts() {
  const [products, setProducts]         = useState<Product[]>([])
  const [categories, setCategories]     = useState<Category[]>([])
  const [modalOpen, setModalOpen]       = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  const handleDelete = async (id: number) => {
    if (!confirm('¿Seguro que querés eliminar este producto?')) return
    await deleteProduct(id)
    setProducts(prev => prev.filter(p => p.id !== id))
  }

  useEffect(() => { getProducts().then(setProducts) },   [])
  useEffect(() => { getCategories().then(setCategories) }, [])

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
        onClick={() => { setSelectedProduct(null); setModalOpen(true) }}
      >
        <Plus size={16} strokeWidth={2.5} />
        Agregar producto
      </motion.button>

      <motion.p variants={item} className={styles.sectionLabel}>
        Todos los productos ({products.length})
      </motion.p>

      <motion.div variants={item} className={styles.card}>
        {products.map((p) => {
          const category = categories.find((c) => c.id === p.categoryId)
          return (
            <div key={p.id} className={styles.row}>
              <div
                className={styles.rowEmoji}
                style={{ background: category?.pale }}
              >
                {category?.emoji ?? '📦'}
              </div>
              <div className={styles.rowInfo}>
                <span className={styles.rowName}>{p.name}</span>
                <span
                  className={styles.rowChip}
                  style={{ background: category?.pale, color: category?.color }}
                >
                  {category?.name}
                </span>
              </div>
              <span className={styles.rowPrice}>
                ${p.price.toLocaleString('es-AR')}
              </span>
              <div className={styles.rowActions}>
                <button
                  className={styles.btnEdit}
                  onClick={() => { setSelectedProduct(p); setModalOpen(true) }}
                  aria-label={`Editar ${p.name}`}
                >
                  <Pencil size={15} strokeWidth={2} />
                </button>
                <button
                  className={styles.btnDelete}
                  onClick={() => handleDelete(p.id)}
                  aria-label={`Eliminar ${p.name}`}
                >
                  <Trash2 size={15} strokeWidth={2} />
                </button>
              </div>
            </div>
          )
        })}
      </motion.div>

      <ProductModal
        isOpen={modalOpen}
        selectedProduct={selectedProduct}
        categories={categories}
        onClose={() => { setModalOpen(false); setSelectedProduct(null) }}
        onSave={() => { getProducts().then(setProducts) }}
      />

    </motion.div>
  )
}