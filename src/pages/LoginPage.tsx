import { useState, type FormEvent } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

interface LocationState {
  from?: { pathname: string; search?: string };
}

export default function LoginPage() {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as LocationState | null)?.from;
  const redirectTo = from ? `${from.pathname}${from.search ?? ""}` : "/";

  // Dữ liệu form chỉ dùng cục bộ -> useState
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (user) return <Navigate to={redirectTo} replace />;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    const ok = await login(username, password);
    setSubmitting(false);
    if (ok) {
      navigate(redirectTo, { replace: true });
    } else {
      setError("Sai tên đăng nhập hoặc mật khẩu (mật khẩu đúng: 123456)");
    }
  };

  return (
    <section className="auth-box">
      <h1>Đăng nhập</h1>
      {from && <p className="hint">Bạn cần đăng nhập để tiếp tục.</p>}
      <form onSubmit={handleSubmit} className="form">
        <label>
          Tên đăng nhập
          <input
            className="input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoFocus
            required
          />
        </label>
        <label>
          Mật khẩu
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {error && <p className="error-text">{error}</p>}
        <button className="btn btn-primary" type="submit" disabled={submitting}>
          {submitting ? "Đang đăng nhập..." : "Đăng nhập"}
        </button>
      </form>
    </section>
  );
}
