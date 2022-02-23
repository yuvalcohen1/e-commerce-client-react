import React, { FormEvent, useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RegisterDetailsModel } from "../../models/RegisterDetails.model";
import { useAppDispatch, useAppSelector } from "../../redux/app/hooks";
import { selectCitiesState } from "../../redux/features/citiesSlice";
import {
  resetUserState,
  selectUserState,
} from "../../redux/features/userSlice";
import { fetchUserDetailsAndSetJwtCookieByRegister } from "../../redux/thunks/user-thunks";
import "./RegisterBox.css";

type Props = {};

const RegisterBox = (props: Props) => {
  const [idNum, setIdNum] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [city, setCity] = useState<string>("initial-option");
  const [street, setStreet] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  //   const [errorMessage, setErrorMessage] = useState<string>('');

  const dispatch = useAppDispatch();
  const userState = useAppSelector(selectUserState);
  const { value: cities } = useAppSelector(selectCitiesState);

  const navigate = useNavigate();

  useEffect(() => {
    if (
      userState.status === "failed" &&
      userState.statusCode !== 400 &&
      userState.statusCode !== 401
    ) {
      navigate("/error");
      return;
    }

    if (passwordError) {
      setTimeout(() => {
        setPasswordError("");
      }, 3e3);
    }

    if (userState.errorMessage) {
      setTimeout(() => {
        dispatch(resetUserState());
      }, 3e3);
    }
  }, [
    navigate,
    userState.status,
    passwordError,
    userState.statusCode,
    userState.errorMessage,
    dispatch,
  ]);

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();

      if (password !== confirmPassword) {
        return setPasswordError("Password isn't correct");
      }

      const registerDetails: RegisterDetailsModel = {
        city,
        email,
        firstName,
        idNum: Number(idNum),
        lastName,
        password,
        street,
      };

      dispatch(fetchUserDetailsAndSetJwtCookieByRegister(registerDetails));

      setIdNum("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setCity("initial-option");
      setStreet("");
      setFirstName("");
      setLastName("");
    },
    [
      city,
      email,
      firstName,
      idNum,
      lastName,
      password,
      street,
      confirmPassword,
      dispatch,
    ]
  );

  return (
    <div>
      <h1>Register</h1>

      <form onSubmit={handleSubmit}>
        <div className="half-form">
          <div className="form-group">
            <label htmlFor="idNum">ID</label>
            <input
              type="text"
              onChange={(e) => setIdNum(e.target.value)}
              value={idNum}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirm-password">Confirm password</label>
            <input
              type="password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
              required
            />
          </div>
        </div>

        <div className="half-form">
          <div className="form-group">
            <label htmlFor="idNum">City</label>
            <select
              name="city"
              id="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            >
              <option value="initial-option" hidden disabled>
                Choose city
              </option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="street">Street</label>
            <input
              type="text"
              onChange={(e) => setStreet(e.target.value)}
              value={street}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="first-name">First name</label>
            <input
              type="text"
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="last-name">Last name</label>
            <input
              type="text"
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
              required
            />
          </div>
        </div>

        <div id="register-password-error">{passwordError}</div>
        <div id="register-error-message">{userState.errorMessage}</div>

        <button type="submit">Sign Up</button>
        <Link to="/home">Already have an account?</Link>
      </form>
    </div>
  );
};

export default RegisterBox;
