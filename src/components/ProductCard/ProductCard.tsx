import { useNavigate } from "react-router-dom";
import type { Product } from "../../types";

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const navigate = useNavigate();

  return (
    <div onClick={() => navigate(`/producto/${product.id}`)}>
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <span>
        {product.price.toLocaleString("es-AR", {
          style: "currency",
          currency: "ARS",
        })}
      </span>
    </div>
  );
};
