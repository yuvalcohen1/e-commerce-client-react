import React from "react";
import Header from "../../components/Header/Header";
import RegisterBox from "../../components/RegisterBox/RegisterBox";
import "./RegisterPage.css";

type Props = {};

const RegisterPage = (props: Props) => {
  return (
    <div id="register-page">
      <Header />
      <RegisterBox />
    </div>
  );
};

export default RegisterPage;
