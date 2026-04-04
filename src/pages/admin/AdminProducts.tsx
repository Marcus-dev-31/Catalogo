import { useState, useEffect } from "react";
import type { Category, Product } from "../../types";
import { deleteProduct, getCategories, getProducts } from "../../services/api";
import { Pencil, Trash2 } from 'lucide-react'
import { ProductModal } from "../../components/admin/ProductModal/ProductModal";

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([])
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(
    null,
  );


  const handleDelete = async (id: number) => {
    if (!confirm('¿Seguro que querés eliminar este producto?')) return;

    await deleteProduct(id);
    setProducts(prev => prev.filter(p => p.id !== id))
  }


  useEffect(() => {
  getProducts().then(data => setProducts(data))
}, [])

useEffect(() => {
  getCategories().then(data => setCategories(data))
}, [])

  return (
    <>
      <nav>
        <span>Icono</span>
        <h1>Productos</h1>
        <p>Salir</p>
      </nav>

      <section>
        <button onClick={() => {
          setSelectedProduct(null)
          setModalOpen(true)
        }}>+Agregar Producto</button>
        <p>Todos los Productos</p>
        <ul>
          {products.map((p) => (
            <li key={p.id}>
              <span>{p.name}</span>
              <div>
                <span>${p.price.toLocaleString('es-Ar')}</span>
                <button onClick={() => {
                  setSelectedProduct(p);
                  setModalOpen(true);
                }}>
                  <Pencil size={16} />
                </button>
                <button onClick={() => handleDelete(p.id)}>
                  <Trash2 size={16} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <ProductModal 
        isOpen={modalOpen}
        selectedProduct={selectedProduct}
        categories={categories}
        onClose={() => {
          setModalOpen(false)
          setSelectedProduct(null)
        }}
        onSave={() => {
          getProducts().then(data => setProducts(data))
        }}
      />
    </>
  );
}
