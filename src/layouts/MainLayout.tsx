import { Outlet } from "react-router-dom";
import Header from "../components/Header";

export default function MainLayout() {
  return (
    <>
      <Header />
      <main className="container main">
        <Outlet />
      </main>
      <footer className="footer">© 2026 ShopMini – Bài thực hành 03</footer>
    </>
  );
}
