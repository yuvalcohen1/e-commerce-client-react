import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import OrderDetailsBox from "../../components/OrderDetailsBox/OrderDetailsBox";
import OrderFormBox from "../../components/OrderFormBox/OrderFormBox";
import { CartModel } from "../../models/Cart.model";
import { useAppDispatch } from "../../redux/app/hooks";
import { fetchCartItems } from "../../redux/thunks/cart-items-thunks";
import { fetchOpenCart } from "../../redux/thunks/cart-thunks";
import "./OrderPage.css";

type Props = {};

const OrderPage = (props: Props) => {
  const [orderCompleted, setOrderCompleted] = useState(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const uploadCartAndCartItems = async () => {
      const { payload: cart } = await dispatch(fetchOpenCart());
      if (!cart) {
        return;
      }
      await dispatch(fetchCartItems((cart as CartModel)._id));
    };

    uploadCartAndCartItems();
  }, []);

  return (
    <div id="order-page">
      <Header />
      <main>
        {orderCompleted ? (
          <h1 id="order-completed-title">Order Completed Successfully!</h1>
        ) : (
          <>
            <OrderDetailsBox />
            <OrderFormBox setOrderCompleted={setOrderCompleted} />
          </>
        )}
      </main>
    </div>
  );
};

export default OrderPage;
