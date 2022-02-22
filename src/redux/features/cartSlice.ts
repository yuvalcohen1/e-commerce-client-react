import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { createCart, fetchOpenCart } from "../../api-client/carts-api";
import { CartModel } from "../../models/Cart.model";
import { RootState } from "../app/store";

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

export const getOpenCartFromApi = createAsyncThunk(
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

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    getCartSync: (state, action: PayloadAction<CartModel | null>) => {
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
      .addCase(getOpenCartFromApi.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getOpenCartFromApi.fulfilled, (state, action) => {
        state.status = "idle";
        state.statusCode = 200;
        state.value = action.payload;
        state.errorMessage = "";
      })
      .addCase(
        getOpenCartFromApi.rejected,
        (state, action: PayloadAction<any>) => {
          state.status = "failed";
          state.value = null;
          state.statusCode = action.payload.status;
          state.errorMessage = action.payload.data;
        }
      )
      .addCase(createNewCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createNewCart.fulfilled, (state, action) => {
        state.status = "idle";
        state.statusCode = 200;
        state.value = action.payload;
        state.errorMessage = "";
      })
      .addCase(createNewCart.rejected, (state, action: PayloadAction<any>) => {
        state.status = "failed";
        state.value = null;
        state.statusCode = action.payload.status;
        state.errorMessage = action.payload.data;
      });
  },
});

export const { getCartSync } = cartSlice.actions;

export const selectCartState = (state: RootState) => state.cart;

export default cartSlice.reducer;
