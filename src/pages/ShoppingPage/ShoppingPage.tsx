import React, { FC, useEffect } from "react";
import Categories from "../../components/Categories/Categories";
import Header from "../../components/Header/Header";
import Products from "../../components/Products/Products";
import ShoppingCart from "../../components/ShoppingCart/ShoppingCart";
import { CartModel } from "../../models/Cart.model";
import { useAppDispatch } from "../../redux/app/hooks";
import { getCartItems } from "../../redux/thunks/cart-items-thunks";
import { createNewCart, getOpenCart } from "../../redux/thunks/cart-thunks";
import "./ShoppingPage.css";

type Props = {};

const ShoppingPage: FC<Props> = (props) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const createNewCartIfNecessaryAndFetchCartItems = async () => {
      const { payload: cart } = await dispatch(getOpenCart());
      if (!cart) {
        await dispatch(createNewCart());
        return;
      }
      await dispatch(getCartItems((cart as CartModel)._id));
    };
    createNewCartIfNecessaryAndFetchCartItems();
  }, []);

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
