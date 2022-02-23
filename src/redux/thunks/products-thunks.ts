import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

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
