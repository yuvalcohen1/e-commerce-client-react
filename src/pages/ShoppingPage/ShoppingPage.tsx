import React, { FC } from "react";
import Categories from "../../components/Categories/Categories";
import Header from "../../components/Header/Header";
import "./ShoppingPage.css";

type Props = {};

const ShoppingPage: FC<Props> = (props) => {
  return (
    <div id="shopping-page">
      <Header />
      <Categories />
    </div>
  );
};

export default ShoppingPage;
