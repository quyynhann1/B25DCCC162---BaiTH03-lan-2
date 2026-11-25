import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  clearCart,
  removeFromCart,
  selectCartItems,
  selectTotalPrice,
  selectTotalQuantity,
  updateQuantity,
} from "../features/cart/cartSlice";
import { formatPrice } from "../utils/format";

export default function CartPage() {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectCartItems);
  const totalQuantity = useAppSelector(selectTotalQuantity);
  const totalPrice = useAppSelector(selectTotalPrice);

  if (items.length === 0) {
    return (
      <section className="state-msg">
        <h1>Giỏ hàng</h1>
        <p>Giỏ hàng của bạn đang trống.</p>
        <Link to="/" className="btn btn-primary">
          Tiếp tục mua sắm
        </Link>
      </section>
    );
  }

  return (
    <section>
      <h1>Giỏ hàng</h1>
      <div className="table-wrap">
        <table className="cart-table">
          <thead>
            <tr>
              <th>Sản phẩm</th>
              <th>Đơn giá</th>
              <th>Số lượng</th>
              <th>Thành tiền</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {items.map(({ product, quantity }) => (
              <tr key={product.id}>
                <td className="cart-product">
                  <img src={product.image} alt={product.title} />
                  <Link to={`/products/${product.id}`}>{product.title}</Link>
                </td>
                <td>{formatPrice(product.price)}</td>
                <td>
                  <div className="qty">
                    <button
                      className="btn btn-icon"
                      onClick={() =>
                        dispatch(
                          updateQuantity({ id: product.id, quantity: quantity - 1 }),
                        )
                      }
                      aria-label="Giảm số lượng"
                    >
                      −
                    </button>
                    <span>{quantity}</span>
                    <button
                      className="btn btn-icon"
                      onClick={() =>
                        dispatch(
                          updateQuantity({ id: product.id, quantity: quantity + 1 }),
                        )
                      }
                      aria-label="Tăng số lượng"
                    >
                      +
                    </button>
                  </div>
                </td>
                <td>{formatPrice(product.price * quantity)}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => dispatch(removeFromCart(product.id))}
                  >
                    Xoá
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="summary">
        <p>
          Tổng số lượng: <strong>{totalQuantity}</strong>
        </p>
        <p>
          Tổng tiền: <strong className="price">{formatPrice(totalPrice)}</strong>
        </p>
        <div className="summary-actions">
          <button className="btn btn-outline" onClick={() => dispatch(clearCart())}>
            Xoá giỏ hàng
          </button>
          <Link to="/checkout" className="btn btn-primary">
            Thanh toán
          </Link>
        </div>
      </div>
    </section>
  );
}
