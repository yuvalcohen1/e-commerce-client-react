import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { LoginDetailsModel } from "../../models/LoginDetails.model";
import { RegisterDetailsModel } from "../../models/RegisterDetails.model";

const api = axios.create({
  baseURL: "http://localhost:4000/users",
});

export const fetchUserDetailsAndSetJwtCookieByLogin = createAsyncThunk(
  "user/fetchUserDetailsAndSetJwtCookieByLogin",
  async (loginDetails: LoginDetailsModel, thunkApi) => {
    try {
      const { email, password } = loginDetails;
      const { data: user } = await api.post(
        "/login",
        { email, password },
        { withCredentials: true }
      );

      localStorage.setItem("userDetails", JSON.stringify(user));

      return user;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response);
    }
  }
);

export const fetchUserDetailsAndSetJwtCookieByRegister = createAsyncThunk(
  "user/fetchUserDetailsAndSetJwtCookieByRegister",
  async (registerDetails: RegisterDetailsModel, thunkApi) => {
    try {
      const { city, email, firstName, idNum, lastName, password, street } =
        registerDetails;
      const { data: user } = await api.post("/register", {
        city,
        email,
        firstName,
        idNum,
        lastName,
        password,
        street,
      });

      localStorage.setItem("userDetails", JSON.stringify(user));

      return user;
    } catch (error: any) {
      const rejectValue = {
        data: error.response.data,
        status: error.response.status,
      };

      return thunkApi.rejectWithValue(rejectValue);
    }
  }
);
