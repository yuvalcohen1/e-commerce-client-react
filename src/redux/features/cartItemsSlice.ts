import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { CartItemModel } from "../../models/CartItem.model";
import { RootState } from "../app/store";
import {
  addCartItem,
  deleteCartItem,
  fetchCartItems,
} from "../thunks/cart-items-thunks";

export interface CartItemsState {
  value: CartItemModel[];
  status: "idle" | "loading" | "failed";
  statusCode: number;
  errorMessage: string;
}

const initialState: CartItemsState = {
  value: [],
  status: "idle",
  statusCode: 200,
  errorMessage: "",
};

export const cartItemsSlice = createSlice({
  name: "cartItems",
  initialState,
  reducers: {
    getCartItemsSync: (state, action: PayloadAction<CartItemModel[]>) => {
      state.status = "idle";
      state.statusCode = 200;
      state.value = action.payload;
      state.errorMessage = "";
    },
    // increment: (state) => {
    //   // Redux Toolkit allows us to write "mutating" logic in reducers. It
    //   // doesn't actually mutate the state because it uses the Immer library,
    //   // which detects changes to a "draft state" and produces a brand new
    //   // immutable state based off those changes
    //   state.value += 1;
    // },
    // // Use the PayloadAction type to declare the contents of `action.payload`
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload;
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartItems.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.status = "idle";
        state.statusCode = 200;
        state.value = action.payload;
        state.errorMessage = "";
      })
      .addCase(fetchCartItems.rejected, (state, action) => {
        state.status = "failed";
        state.value = [];
        state.statusCode = action.payload!.status;
        state.errorMessage = action.payload!.data;
      })
      .addCase(addCartItem.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addCartItem.fulfilled, (state, action) => {
        state.status = "idle";
        state.statusCode = 200;
        state.value = action.payload;
        state.errorMessage = "";
      })
      .addCase(addCartItem.rejected, (state, action) => {
        state.status = "failed";
        state.value = [];
        state.statusCode = (action.payload as AxiosResponse).status;
        state.errorMessage = (action.payload as AxiosResponse).data;
      })
      .addCase(deleteCartItem.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteCartItem.fulfilled, (state, action) => {
        state.status = "idle";
        state.statusCode = 200;
        state.value = action.payload;
        state.errorMessage = "";
      })
      .addCase(deleteCartItem.rejected, (state, action) => {
        state.status = "failed";
        state.value = [];
        state.statusCode = action.payload!.status;
        state.errorMessage = action.payload!.data;
      });
  },
});

export const { getCartItemsSync } = cartItemsSlice.actions;

export const selectCartItemsState = (state: RootState) => state.cartItems;

export default cartItemsSlice.reducer;
