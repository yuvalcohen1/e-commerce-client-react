import { Dispatch } from "@reduxjs/toolkit";
import { UserModel } from "../models/User.model";
import { getUserState } from "../redux/features/userSlice";

export function uploadFromLocalStorage(dispatch: Dispatch) {
  const userDetails = JSON.parse(
    localStorage.getItem("userDetails")!
  ) as UserModel | null;

  if (userDetails) {
    dispatch(getUserState(userDetails));
  }
}
