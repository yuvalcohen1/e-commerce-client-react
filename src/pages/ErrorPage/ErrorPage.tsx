import React, { FC, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../redux/app/hooks";
import { resetUserState } from "../../redux/features/userSlice";
import "./ErrorPage.css";

type Props = {};

const ErrorPage: FC<Props> = (props) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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
