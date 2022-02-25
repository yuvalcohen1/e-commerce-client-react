import React, { FC, useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { uploadFromLocalStorage } from "./helpers/upload-from-localstorage";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import HomePage from "./pages/HomePage/HomePage";
import OrderPage from "./pages/OrderPage/OrderPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import ShoppingPage from "./pages/ShoppingPage/ShoppingPage";
import { useAppDispatch, useAppSelector } from "./redux/app/hooks";
import { selectCartItemsState } from "./redux/features/cartItemsSlice";
import { selectCartState } from "./redux/features/cartSlice";
import { selectUserState } from "./redux/features/userSlice";

const App: FC = () => {
  const dispatch = useAppDispatch();
  const userState = useAppSelector(selectUserState);
  const { value: cart } = useAppSelector(selectCartState);
  const { value: cartItems } = useAppSelector(selectCartItemsState);

  useEffect(() => {
    uploadFromLocalStorage(dispatch);
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/shopping" element={<ShoppingPage />} />
          {userState.value && cart && cartItems ? (
            <Route path="/order" element={<OrderPage />} />
          ) : null}

          {userState.statusCode !== 200 ? (
            <Route path="/error" element={<ErrorPage />} />
          ) : null}
          <Route path="/*" element={<Navigate to="/home" />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
