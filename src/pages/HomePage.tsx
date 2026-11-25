import { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { fetchProducts } from "../features/products/productsSlice";
import ProductCard from "../components/ProductCard";

export default function HomePage() {
  const dispatch = useAppDispatch();
  const { items, status, error } = useAppSelector((s) => s.products);
  // Từ khoá tìm kiếm chỉ dùng trong trang này -> useState
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    if (status === "idle") {
      void dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  const filtered = useMemo(() => {
    const k = keyword.trim().toLowerCase();
    return k ? items.filter((p) => p.title.toLowerCase().includes(k)) : items;
  }, [items, keyword]);

  return (
    <section>
      <div className="toolbar">
        <h1>Sản phẩm</h1>
        <input
          type="search"
          className="input search"
          placeholder="Tìm sản phẩm theo tên..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
      </div>

      {status === "loading" && <p className="state-msg">Đang tải sản phẩm...</p>}

      {status === "failed" && (
        <div className="state-msg error">
          <p>⚠️ {error}</p>
          <button
            className="btn btn-primary"
            onClick={() => void dispatch(fetchProducts())}
          >
            Thử lại
          </button>
        </div>
      )}

      {status === "succeeded" &&
        (filtered.length === 0 ? (
          <p className="state-msg">Không tìm thấy sản phẩm phù hợp.</p>
        ) : (
          <div className="grid">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        ))}
    </section>
  );
}
