import axios from "axios";
import { LoginDetailsModel } from "../models/LoginDetails.model";
import { UserModel } from "../models/User.model";

const api = axios.create({
  baseURL: "http://localhost:4000/users",
});

export async function fetchUserDetailsAndSetJwtCookieByLogin(
  loginDetails: LoginDetailsModel
): Promise<UserModel> {
  const { email, password } = loginDetails;
  const { data: user } = await api.post("/login", { email, password });

  localStorage.setItem("userDetails", JSON.stringify(user));

  return user;
}
