import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import { ProductModel } from "../../models/Product.model";

const api = axios.create({
  baseURL: "http://localhost:4000/products",
});

export const fetchAllProducts = createAsyncThunk(
  "products/fetchAllProducts",
  async (_, thunkApi) => {
    try {
      const { data: products } = await api.get("/all", {
        withCredentials: true,
      });

      return products;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response);
    }
  }
);

export const fetchProductsByCategoryId = createAsyncThunk(
  "products/fetchProductsByCategoryId",
  async (categoryId: string, thunkApi) => {
    try {
      const { data: products } = await api.get(`/${categoryId}`, {
        withCredentials: true,
      });

      return products;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response);
    }
  }
);

export const fetchProductsByProductName = createAsyncThunk<
  ProductModel[],
  string,
  { rejectValue: AxiosResponse }
>(
  "products/fetchProductsByProductName",
  async (productName: string, thunkApi) => {
    try {
      const { data: products } = await api.get<ProductModel[]>(
        `/search/${productName}`,
        {
          withCredentials: true,
        }
      );

      return products;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response);
    }
  }
);
