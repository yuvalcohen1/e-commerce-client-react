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

export const addCartItem = createAsyncThunk<
  CartItemModel,
  AddToCartBodyModel,
  { rejectValue: AxiosResponse }
>(
  "cartItems/addCartItem",
  async (addCartItemBody: AddToCartBodyModel, thunkApi) => {
    try {
      const { data: newCartItem } = await api.post(
        `/add-cart-item`,
        addCartItemBody,
        {
          withCredentials: true,
        }
      );

      return newCartItem;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response);
    }
  }
);

export const deleteCartItem = createAsyncThunk<
  string,
  string,
  { rejectValue: AxiosResponse }
>("cartItems/deleteCartItem", async (cartItemId, thunkApi) => {
  try {
    await api.delete(`/delete-cart-item/${cartItemId}`, {
      withCredentials: true,
    });

    return cartItemId;
  } catch (error: any) {
    return thunkApi.rejectWithValue(error.response);
  }
});

export const emptyCartItems = createAsyncThunk<
  undefined,
  string,
  { rejectValue: AxiosResponse }
>("cartItems/emptyCart", async (cartId, thunkApi) => {
  try {
    await api.delete(`/empty-cart-items/${cartId}`, {
      withCredentials: true,
    });

    return;
  } catch (error: any) {
    return thunkApi.rejectWithValue(error.response);
  }
});
