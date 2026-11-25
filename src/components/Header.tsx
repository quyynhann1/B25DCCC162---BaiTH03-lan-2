import { Link } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import { selectTotalQuantity } from "../features/cart/cartSlice";
import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";

export default function Header() {
  const totalQuantity = useAppSelector(selectTotalQuantity);
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="header">
      <div className="container header-inner">
        <Link to="/" className="logo">
          🛍️ ShopMini
        </Link>
        <nav className="nav">
          <Link to="/cart" className="nav-link">
            🛒 Giỏ hàng
            <span className="badge" aria-label="Số sản phẩm trong giỏ">
              {totalQuantity}
            </span>
          </Link>
          {user ? (
            <>
              <span className="username">👤 {user.username}</span>
              <button className="btn btn-outline" onClick={logout}>
                Đăng xuất
              </button>
            </>
          ) : (
            <Link to="/login" className="btn btn-outline">
              Đăng nhập
            </Link>
          )}
          <button
            className="btn btn-icon"
            onClick={toggleTheme}
            aria-label="Đổi giao diện sáng/tối"
            title="Đổi giao diện sáng/tối"
          >
            {theme === "light" ? "🌙" : "☀️"}
          </button>
        </nav>
      </div>
    </header>
  );
}
