import React from "react";
import "./ShoppingCart.css";

type Props = {};

const ShoppingCart = (props: Props) => {
  return (
    <div id="shopping-cart">
      <div id="cart-items"></div>
      <button id="empty-cart-btn">Empty Cart</button>
      <button id="checkout-btn">Checkout</button>
    </div>
  );
};

export default ShoppingCart;
