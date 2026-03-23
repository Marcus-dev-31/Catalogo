import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import styles from "./NotFound.module.css"

export default function NotFound() {
  const navigate = useNavigate()

  return (
    <main className={styles.page}>
      <motion.div
        className={styles.content}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.42, ease: [0.4, 0, 0.2, 1] }}
      >
        <motion.span
          className={styles.emoji}
          animate={{ rotate: [0, -10, 10, -10, 10, 0] }}
          transition={{ delay: 0.5, duration: 0.6, ease: "easeInOut" }}
        >
          🛒
        </motion.span>

        <h1 className={styles.code}>404</h1>
        <p className={styles.title}>Esta página no existe</p>
        <p className={styles.sub}>
          Pero tranqui — tenemos ropa, juguetes, bijouterie,
          regalería, bazar y más. Lo tuyo está acá adentro.
        </p>

        <button className={styles.btn} onClick={() => navigate("/")}>
          Volver al inicio
        </button>
      </motion.div>
    </main>
  )
}