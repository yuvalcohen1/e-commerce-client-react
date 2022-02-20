import React, { FC } from "react";
import Header from "../../components/Header/Header";
import RegisterBox from "../../components/RegisterBox/RegisterBox";
import "./RegisterPage.css";

type Props = {};

const RegisterPage: FC<Props> = (props) => {
  return (
    <div id="register-page">
      <Header />
      <RegisterBox />
    </div>
  );
};

export default RegisterPage;
