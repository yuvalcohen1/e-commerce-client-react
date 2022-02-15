import React, { FC } from "react";
import AboutBox from "../../components/AboutBox/AboutBox";
import LoginBox from "../../components/LoginBox/LoginBox";
import "./HomePage.css";

interface Props {}

const HomePage: FC<Props> = () => {
  return (
    <div id="home-page">
      <LoginBox />
      <AboutBox />
    </div>
  );
};

export default HomePage;
