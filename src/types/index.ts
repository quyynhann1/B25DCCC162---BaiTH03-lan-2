export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface User {
  username: string;
}

export type LoadingStatus = "idle" | "loading" | "succeeded" | "failed";

export type Theme = "light" | "dark";
