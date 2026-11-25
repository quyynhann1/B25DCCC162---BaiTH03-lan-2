import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { fetchProducts } from "../features/products/productsSlice";
import { addToCart } from "../features/cart/cartSlice";
import { formatPrice } from "../utils/format";
import NotFoundPage from "./NotFoundPage";

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { items, status, error } = useAppSelector((s) => s.products);

  // Vào thẳng URL chi tiết (F5) thì store trống -> tải lại danh sách
  useEffect(() => {
    if (status === "idle") {
      void dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  if (status === "idle" || status === "loading") {
    return <p className="state-msg">Đang tải sản phẩm...</p>;
  }
  if (status === "failed") {
    return <p className="state-msg error">⚠️ {error}</p>;
  }

  const product = items.find((p) => p.id === Number(id));
  if (!product) return <NotFoundPage />;

  return (
    <section className="detail">
      <Link to="/" className="back-link">
        ← Quay lại trang chủ
      </Link>
      <div className="detail-grid">
        <div className="detail-image">
          <img src={product.image} alt={product.title} />
        </div>
        <div className="detail-info">
          <span className="category">{product.category}</span>
          <h1>{product.title}</h1>
          <p className="price price-lg">{formatPrice(product.price)}</p>
          <p className="description">{product.description}</p>
          <button
            className="btn btn-primary"
            onClick={() => dispatch(addToCart(product))}
          >
            Thêm vào giỏ
          </button>
        </div>
      </div>
    </section>
  );
}
