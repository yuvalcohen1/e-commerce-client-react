import React, { FC, useEffect } from "react";
import Categories from "../../components/Categories/Categories";
import Header from "../../components/Header/Header";
import Products from "../../components/Products/Products";
import ShoppingCart from "../../components/ShoppingCart/ShoppingCart";
import { CartModel } from "../../models/Cart.model";
import { useAppDispatch } from "../../redux/app/hooks";
import { fetchCartItems } from "../../redux/thunks/cart-items-thunks";
import { createCart, fetchOpenCart } from "../../redux/thunks/cart-thunks";
import "./ShoppingPage.css";

type Props = {};

const ShoppingPage: FC<Props> = (props) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const createNewCartIfNecessaryAndFetchCartItems = async () => {
      const { payload: cart } = await dispatch(fetchOpenCart());
      if (!cart) {
        await dispatch(createCart());
        return;
      }
      await dispatch(fetchCartItems((cart as CartModel)._id));
    };

    createNewCartIfNecessaryAndFetchCartItems();
  }, []);

  return (
    <div id="shopping-page">
      <Header />
      <main id="shopping-page-main">
        <ShoppingCart />
        <div id="categories-and-products">
          <Categories />
          <Products />
        </div>
      </main>
    </div>
  );
};

export default ShoppingPage;
