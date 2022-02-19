import React, { FC } from "react";
import Categories from "../../components/Categories/Categories";
import Header from "../../components/Header/Header";
import Products from "../../components/Products/Products";
import ShoppingCart from "../../components/ShoppingCart/ShoppingCart";
import "./ShoppingPage.css";

type Props = {};

const ShoppingPage: FC<Props> = (props) => {
  return (
    <div id="shopping-page">
      <Header />
      <Categories />
      <Products />
      <ShoppingCart />
    </div>
  );
};

export default ShoppingPage;
