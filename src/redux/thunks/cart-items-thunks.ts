import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { addCartItem, fetchCartItems } from "../../api-client/cart-iteams-api";
import { AddToCartBodyModel } from "../../models/AddToCartBody.model";
import { CartItemModel } from "../../models/CartItem.model";

export const getCartItems = createAsyncThunk<
  CartItemModel[],
  string,
  { rejectValue: AxiosError["response"] }
>("cartItems/getCartItems", async (cartId: string, thunkApi) => {
  try {
    const response = await fetchCartItems(cartId);
    const { data: cartItems } = response;

    return cartItems;
  } catch (error: any) {
    return thunkApi.rejectWithValue(error.response);
  }
});

export const addNewCartItem = createAsyncThunk(
  "cartItems/addNewCartItem",
  async (addCartItemBody: AddToCartBodyModel, thunkApi) => {
    try {
      const response = await addCartItem(addCartItemBody);
      const { data: cartItems } = response;

      return cartItems;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response);
    }
  }
);
