import { Dispatch } from "@reduxjs/toolkit";
import { CartModel } from "../models/Cart.model";
import { UserModel } from "../models/User.model";
import { getCartSync } from "../redux/features/cartSlice";
import { getUserState } from "../redux/features/userSlice";

export function uploadFromLocalStorage(dispatch: Dispatch) {
  const userDetails = JSON.parse(
    localStorage.getItem("userDetails")!
  ) as UserModel | null;

  if (userDetails) {
    dispatch(getUserState(userDetails));
  }

  const cart = JSON.parse(localStorage.getItem("cart")!) as CartModel | null;
  if (cart) {
    dispatch(getCartSync(cart));
  }
}
