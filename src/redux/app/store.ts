import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import counterReducer from "../features/counterSlice";
import userReducer from "../features/userSlice";
import citiesReducer from "../features/citiesSlice";
import categoriesReducer from "../features/categoriesSlice";
import productsSlice from "../features/productsSlice";
import cartSlice from "../features/cartSlice";
import cartItemsSlice from "../features/cartItemsSlice";
import ordersSlice from "../features/ordersSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
    cities: citiesReducer,
    categories: categoriesReducer,
    products: productsSlice,
    cart: cartSlice,
    cartItems: cartItemsSlice,
    orders: ordersSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
