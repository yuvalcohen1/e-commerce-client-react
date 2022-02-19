import React, { FC } from "react";
import AboutBox from "../../components/AboutBox/AboutBox";
import Header from "../../components/Header/Header";
import InfoBox from "../../components/InfoBox/InfoBox";
import LoginBox from "../../components/LoginBox/LoginBox";
import "./HomePage.css";

interface Props {}

const HomePage: FC<Props> = () => {
  return (
    <div id="home-page">
      <Header />
      <main>
        <LoginBox />
        <AboutBox />
        <InfoBox />
      </main>
    </div>
  );
};

export default HomePage;
