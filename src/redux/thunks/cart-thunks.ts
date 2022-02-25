import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import { CartModel } from "../../models/Cart.model";

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

export const closeCart = createAsyncThunk<
  undefined,
  string,
  { rejectValue: AxiosResponse }
>("cart/closeCart", async (cartId: string, thunkApi) => {
  try {
    await api.put(`/close-cart/${cartId}`, {}, { withCredentials: true });

    return;
  } catch (error: any) {
    return thunkApi.rejectWithValue(error.response);
  }
});
