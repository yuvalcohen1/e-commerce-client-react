import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserModel } from "../../models/User.model";
import { RootState } from "../app/store";
import {
  fetchUserDetailsAndSetJwtCookieByLogin,
  fetchUserDetailsAndSetJwtCookieByRegister,
} from "../thunks/user-thunks";

export interface UserState {
  value: UserModel | null;
  status: "idle" | "loading" | "failed";
  statusCode: number;
  errorMessage: string;
}

const initialState: UserState = {
  value: null,
  status: "idle",
  statusCode: 200,
  errorMessage: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetUserState: (state) => {
      state.status = "idle";
      state.statusCode = 200;
      state.value = null;
      state.errorMessage = "";
    },
    getUserState: (state, action) => {
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
      .addCase(fetchUserDetailsAndSetJwtCookieByLogin.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchUserDetailsAndSetJwtCookieByLogin.fulfilled,
        (state, action) => {
          state.status = "idle";
          state.statusCode = 200;
          state.value = action.payload;
          state.errorMessage = "";
        }
      )
      .addCase(
        fetchUserDetailsAndSetJwtCookieByLogin.rejected,
        (state, action: PayloadAction<any>) => {
          state.status = "failed";
          state.value = null;
          state.statusCode = action.payload.status;
          state.errorMessage = action.payload.data;
        }
      )
      .addCase(fetchUserDetailsAndSetJwtCookieByRegister.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchUserDetailsAndSetJwtCookieByRegister.fulfilled,
        (state, action) => {
          state.status = "idle";
          state.statusCode = 200;
          state.value = action.payload;
          state.errorMessage = "";
        }
      )
      .addCase(
        fetchUserDetailsAndSetJwtCookieByRegister.rejected,
        (state, action: PayloadAction<any>) => {
          state.status = "failed";
          state.value = null;
          state.statusCode = action.payload.status;
          state.errorMessage = action.payload.data;
        }
      );
  },
});

export const { getUserState, resetUserState } = userSlice.actions;

// export const selectUser = (state: RootState) => state.user.value;
export const selectUserState = (state: RootState) => state.user;

export default userSlice.reducer;
