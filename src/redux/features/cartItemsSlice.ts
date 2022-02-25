import { createSlice } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { CartItemModel } from "../../models/CartItem.model";
import { RootState } from "../app/store";
import {
  addCartItem,
  deleteCartItem,
  emptyCartItems,
  fetchCartItems,
} from "../thunks/cart-items-thunks";

export interface CartItemsState {
  value: CartItemModel[];
  status: "idle" | "loading" | "failed";
  statusCode: number;
  errorMessage: string;
  totalPayment: number;
}

const initialState: CartItemsState = {
  value: [],
  status: "idle",
  statusCode: 200,
  errorMessage: "",
  totalPayment: 0,
};

export const cartItemsSlice = createSlice({
  name: "cartItems",
  initialState,
  reducers: {
    emptyCartItemsSync: (state) => {
      state.errorMessage = "";
      state.status = "idle";
      state.statusCode = 200;
      state.totalPayment = 0;
      state.value = [];
    },
    // getCartItemsSync: (state, action: PayloadAction<CartItemModel[]>) => {
    //   state.status = "idle";
    //   state.statusCode = 200;
    //   state.value = action.payload;
    //   state.errorMessage = "";
    // },
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
        state.totalPayment = action.payload
          .map((cartItem) => cartItem.quantity * cartItem.product.price)
          .reduce((prev, current) => prev + current, 0);
      })
      .addCase(fetchCartItems.rejected, (state, action) => {
        state.status = "failed";
        state.value = [];
        state.statusCode = action.payload!.status;
        state.errorMessage = action.payload!.data;
        state.totalPayment = 0;
      })
      .addCase(addCartItem.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addCartItem.fulfilled, (state, action) => {
        state.status = "idle";
        state.statusCode = 200;
        state.value.push(action.payload);
        state.errorMessage = "";
        state.totalPayment +=
          action.payload.quantity * action.payload.product.price;
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
        const deletedCartItem = state.value.find(
          (cartItem) => cartItem._id === action.payload
        );
        state.status = "idle";
        state.statusCode = 200;
        if (deletedCartItem) {
          state.totalPayment -=
            deletedCartItem.quantity * deletedCartItem.product.price;
        }
        state.value = state.value.filter(
          (cartItem) => cartItem._id !== action.payload
        );
        state.errorMessage = "";
      })
      .addCase(deleteCartItem.rejected, (state, action) => {
        state.status = "failed";
        state.value = [];
        state.statusCode = action.payload!.status;
        state.errorMessage = action.payload!.data;
      })
      .addCase(emptyCartItems.pending, (state) => {
        state.status = "loading";
      })
      .addCase(emptyCartItems.fulfilled, (state, action) => {
        state.status = "idle";
        state.statusCode = 200;
        state.value = [];
        state.errorMessage = "";
        state.totalPayment = 0;
      })
      .addCase(emptyCartItems.rejected, (state, action) => {
        state.status = "failed";
        state.value = [];
        state.statusCode = action.payload!.status;
        state.errorMessage = action.payload!.data;
      });
  },
});

export const { emptyCartItemsSync } = cartItemsSlice.actions;

export const selectCartItemsState = (state: RootState) => state.cartItems;

export default cartItemsSlice.reducer;
