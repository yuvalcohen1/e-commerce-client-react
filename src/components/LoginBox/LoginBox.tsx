import React, { FC } from "react";
import "./LoginBox.css";
import { Link } from "react-router-dom";

interface Props {}

const LoginBox: FC<Props> = (props) => {
  return (
    <div id="login-box">
      <h1>Registered?</h1>
      <form>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            placeholder="Type your email..."
            name="email"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            placeholder="Type your password..."
            name="password"
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
      </form>
    </div>
  );
};

export default LoginBox;
