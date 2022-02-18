import React, { FC } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import HomePage from "./pages/HomePage/HomePage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import { useAppSelector } from "./redux/app/hooks";
import { selectUserState } from "./redux/features/userSlice";

const App: FC = () => {
  const userState = useAppSelector(selectUserState);

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
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
