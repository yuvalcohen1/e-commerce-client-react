import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../redux/app/hooks";
import { resetUserState } from "../../redux/features/userSlice";
import "./ErrorPage.css";

type Props = {};

const ErrorPage = (props: Props) => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const handleClick = useCallback(() => {
    dispatch(resetUserState());
    navigate("/home");
  }, [navigate, dispatch]);

  return (
    <div id="error-page">
      <h1>Oops... 404 PAGE NOT FOUND</h1>
      <button onClick={handleClick}>Back to home page</button>
    </div>
  );
};

export default ErrorPage;
