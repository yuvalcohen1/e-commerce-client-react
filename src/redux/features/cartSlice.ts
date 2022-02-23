import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartModel } from "../../models/Cart.model";
import { RootState } from "../app/store";
import { createCart, fetchOpenCart } from "../thunks/cart-thunks";

export interface CartState {
  value: CartModel | null;
  status: "idle" | "loading" | "failed";
  statusCode: number;
  errorMessage: string;
}

const initialState: CartState = {
  value: null,
  status: "idle",
  statusCode: 200,
  errorMessage: "",
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // getCartSync: (state, action: PayloadAction<CartModel | null>) => {
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
      .addCase(fetchOpenCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchOpenCart.fulfilled, (state, action) => {
        state.status = "idle";
        state.statusCode = 200;
        state.value = action.payload;
        state.errorMessage = "";
      })
      .addCase(fetchOpenCart.rejected, (state, action: PayloadAction<any>) => {
        state.status = "failed";
        state.value = null;
        state.statusCode = action.payload.status;
        state.errorMessage = action.payload.data;
      })
      .addCase(createCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createCart.fulfilled, (state, action) => {
        state.status = "idle";
        state.statusCode = 200;
        state.value = action.payload;
        state.errorMessage = "";
      })
      .addCase(createCart.rejected, (state, action: PayloadAction<any>) => {
        state.status = "failed";
        state.value = null;
        state.statusCode = action.payload.status;
        state.errorMessage = action.payload.data;
      });
  },
});

// export const { getCartSync } = cartSlice.actions;

export const selectCartState = (state: RootState) => state.cart;

export default cartSlice.reducer;
