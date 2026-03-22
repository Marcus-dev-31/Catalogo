import { WHATSAPP_NUMBER } from "../../config";

interface WhatsAppButtonProps {
  name: string;
  price: number;
}

export const WhatsAppButton = ({ name, price }: WhatsAppButtonProps) => {
  const message = encodeURIComponent(
    `Hola! Me interesa *${name}* - $${price.toLocaleString("es-AR")}. Está disponible?`,
  );

  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;

  return (
    <a href={url} target="_blank" rel="noopener noreferrer">
      <span>icono</span>
      <p>Consultar por Whatsapp</p>
    </a>
  );
};
