import axios, { AxiosResponse } from "axios";
import { ProductModel } from "../models/Product.model";

const api = axios.create({
  baseURL: "http://localhost:4000/products",
});

export async function fetchNumOfAvailableProducts(): Promise<number> {
  const {
    data: { numOfAvailableProducts },
  } = await api.get("/num-of-available-products");
  return numOfAvailableProducts;
}

export async function fetchAllProducts(): Promise<
  AxiosResponse<ProductModel[]>
> {
  const response = await api.get("/all", { withCredentials: true });
  return response;
}

export async function fetchProductsByCategoryId(
  categoryId: string
): Promise<AxiosResponse<ProductModel[]>> {
  const response = await api.get(`/${categoryId}`, { withCredentials: true });
  return response;
}
