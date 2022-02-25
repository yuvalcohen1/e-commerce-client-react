import React, { FC, FormEvent, useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../redux/app/hooks";
import { fetchUserDetailsAndSetJwtCookieByLogin } from "../../redux/thunks/user-thunks";
import "./LoginForm.css";

interface Props {
  loginErrorMessage: string;
}

const LoginForm: FC<Props> = ({ loginErrorMessage }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useAppDispatch();

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();

      const loginDetails = { email, password };

      dispatch(fetchUserDetailsAndSetJwtCookieByLogin(loginDetails));
    },
    [email, password, dispatch]
  );

  return (
    <div id="login-form">
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
        <div id="login-btns">
          <button type="submit" id="login-btn">
            Login
          </button>
          <Link to="/register" id="move-to-sign-up-btn">
            Sign Up
          </Link>
        </div>
        <div id="login-error-message">{loginErrorMessage}</div>
      </form>
    </div>
  );
};

export default LoginForm;
