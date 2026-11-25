import { useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  clearCart,
  selectCartItems,
  selectTotalPrice,
} from "../features/cart/cartSlice";
import { useAuth } from "../contexts/AuthContext";
import { formatPrice } from "../utils/format";

export default function CheckoutPage() {
  const dispatch = useAppDispatch();
  const { user } = useAuth();
  const items = useAppSelector(selectCartItems);
  const totalPrice = useAppSelector(selectTotalPrice);
  // Trạng thái "đã đặt hàng" chỉ dùng ở trang này -> useState
  const [ordered, setOrdered] = useState(false);

  const handleOrder = () => {
    dispatch(clearCart());
    setOrdered(true);
  };

  if (ordered) {
    return (
      <section className="state-msg success">
        <h1>✅ Đặt hàng thành công!</h1>
        <p>Cảm ơn {user?.username} đã mua hàng tại ShopMini.</p>
        <Link to="/" className="btn btn-primary">
          Tiếp tục mua sắm
        </Link>
      </section>
    );
  }

  if (items.length === 0) {
    return (
      <section className="state-msg">
        <h1>Thanh toán</h1>
        <p>Giỏ hàng trống, hãy chọn sản phẩm trước khi thanh toán.</p>
        <Link to="/" className="btn btn-primary">
          Về trang chủ
        </Link>
      </section>
    );
  }

  return (
    <section>
      <h1>Thanh toán</h1>
      <p>
        Người đặt hàng: <strong>{user?.username}</strong>
      </p>
      <ul className="order-list">
        {items.map(({ product, quantity }) => (
          <li key={product.id}>
            <span>
              {product.title} × {quantity}
            </span>
            <span>{formatPrice(product.price * quantity)}</span>
          </li>
        ))}
      </ul>
      <p className="summary">
        Tổng tiền: <strong className="price">{formatPrice(totalPrice)}</strong>
      </p>
      <button className="btn btn-primary" onClick={handleOrder}>
        Đặt hàng
      </button>
    </section>
  );
}
