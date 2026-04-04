import { Link } from "react-router-dom";
import { useFetch } from "../../hooks/useApi";
import { getProducts, getCategories } from "../../services/api";
import { Plus, Tag, Link2 } from "lucide-react";

export default function Dashboard() {
  const { data: products } = useFetch(getProducts);
  const { data: categories } = useFetch(getCategories);

  return (
    <>
      <nav>
        <span>logo</span>
        <h1>Multitienda</h1>
        <span>admin</span>
        <button>Salir</button>
      </nav>

      <section>
        <h2>Hola Admin</h2>
        <span>emoji</span>
        <p>Todo bajo control</p>

        {/* Seccion resumen */}
        <div>
          <h3>Resumen</h3>
          <div>
            <p>productos</p>
            <span>{products?.length ?? 0}</span>
          </div>
          <div>
            <p>Categorias</p>
            <span>{categories?.length ?? 0}</span>
          </div>
        </div>
      </section>

      {/* Acciones Rapidas */}
      <section>
        <h3>Acciones rapidas</h3>
        <Link to="/admin/products">
          <Plus size={20} />
          <strong>Agregar producto</strong>
          <small>Nuevo item al catálogo</small>
        </Link>
        <Link to="/admin/categories">
          <Tag size={20} />
          <strong>Agregar Categoria</strong>
          <small>Nueva Seccion en el Home</small>
        </Link>
        <a href="/" target="_blank" rel="noopener noreferrer">
          <Link2 size={20} />
          <strong>Ver Catálogo</strong>
          <small>Como lo ve el cliente</small>
        </a>
      </section>

      <section>
        <h3>Ultimos Productos</h3>

        {products?.slice(-3).map((p) => {
          const category = categories?.find((c) => c.id === p.categoryId);
          return (
            <div key={p.id}>
              <span>{category?.emoji ?? "📦"}</span>
              <span>{p.name}</span>
              <span>${p.price.toLocaleString("es-AR")}</span>
            </div>
          );
        })}
      </section>
    </>
  );
}
