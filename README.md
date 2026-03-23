# Multitienda 🛍️

Catálogo digital con contacto directo por WhatsApp. Pensado para negocios multirubro que quieren mostrar sus productos de forma simple y que el cliente consulte en un solo toque.

🔗 **[Ver demo](https://catalogo-whatsapp-tau.vercel.app/)** ← reemplazá con el link real

---

## ¿Qué hace?

- Explorá productos por categoría: Ropa, Juguetes, Bijouterie, Regalería, Bazar y Varios
- Buscá productos en tiempo real desde el Home
- Consultá el detalle de cada producto
- Contactá directo por WhatsApp con un mensaje predefinido que incluye nombre y precio del producto

---

## Stack

- **React 18** + **TypeScript**
- **React Router v6** — navegación entre pantallas
- **Vite** — bundler y dev server
- **CSS Modules** — estilos por componente
- **Lucide React** — íconos

---

## Estructura del proyecto

```
src/
├── types/          # Interfaces TypeScript (Product, Category)
├── data/           # Datos hardcodeados (categories.ts, products.ts)
├── components/     # Componentes reutilizables
│   ├── CategoryCard/
│   ├── CategoryGrid/
│   ├── ProductCard/
│   ├── ProductGrid/
│   ├── SearchBar/
│   └── WhatsAppButton/
├── pages/          # Pantallas de la app
│   ├── Home.tsx
│   ├── CategoryPage.tsx
│   └── ProductDetail.tsx
└── config.ts       # Número de WhatsApp y configuración global
```

---

## Pantallas

| Ruta | Pantalla | Descripción |
|------|----------|-------------|
| `/` | Home | Grid de categorías + buscador |
| `/categoria/:slug` | CategoryPage | Productos de una categoría |
| `/producto/:id` | ProductDetail | Detalle + botón de WhatsApp |

---

## Correr el proyecto localmente

```bash
# Clonar el repositorio
git clone https://github.com/Marcus-dev-31/Catalogo

# Instalar dependencias
npm install

# Iniciar el servidor de desarrollo
npm run dev
```

---

## Configuración

El número de WhatsApp se configura en `src/config.ts`:

```ts
export const WHATSAPP_NUMBER = "549XXXXXXXXXX"
```

Formato: código de país (`549` para Argentina) + número sin el `0` inicial.

---

## Roadmap

- [x] Frontend completo con TypeScript
- [x] Navegación con React Router
- [x] Búsqueda con debounce
- [x] Integración con WhatsApp
- [ ] Testing con Vitest + React Testing Library
- [ ] Backend con Node.js + Express
- [ ] Base de datos con PostgreSQL
- [ ] Panel de administración
- [ ] Autenticación
- [ ] Imágenes reales con Cloudinary
- [ ] Corrección ortográfica con IA en el panel de admin

---

## Decisiones técnicas

**¿Por qué los datos están hardcodeados?**
Es la v1 del proyecto. La estructura de `data/` refleja exactamente cómo va a responder la API cuando el backend esté listo. La migración va a ser mínima.

**¿Por qué CSS Modules y no Tailwind?**
El diseño tiene valores específicos y gradientes dinámicos por categoría. CSS Modules da control total sobre cada componente sin depender de clases predefinidas.

**¿Por qué el estado del buscador vive en Home y no en SearchBar?**
`Home` necesita el valor para filtrar los productos. Si el estado viviera en `SearchBar`, el padre no podría leerlo. Lifting state up.

---

Desarrollado por **Marcos** — estudiante de Tecnicatura en Programación, UTN Haedo.