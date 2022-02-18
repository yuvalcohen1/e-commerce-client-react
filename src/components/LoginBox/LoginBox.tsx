import React, { FC, FormEvent, useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/app/hooks";
import {
  fetchUserDetailsByLogin,
  resetUserState,
  selectUserState,
} from "../../redux/features/userSlice";
import "./LoginBox.css";

interface Props {}

const LoginBox: FC<Props> = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginErrorMessage, setLoginErrorMessage] = useState("");

  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const userState = useAppSelector(selectUserState);

  useEffect(() => {
    if (userState.statusCode === 401) {
      setLoginErrorMessage("Email and password don't match");
      setTimeout(() => {
        dispatch(resetUserState());
        setLoginErrorMessage("");
      }, 3e3);
    } else if (userState.status === "failed" && userState.statusCode !== 401) {
      navigate("/error");
    }
  }, [userState.statusCode, userState.status, navigate, dispatch]);

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();

      const loginDetails = { email, password };

      dispatch(fetchUserDetailsByLogin(loginDetails));
    },
    [email, password, dispatch]
  );

  return (
    <div id="login-box">
      <h1>Registered?</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            placeholder="Type your email..."
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            placeholder="Type your password..."
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="btns">
          <button type="submit" className="login-btn btn">
            Login
          </button>
          <Link to="/register" className="btn">
            Sign Up
          </Link>
        </div>
        <div id="login-error-message">{loginErrorMessage}</div>
      </form>
    </div>
  );
};

export default LoginBox;
