import { Link, Outlet, useNavigate } from "react-router-dom";

export default function AdminLayout() {

  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem('token');
    navigate('/admin/login')
  }

  return (
    <div>
      <button onClick={handleLogOut}>Cerrar sesion</button>
      <Outlet />
      <nav>
        <Link to="/admin">Inicio</Link>
        <Link to="/admin/products">Productos</Link>
        <Link to="/admin/categories">Categorias</Link>
        <Outlet />
      </nav>
    </div>
  );
}
