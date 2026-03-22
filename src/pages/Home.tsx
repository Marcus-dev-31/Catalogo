import { useState } from "react";
import { SearchBar } from "../components/SearchBar/SearchBar";
import { CategoryGrid } from "../components/CategoryGrid/CategoryGrid";
import { categories } from "../data/categories";
import { products } from "../data/products";

export default function Home() {
  const [query, setQuery] = useState("");

  return (
    <>
    <header>
      <h1>Multitienda</h1>
      <h3>Todo en un lugar</h3>
      <span>icono </span>
      <span>en linea</span>
      <SearchBar 
        value={query}
        onChange={setQuery}
      />
    </header>

    <main>
      <h2>explorá por categoria</h2>
      <CategoryGrid
        categories={categories}
        products={products}
      />
    </main>
      
    </>
  );
}
