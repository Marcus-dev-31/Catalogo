import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Home from "./pages/Home/Home";
import CategoryPage from "./pages/CategoryPage/CategoryPage";
import ProductDetail from "./pages/ProductDetail/ProductDetail";
import styles from "./App.module.css";
import NotFound from "./pages/NotFound/NotFound";
import AdminLayout from "./components/admin/AdminLayout/AdminLayout";
import PrivateRoute from "./components/admin/PrivateRoute/PrivateRoute";
import Login from "./pages/admin/Login";
import Dashboard from "./pages/admin/Dashboard";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminCategories from "./pages/admin/AdminCategories";

const pageVariants = {
  initial: { x: "100%", opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: "-100%", opacity: 0 },
};

const pageTransition = { duration: 0.28, ease: [0.32, 0, 0.67, 0] as const };

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={pageTransition}
        style={{ width: "100%", height: "100%" }}
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/categoria/:slug" element={<CategoryPage />} />
          <Route path="/producto/:id" element={<ProductDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <div className={styles.appShell}>
      <BrowserRouter>
        <Routes>
          <Route path="/admin/login" element={<Login />} />
          <Route
            path="/admin"
            element={
              <PrivateRoute>
                <AdminLayout />
              </PrivateRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="categories" element={<AdminCategories />} />
          </Route>
          <Route path="/*" element={<AnimatedRoutes />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
