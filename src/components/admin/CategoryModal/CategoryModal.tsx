import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import type { Category } from "../../../types";
import { createCategory, updateCategory } from "../../../services/api";
import styles from "./CategoryModal.module.css";

interface CategoryModalProps {
  isOpen: boolean;
  selectedCategory: Category | null;
  onClose: () => void;
  onSave: () => void;
}

export const CategoryModal = ({
  isOpen,
  selectedCategory,
  onClose,
  onSave,
}: CategoryModalProps) => {
  const [name, setName] = useState("");
  const [emoji, setEmoji] = useState("");
  const [slug, setSlug] = useState("");
  const [color, setColor] = useState("#FF4500");
  const [pale, setPale] = useState("#FFF0EB");
  const [gradient, setGradient] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.SyntheticEvent) => {
  e.preventDefault()
  setSubmitting(true)
  try {
    const data = { name, emoji, slug, color, pale, gradient }
    if (selectedCategory) {
      await updateCategory(selectedCategory.slug, data)
    } else {
      await createCategory(data)
    }
    onSave()
    onClose()
  } finally {
    setSubmitting(false)
  }
}

  useEffect(() => {
    if (selectedCategory) {
      setName(selectedCategory.name);
      setEmoji(selectedCategory.emoji);
      setSlug(selectedCategory.slug);
      setColor(selectedCategory.color);
      setPale(selectedCategory.pale);
      setGradient(selectedCategory.gradient);
    } else {
      setName("");
      setEmoji("");
      setSlug("");
      setColor("#FF4500");
      setPale("#FFF0EB");
      setGradient("linear-gradient(145deg, #FF4500, #FF7843)");
    }
  }, [selectedCategory]);

  const handleColorChange = (value: string) => {
    setColor(value);
    setGradient(`linear-gradient(145deg, ${value}, ${value}CC)`);
  };

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className={styles.overlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28 }}
            onClick={onClose}
          />

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
                {selectedCategory ? "Editar categoría" : "Agregar categoría"}
              </h2>
              <button className={styles.closeBtn} onClick={onClose}>
                ✕
              </button>
            </div>

            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label className={styles.label} htmlFor="name">
                    Nombre
                  </label>
                  <input
                    className={styles.input}
                    id="name"
                    type="text"
                    placeholder="Ej: Ropa"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label} htmlFor="emoji">
                    Emoji
                  </label>
                  <input
                    className={styles.input}
                    id="emoji"
                    type="text"
                    placeholder="👗"
                    value={emoji}
                    onChange={(e) => setEmoji(e.target.value)}
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="slug">
                  Slug
                </label>
                <input
                  className={styles.input}
                  id="slug"
                  type="text"
                  placeholder="ropa"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                />
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label className={styles.label} htmlFor="color">
                    Color principal
                  </label>
                  <div className={styles.colorRow}>
                    <input
                      className={styles.colorSwatch}
                      id="color"
                      type="color"
                      value={color}
                      onChange={(e) => handleColorChange(e.target.value)}
                    />
                    <input
                      className={styles.input}
                      type="text"
                      value={color}
                      onChange={(e) => handleColorChange(e.target.value)}
                    />
                  </div>
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label} htmlFor="pale">
                    Color pale
                  </label>
                  <div className={styles.colorRow}>
                    <input
                      className={styles.colorSwatch}
                      id="pale"
                      type="color"
                      value={pale}
                      onChange={(e) => setPale(e.target.value)}
                    />
                    <input
                      className={styles.input}
                      type="text"
                      value={pale}
                      onChange={(e) => setPale(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Gradiente</label>
                <div
                  className={styles.gradientPreview}
                  style={{ background: gradient }}
                />
                <input
                  className={styles.input}
                  type="text"
                  value={gradient}
                  readOnly
                />
              </div>

              <div className={styles.actions}>
                <button 
                  className={styles.btnSave} 
                  type="submit"
                  disabled={submitting}
                >
                  {submitting ? 'Guardando...' : selectedCategory ? 'Guardar cambios' : 'Agregar categoría'}
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
