import React, { FC } from "react";
import AboutBox from "../../components/AboutBox/AboutBox";
import InfoBox from "../../components/InfoBox/InfoBox";
import LoginBox from "../../components/LoginBox/LoginBox";
import "./HomePage.css";

interface Props {}

const HomePage: FC<Props> = () => {
  return (
    <div id="home-page">
      <LoginBox />
      <AboutBox />
      <InfoBox />
    </div>
  );
};

export default HomePage;
