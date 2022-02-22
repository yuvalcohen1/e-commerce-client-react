import axios, { AxiosResponse } from "axios";
import { AddToCartBodyModel } from "../models/AddToCartBody.model";
import { CartItemModel } from "../models/CartItem.model";

const api = axios.create({
  baseURL: "http://localhost:4000/cart-items",
});

export async function fetchCartItems(
  cartId: string
): Promise<AxiosResponse<CartItemModel[]>> {
  const response = await api.get(`/${cartId}`, { withCredentials: true });

  return response;
}

export async function addCartItem(
  addCartItemBody: AddToCartBodyModel
): Promise<AxiosResponse<CartItemModel[]>> {
  const response = await api.post(`/add-cart-item`, addCartItemBody, {
    withCredentials: true,
  });

  return response;
}


