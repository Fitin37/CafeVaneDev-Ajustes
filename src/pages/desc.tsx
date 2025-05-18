import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Product } from "../features/products/types/product";
import { productsMock } from "../data/products";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Swal from "sweetalert2";
import "../styles/product.css";

function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const foundProduct = productsMock.find((p) => p.id === id);
    setProduct(foundProduct ?? null);
  }, [id]);

  const rotateLeft = () => setRotation((prev) => prev - 15);
  const rotateRight = () => setRotation((prev) => prev + 15);

  const handleBuy = () => {
    Swal.fire({
      title: '¡Gracias por tu compra!',
      text: `${product?.name} ha sido agregado al carrito.`,
      icon: 'success',
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#8f5e3d'
    });
  };

  const goBack = () => {
    navigate("/"); // Cambia "/" por la ruta a tu menú si es diferente
  };

  if (!product) return <div className="loading">Producto no encontrado</div>;

  return (
    <motion.div
      className="product-detail-wrapper"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="top-buttons">
        <button className="back-btn" onClick={goBack}>← Volver al menú</button>
      </div>

      <div className="product-container">
        <div className="image-section">
          <button className="rotate-btn left" onClick={rotateLeft}>
            <ChevronLeft size={32} />
          </button>

          <motion.img
            src={product.imageUrl}
            alt={product.name}
            className="rotatable-image"
            animate={{ rotateY: rotation }}
            transition={{ type: "spring", stiffness: 100 }}
          />

          <button className="rotate-btn right" onClick={rotateRight}>
            <ChevronRight size={32} />
          </button>
        </div>

        <div className="info-section">
          <h1>{product.name}</h1>
          <p><strong>Categoría:</strong> {product.category}</p>
          <p><strong>Stock:</strong> {product.stock}</p>

          <button className="buy-btn" onClick={handleBuy}>Comprar</button>
        </div>
      </div>
    </motion.div>
  );
}

export default ProductPage;
