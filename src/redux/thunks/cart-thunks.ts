import { createAsyncThunk } from "@reduxjs/toolkit";
import { CartModel } from "../../models/Cart.model";
import axios, { AxiosResponse } from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000/shopping-carts",
});

export const fetchOpenCart = createAsyncThunk<
  CartModel,
  undefined,
  { rejectValue: AxiosResponse }
>("cart/fetchOpenCart", async (_, thunkApi) => {
  try {
    const { data: cart } = await api.get("/", { withCredentials: true });

    return cart;
  } catch (error: any) {
    return thunkApi.rejectWithValue(error.response);
  }
});

export const createCart = createAsyncThunk<
  CartModel,
  undefined,
  { rejectValue: AxiosResponse }
>("cart/createCart", async (_, thunkApi) => {
  try {
    const { data: newCart } = await api.post(
      "/create-cart",
      {},
      { withCredentials: true }
    );

    return newCart;
  } catch (error: any) {
    return thunkApi.rejectWithValue(error.response);
  }
});
