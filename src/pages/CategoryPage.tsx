import { useParams } from "react-router-dom"
import { categories } from "../data/categories"
import { products } from "../data/products"
import { ProductGrid } from "../components/ProductGrid/ProductGrid"




export default function CategoryPage() {

  const { slug } = useParams();
  const category = categories.find((c) => c.slug === slug);
  const filteredProducts = products.filter( (p) => p.categoryId === category?.id )

  if(!category) return <div>Categoria no encontrada</div>

  return(
    <div>
    <h1>CategoryPage</h1>
    <ProductGrid 
      products={filteredProducts}
      category={category}
    />
  </div>
  )
  
   
}