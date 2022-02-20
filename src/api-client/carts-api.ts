import axios, { AxiosResponse } from "axios";
import { CartModel } from "../models/Cart.model";

const api = axios.create({
  baseURL: "http://localhost:4000/shopping-carts",
});

export async function fetchOpenCart(): Promise<AxiosResponse<CartModel>> {
  const response = await api.get("/", { withCredentials: true });
  const { data: cart } = response;
  localStorage.setItem("cart", JSON.stringify(cart));
  return response;
}

export async function createCart(): Promise<AxiosResponse<CartModel>> {
  const response = await api.post(
    "/create-cart",
    {},
    { withCredentials: true }
  );
  const { data: cart } = response;
  localStorage.setItem("cart", JSON.stringify(cart));
  return response;
}
