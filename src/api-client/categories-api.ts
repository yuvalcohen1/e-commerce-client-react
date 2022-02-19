import axios, { AxiosResponse } from "axios";
import { CategoryModel } from "../models/Category.model";

const api = axios.create({
  baseURL: "http://localhost:4000/categories",
});

export async function fetchCategories(): Promise<
  AxiosResponse<CategoryModel[]>
> {
  const response = await api.get("/", { withCredentials: true });
  return response;
}
