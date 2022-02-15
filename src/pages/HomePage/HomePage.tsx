import React, { FC } from "react";
import LoginBox from "../../components/LoginBox/LoginBox";
import "./HomePage.css";

interface Props {}

const HomePage: FC<Props> = () => {
  return (
    <div id="home-page">
      <LoginBox />
    </div>
  );
};

export default HomePage;
