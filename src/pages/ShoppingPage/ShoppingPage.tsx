import React, { FC } from "react";
import Categories from "../../components/Categories/Categories";
import Header from "../../components/Header/Header";
import Products from "../../components/Products/Products";
import "./ShoppingPage.css";

type Props = {};

const ShoppingPage: FC<Props> = (props) => {
  return (
    <div id="shopping-page">
      <Header />
      <Categories />
      <Products />
    </div>
  );
};

export default ShoppingPage;
