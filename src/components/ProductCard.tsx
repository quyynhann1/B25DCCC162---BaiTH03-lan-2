import { Link } from "react-router-dom";
import { useAppDispatch } from "../app/hooks";
import { addToCart } from "../features/cart/cartSlice";
import type { Product } from "../types";
import { formatPrice } from "../utils/format";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const dispatch = useAppDispatch();

  return (
    <article className="card">
      <Link to={`/products/${product.id}`} className="card-image">
        <img src={product.image} alt={product.title} loading="lazy" />
      </Link>
      <div className="card-body">
        <span className="category">{product.category}</span>
        <h3 className="card-title" title={product.title}>
          <Link to={`/products/${product.id}`}>{product.title}</Link>
        </h3>
        <p className="price">{formatPrice(product.price)}</p>
        <button
          className="btn btn-primary"
          onClick={() => dispatch(addToCart(product))}
        >
          Thêm vào giỏ
        </button>
      </div>
    </article>
  );
}
