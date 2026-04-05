import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import type { Category, Product } from "../../../types";
import { createProduct, updateProduct } from "../../../services/api";
import styles from "./ProductModal.module.css";

interface ProductModalProps {
  isOpen: boolean;
  selectedProduct: Product | null;
  categories: Category[];
  onClose: () => void;
  onSave: () => void;
}

export const ProductModal = ({
  isOpen,
  selectedProduct,
  categories,
  onClose,
  onSave,
}: ProductModalProps) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [correcting, setCorrecting] = useState(false);

  
  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const data = { name, price, image, description, categoryId };
      if (selectedProduct) {
        await updateProduct(selectedProduct.id, data);
      } else {
        await createProduct(data);
      }

      onSave();
      onClose();
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    if (selectedProduct) {
      setName(selectedProduct.name);
      setPrice(selectedProduct.price);
      setImage(selectedProduct.image);
      setDescription(selectedProduct.description);
      setCategoryId(selectedProduct.categoryId);
    } else {
      setName("");
      setPrice(0);
      setImage("");
      setDescription("");
      setCategoryId(0);
    }
  }, [selectedProduct]);

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className={styles.overlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28 }}
            onClick={onClose}
          />

          {/* Sheet */}
          <motion.div
            className={styles.sheet}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 320 }}
          >
            <div className={styles.handle} />

            <div className={styles.head}>
              <h2 className={styles.title}>
                {selectedProduct ? "Editar producto" : "Agregar producto"}
              </h2>
              <button className={styles.closeBtn} onClick={onClose}>
                ✕
              </button>
            </div>

            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="name">
                  Nombre
                </label>
                <input
                  className={styles.input}
                  id="name"
                  type="text"
                  placeholder="Ej: Remera oversize estampada"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label className={styles.label} htmlFor="price">
                    Precio
                  </label>
                  <input
                    className={styles.input}
                    id="price"
                    type="number"
                    placeholder="0"
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label} htmlFor="category">
                    Categoría
                  </label>
                  <select
                    className={styles.select}
                    id="category"
                    value={categoryId}
                    onChange={(e) => setCategoryId(Number(e.target.value))}
                  >
                    <option value="">Seleccionar</option>
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.emoji} {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="image">
                  URL de imagen
                </label>
                <input
                  className={styles.input}
                  id="image"
                  type="url"
                  placeholder="https://..."
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="description">
                  Descripción
                </label>
                <textarea
                  className={styles.textarea}
                  id="description"
                  placeholder="Descripción del producto..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <button
                  type="button"
                  className={styles.btnCorrect}
                  onClick={handleCorrect}
                  disabled={correcting || !description.trim()}
                >
                  {correcting ? "Corrigiendo..." : "✨ Corregir ortografía"}
                </button>
              </div>

              <div className={styles.actions}>
                <button
                  className={styles.btnSave}
                  type="submit"
                  disabled={submitting}
                >
                  {submitting
                    ? "Guardando..."
                    : selectedProduct
                      ? "Guardar cambios"
                      : "Agregar producto"}
                </button>
                <button
                  className={styles.btnCancel}
                  type="button"
                  onClick={onClose}
                >
                  Cancelar
                </button>
              </div>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body,
  );
};
