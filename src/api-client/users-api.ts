import axios, { AxiosResponse } from "axios";
import { LoginDetailsModel } from "../models/LoginDetails.model";
import { UserModel } from "../models/User.model";

const api = axios.create({
  baseURL: "http://localhost:4000/users",
});

export async function fetchUserDetailsAndSetJwtCookieByLogin(
  loginDetails: LoginDetailsModel
): Promise<AxiosResponse<UserModel>> {
  const { email, password } = loginDetails;
  const response = await api.post(
    "/login",
    { email, password },
    { withCredentials: true }
  );

  const { data: user } = response;

  localStorage.setItem("userDetails", JSON.stringify(user));

  return response;
}
