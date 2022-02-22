import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { fetchCartItems } from "../../api-client/cart-iteams-api";
import { CartItemModel } from "../../models/CartItem.model";
import { RootState } from "../app/store";

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

export const cartItemsSlice = createSlice({
  name: "cartItems",
  initialState,
  reducers: {
    // getCartSync: (state, action: PayloadAction<CartItemModel[]>) => {
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
      .addCase(getCartItems.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getCartItems.fulfilled, (state, action) => {
        state.status = "idle";
        state.statusCode = 200;
        state.value = action.payload;
        state.errorMessage = "";
      })
      .addCase(getCartItems.rejected, (state, action) => {
        state.status = "failed";
        state.value = [];
        state.statusCode = action.payload!.status;
        state.errorMessage = action.payload!.data;
      });
  },
});

// export const {  } = cartItemsSlice.actions;

export const selectCartItemsState = (state: RootState) => state.cartItems;

export default cartItemsSlice.reducer;
