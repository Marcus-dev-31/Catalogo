import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import styles from "./AdminLayout.module.css";

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogOut = () => {
    localStorage.removeItem("token");
    navigate("/admin/login");
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className={styles.shell}>
      <header className={styles.topbar}>
        <div className={styles.brand}>
          <div className={styles.logoIcon}>🏪</div>
          <span className={styles.logoName}>Multitienda</span>
          <span className={styles.logoBadge}>Admin</span>
        </div>
        <button className={styles.logoutBtn} onClick={handleLogOut}>
          Salir
        </button>
      </header>

      <main className={styles.content}>
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, x: 18 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.32, ease: [0.4, 0, 0.2, 1] }}
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            width: "100%",
          }}
        >
          <Outlet />
        </motion.div>
      </main>

      <nav className={styles.bottomNav}>
        <Link
          to="/admin"
          className={`${styles.tab} ${isActive("/admin") ? styles.tabActive : ""}`}
        >
          <span className={styles.tabIcon}>🏠</span>
          <span className={styles.tabLabel}>Inicio</span>
        </Link>
        <Link
          to="/admin/products"
          className={`${styles.tab} ${isActive("/admin/products") ? styles.tabActive : ""}`}
        >
          <span className={styles.tabIcon}>📦</span>
          <span className={styles.tabLabel}>Productos</span>
        </Link>
        <Link
          to="/admin/categories"
          className={`${styles.tab} ${isActive("/admin/categories") ? styles.tabActive : ""}`}
        >
          <span className={styles.tabIcon}>🏷️</span>
          <span className={styles.tabLabel}>Categorías</span>
        </Link>
      </nav>
    </div>
  );
}
