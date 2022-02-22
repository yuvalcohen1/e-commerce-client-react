import axios, { AxiosResponse } from "axios";
import { CartItemModel } from "../models/CartItem.model";

const api = axios.create({
  baseURL: "http://localhost:4000/cart-items",
});

export async function fetchCartItems(
  cartId: string
): Promise<AxiosResponse<CartItemModel[]>> {
  const response = await api.get(`/${cartId}`, { withCredentials: true });
  const { data: cartItems } = response;
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
  return response;
}
