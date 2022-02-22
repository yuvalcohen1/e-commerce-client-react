import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { createCart, fetchOpenCart } from "../../api-client/carts-api";
import { CartModel } from "../../models/Cart.model";

export const createNewCart = createAsyncThunk<
  CartModel,
  undefined,
  { rejectValue: AxiosResponse }
>("cart/createNewCart", async (_, thunkApi) => {
  try {
    const response = await createCart();
    const { data: newCart } = response;

    return newCart;
  } catch (error: any) {
    return thunkApi.rejectWithValue(error.response);
  }
});

export const getOpenCart = createAsyncThunk(
  "cart/getOpenCart",
  async (_, thunkApi) => {
    try {
      const response = await fetchOpenCart();
      const { data: cart } = response;

      return cart;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response);
    }
  }
);
