import React, { FC, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/app/hooks";
import { getCartItems } from "../../redux/features/cartItemsSlice";
import {
  createNewCart,
  getOpenCartFromApi,
  selectCartState,
} from "../../redux/features/cartSlice";
import {
  resetUserState,
  selectUserState,
} from "../../redux/features/userSlice";
import LoginForm from "../LoginForm/LoginForm";
import "./LoginBox.css";

interface Props {}

const LoginBox: FC<Props> = (props) => {
  const [loginErrorMessage, setLoginErrorMessage] = useState("");

  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const userState = useAppSelector(selectUserState);
  const { value: cart } = useAppSelector(selectCartState);

  useEffect(() => {
    if (userState.value) {
      dispatch(getOpenCartFromApi());
    }
    if (userState.statusCode === 401) {
      setLoginErrorMessage("Email and password don't match");
      setTimeout(() => {
        dispatch(resetUserState());
        setLoginErrorMessage("");
      }, 3e3);
    } else if (userState.status === "failed" && userState.statusCode !== 401) {
      navigate("/error");
    }
  }, [
    cart,
    userState.statusCode,
    userState.status,
    userState.value,
    navigate,
    dispatch,
  ]);

  const handleStartShopping = useCallback(async () => {
    const { payload: newCart } = await dispatch(createNewCart());

    if (cart && newCart) {
      navigate("/shopping");
    }
  }, [dispatch, navigate, cart]);

  const handleResumeShopping = useCallback(() => {
    navigate("/shopping");
  }, [navigate]);

  return (
    <div id="login-access-box">
      {userState.value ? (
        cart ? (
          <button onClick={handleResumeShopping}>Resume Shopping</button>
        ) : (
          <button onClick={handleStartShopping}>Start Shopping</button>
        )
      ) : (
        <>
          <h1>Registered?</h1>
          <LoginForm loginErrorMessage={loginErrorMessage} />
        </>
      )}
    </div>
  );
};

export default LoginBox;
