import { useNavigate } from "react-router-dom";
import { Product } from "../types/product";
import "../../../styles/productCard.css";

type Props = {
  product: Product;
};

function ProductCard({ product }: Props) {
  const isLowStock = product.stock <= product.minStock;
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <div className="product-card" onClick={handleClick} style={{ cursor: "pointer" }}>
      <img src={product.imageUrl} alt={product.name} className="product-image" />
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <span className="product-category">{product.category}</span>
      </div>
      <div className={`product-stock ${isLowStock ? "low-stock" : ""}`}>
        {isLowStock
          ? `⚠️ Stock bajo: ${product.stock}`
          : `Stock: ${product.stock}`}
      </div>
    </div>
  );
}

export default ProductCard;
