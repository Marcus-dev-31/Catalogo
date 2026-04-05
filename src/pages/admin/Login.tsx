import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/api";
import styles from "./Login.module.css";
import { motion } from "framer-motion";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const { token } = await login(email, password);
      localStorage.setItem("token", token);
      navigate("/admin");
    } catch {
      setError("Email o contraseña incorrectos");
    }
  };

  return (
    <main className={styles.page}>
      <div className={styles.card}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.42, ease: [0.4, 0, 0.2, 1] }}
        >
          <div className={styles.logoIcon}>🏪</div>
          <h1 className={styles.title}>
            Un Poco De Todo
            <br />
            Admin
          </h1>
          <p className={styles.sub}>
            Ingresá con tu cuenta para gestionar el catálogo
          </p>
        </motion.div>

        <motion.form
          className={styles.form}
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.42, ease: [0.4, 0, 0.2, 1], delay: 0.08 }}
        >
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="email">
              Email
            </label>
            <input
              className={styles.input}
              id="email"
              type="email"
              placeholder="admin@unpocdetodo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="password">
              Contraseña
            </label>
            <input
              className={styles.input}
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && <p className={styles.error}>{error}</p>}

          <button className={styles.btn} type="submit">
            Ingresar al panel
          </button>
        </motion.form>

        <motion.div
          className={styles.footer}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.38, delay: 0.22 }}
        >
          <span className={styles.footerDot} />
          <span className={styles.footerText}>
            Acceso restringido — solo administradores
          </span>
        </motion.div>
      </div>
    </main>
  );
}
