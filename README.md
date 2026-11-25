# ShopMini – Bài thực hành 03 (TH01)

Ứng dụng cửa hàng mini xây dựng bằng **React + TypeScript (Vite)**, quản lý state toàn cục bằng **Context API** và **Redux Toolkit**.

## Chạy dự án

```bash
npm install
npm run dev      # chạy môi trường phát triển
npm run build    # kiểm tra TypeScript và build production
```

## Chức năng

- Trang chủ `/`: lưới sản phẩm responsive (1 cột điện thoại, 2 cột tablet, 4 cột desktop), tìm kiếm theo tên.
- Chi tiết sản phẩm `/products/:id`, Giỏ hàng `/cart`, Đăng nhập `/login`, Thanh toán `/checkout`, trang 404.
- Header dùng chung: số lượng trong giỏ, tên người dùng, đăng xuất, đổi theme sáng/tối.
- `/checkout` là protected route: chưa đăng nhập thì chuyển sang `/login`, đăng nhập xong quay lại trang trước đó.
- Đăng nhập giả lập: tên đăng nhập bất kỳ, mật khẩu đúng là `123456`.
- Nút "Đặt hàng" xoá giỏ hàng và hiện thông báo thành công.

## Dữ liệu nào để ở đâu, vì sao?

| Dữ liệu | Nơi lưu | Lý do |
|---|---|---|
| Danh sách sản phẩm, trạng thái loading/succeeded/failed, lỗi | **Redux** (`productsSlice`) | Nhiều trang dùng chung (Trang chủ, Chi tiết). Có luồng bất đồng bộ nên dùng `createAsyncThunk`. Tải một lần, các trang dùng lại, không gọi API lại. |
| Giỏ hàng (items, số lượng) và các selector tổng số lượng / tổng tiền | **Redux** (`cartSlice`) | Nhiều nơi đọc và ghi (ProductCard, Detail, Header, Cart, Checkout). Có nhiều action cập nhật và dữ liệu dẫn xuất (tổng) nên cần reducer + selector tập trung, dễ kiểm soát và debug. |
| Theme sáng/tối | **Context** (`ThemeContext`) | Là state giao diện toàn cục, ít thay đổi, logic đơn giản (chỉ toggle). Không cần cơ chế mạnh như Redux. |
| Người dùng đăng nhập (`user`, `login`, `logout`) | **Context** (`AuthContext`) | Là state toàn cục, ít thay đổi, cần cho Header, ProtectedRoute, Login, Checkout. Chỉ cần chia sẻ giá trị và vài hàm, không có dữ liệu dẫn xuất phức tạp. Lưu thêm vào `localStorage` để giữ đăng nhập khi tải lại trang. |
| Từ khoá tìm kiếm ở Trang chủ | **useState** | Chỉ một component dùng, không cần chia sẻ. Danh sách lọc được tính bằng `useMemo` từ từ khoá và danh sách sản phẩm, không lưu thành state riêng. |
| Ô nhập username/password, thông báo lỗi, trạng thái đang gửi ở form đăng nhập | **useState** | Dữ liệu tạm của form, chỉ tồn tại trong `LoginPage`. |
| Cờ "đã đặt hàng" ở trang Thanh toán | **useState** | Chỉ dùng để đổi giao diện trong trang đó, không trang nào khác cần biết. |

Nguyên tắc chọn: state chỉ một component dùng thì **useState**; state toàn cục đơn giản, ít thay đổi thì **Context**; state dùng chung nhiều nơi, có logic nghiệp vụ, dữ liệu dẫn xuất hoặc bất đồng bộ thì **Redux Toolkit**.

## Cấu trúc thư mục

```
src/
├── app/            store.ts, hooks.ts
├── features/       products/productsSlice.ts, cart/cartSlice.ts
├── contexts/       ThemeContext.tsx, AuthContext.tsx
├── components/     Header, ProductCard, ProtectedRoute
├── layouts/        MainLayout.tsx
├── pages/          Home, ProductDetail, Cart, Login, Checkout, NotFound
├── types/          index.ts (Product, CartItem, User)
├── utils/          format.ts
├── App.tsx         khai báo Routes
└── main.tsx        Provider, ThemeProvider, AuthProvider, BrowserRouter
```

## API

`https://fakestoreapi.com/products` (id, title, price, description, category, image)
