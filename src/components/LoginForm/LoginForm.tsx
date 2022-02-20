import React, { FC, FormEvent, useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../redux/app/hooks";
import { fetchUserDetailsByLogin } from "../../redux/features/userSlice";
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

      dispatch(fetchUserDetailsByLogin(loginDetails));
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

export default LoginForm;
