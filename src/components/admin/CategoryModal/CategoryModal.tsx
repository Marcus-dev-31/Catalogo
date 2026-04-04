import { useState, useEffect } from "react";
import type { Category } from "../../../types";
import { createCategory, updateCategory } from "../../../services/api";

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
  const [color, setColor] = useState("");
  const [pale, setPale] = useState("");
  const [gradient, setGradient] = useState("");

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const data = { name, emoji, slug, color, pale, gradient };

    if (selectedCategory) {
      await updateCategory(selectedCategory.slug, data);
    } else {
      await createCategory(data);
    }

    onSave();
    onClose();
  };

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
      setColor("");
      setPale("");
      setGradient("");
    }
  }, [selectedCategory]);

  if (!isOpen) return null;

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Nombre</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label htmlFor="emoji">Emoji</label>
        <input
          id="emoji"
          type="text"
          value={emoji}
          onChange={(e) => setEmoji(e.target.value)}
        />

        <label htmlFor="text">slug</label>
        <input
          id="slug"
          type="text"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
        />

        <label htmlFor="color">Color Principal</label>
        <input
          id="color"
          type="color"
          value={color}
          onChange={(e) => {
            setColor(e.target.value);
            setGradient(
              `linear-gradient(145deg, ${e.target.value}CC, ${e.target.value}88)`,
            );
          }}
        />

        <label htmlFor="pale">Color Pale</label>
        <input
          id="pale"
          type="color"
          value={pale}
          onChange={(e) => setPale(e.target.value)}
        />

        <label htmlFor="gradiente">Gradiente</label>
        <input
          type="text"
          value={gradient}
          readOnly
        />

        <button type="button" onClick={onClose}>
          Cancelar
        </button>
        <button type="submit">Guardar</button>
      </form>
    </div>
  );
};
