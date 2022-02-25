import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import OrderDetailsBox from "../../components/OrderDetailsBox/OrderDetailsBox";
import OrderFormBox from "../../components/OrderFormBox/OrderFormBox";
import { CartModel } from "../../models/Cart.model";
import { CartItemModel } from "../../models/CartItem.model";
import { useAppDispatch } from "../../redux/app/hooks";
import { fetchCartItems } from "../../redux/thunks/cart-items-thunks";
import { fetchOpenCart } from "../../redux/thunks/cart-thunks";
import "./OrderPage.css";

type Props = {};

const OrderPage = (props: Props) => {
  const [orderCompleted, setOrderCompleted] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const uploadCartAndCartItems = async () => {
      const { payload: cart } = await dispatch(fetchOpenCart());
      if (!cart) {
        navigate("/home");
        return;
      }
      const { payload: cartItems } = await dispatch(
        fetchCartItems((cart as CartModel)._id)
      );
      if (!cartItems || (cartItems as CartItemModel[]).length === 0) {
        navigate("/home");
        return;
      }
    };

    uploadCartAndCartItems();
  }, []);

  return (
    <div id="order-page">
      <Header />
      {orderCompleted ? (
        <main id="order-page-main-success">
          <h1 id="order-completed-title">Order Completed Successfully!</h1>
        </main>
      ) : (
        <main id="order-page-main">
          <OrderDetailsBox />
          <OrderFormBox setOrderCompleted={setOrderCompleted} />
        </main>
      )}
    </div>
  );
};

export default OrderPage;
