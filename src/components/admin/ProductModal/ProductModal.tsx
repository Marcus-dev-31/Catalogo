import { useState, useEffect } from "react";
import type { Category, Product } from "../../../types";
import { createProduct, updateProduct } from "../../../services/api";

interface ProductModalProps {
  isOpen: boolean;
  selectedProduct: Product | null;
  categories: Category[];
  onClose: () => void;
  onSave: () => void;
}

export const ProductModal = ({ isOpen, selectedProduct, categories, onClose, onSave }: ProductModalProps) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState(0);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const data = { name, price, image, description, categoryId }

    if (selectedProduct) {
        await updateProduct(selectedProduct.id, data)
    } else {
        await createProduct(data)
    }

    onSave();
    onClose();
  }

  useEffect(() => {
  if (selectedProduct) {
    setName(selectedProduct.name)
    setPrice(selectedProduct.price)
    setImage(selectedProduct.image)
    setDescription(selectedProduct.description)
    setCategoryId(selectedProduct.categoryId)
  } else {
    setName('')
    setPrice(0)
    setImage('')
    setDescription('')
    setCategoryId(0)
  }
}, [selectedProduct])

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

        <label htmlFor="price">Precio</label>
        <input
          id="price"
          type="number"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
        />

        <label htmlFor="image">Imagen (URL)</label>
        <input
          id="image"
          type="url"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />

        <label htmlFor="description">Descripción</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <label htmlFor="category">Categoría</label>
        <select
          id="category"
          value={categoryId}
          onChange={(e) => setCategoryId(Number(e.target.value))}
        >
          <option value="">Seleccionar categoría</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.emoji} {c.name}
            </option>
          ))}
        </select>

        <button type="button" onClick={onClose}>Cancelar</button>
        <button type="submit">Guardar</button>
      </form>
    </div>
  );
};
