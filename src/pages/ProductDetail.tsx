import { useParams, useNavigate } from "react-router-dom";
import { products } from "../data/products";
import { categories } from "../data/categories";
import { WhatsAppButton } from "../components/WhatsAppButton/WhatsAppButton";


export default function ProductDetail() {

  const { id } = useParams();
  const productSelected = products.find(
    (p) => p.id === Number(id),
  );

  const navigate = useNavigate();

  const category = categories.find((c) => c.id === productSelected?.categoryId)

  if (!productSelected) return <div>Producto no encontrado</div>;

  return (
    <>
      <div>
        <button onClick={() => navigate(-1)}>Volver</button>
        <img src={productSelected.image} alt={productSelected.name} />
        <span>
          {productSelected.price.toLocaleString("es-AR", {
            style: "currency",
            currency: "ARS",
          })}
        </span>
      </div>
      <div>
        <div>
          <span>icono</span>
          <p>{category?.name}</p>
        </div>
        <h3>{productSelected.name}</h3>
        <p>{productSelected.description}</p>
        <WhatsAppButton
          name={productSelected.name}
          price={productSelected.price}
        />
      </div>
    </>
  );
}
