import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

import { AddToCartBodyModel } from "../../models/AddToCartBody.model";
import { CartItemModel } from "../../models/CartItem.model";
import axios, { AxiosResponse } from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000/cart-items",
});

export const fetchCartItems = createAsyncThunk<
  CartItemModel[],
  string,
  { rejectValue: AxiosError["response"] }
>("cartItems/fetchCartItems", async (cartId: string, thunkApi) => {
  try {
    const { data: cartItems } = await api.get(`/${cartId}`, {
      withCredentials: true,
    });

    return cartItems;
  } catch (error: any) {
    return thunkApi.rejectWithValue(error.response);
  }
});

export const addCartItem = createAsyncThunk(
  "cartItems/addCartItem",
  async (addCartItemBody: AddToCartBodyModel, thunkApi) => {
    try {
      const { data: cartItems } = await api.post(
        `/add-cart-item`,
        addCartItemBody,
        {
          withCredentials: true,
        }
      );

      return cartItems;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response);
    }
  }
);
