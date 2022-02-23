import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import { CategoryModel } from "../../models/Category.model";

const api = axios.create({
  baseURL: "http://localhost:4000/categories",
});

export const fetchCategories = createAsyncThunk<
  CategoryModel[],
  undefined,
  { rejectValue: AxiosResponse }
>("categories/fetchCategories", async (_, thunkApi) => {
  try {
    const { data: categories } = await api.get("/", {
      withCredentials: true,
    });

    return categories as CategoryModel[];
  } catch (error: any) {
    return thunkApi.rejectWithValue(error.response);
  }
});
