import { useEffect, useState } from "react";
import type { Category } from "../../types";
import { deleteCategory, getCategories } from "../../services/api";
import { Pencil, Trash2 } from "lucide-react";
import { CategoryModal } from "../../components/admin/CategoryModal/CategoryModal";

export default function AdminCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  const handleDelete = async (slug: string) => {
      if (!confirm('¿Seguro que querés eliminar esta categoria?')) return;
  
      await deleteCategory(slug);
      setCategories(prev => prev.filter(c => c.slug !== slug))
    }

    useEffect(() => {
      getCategories().then(data => setCategories(data))
    }, [])

  return(
    <>
      <nav>
        <span>Icono</span>
        <h1>Categorias</h1>
        <p>Salir</p>
      </nav>

      <section>
        <button onClick={() => {
          setSelectedCategory(null)
          setModalOpen(true)
        }}>+Agregar Categoria</button>
        <p>Categorias</p>
        <ul>
          {categories.map((c) => (
            <li key={c.slug}>
              <span>{c.name}</span>
              <div>
                <span></span>
                <button onClick={() => {
                  setSelectedCategory(c);
                  setModalOpen(true);
                }}>
                  <Pencil size={16} />
                </button>
                <button onClick={() => handleDelete(c.slug)}>
                  <Trash2 size={16} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <CategoryModal
        isOpen={modalOpen}
        selectedCategory={selectedCategory}
        onClose={() => {
          setModalOpen(false);
          setSelectedCategory(null);
        }}
        onSave={() => {
          getCategories().then(data => setCategories(data))
        }}
      />
    </>
  )
}
