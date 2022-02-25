import React, { FC } from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../redux/app/hooks";
import { selectCartItemsState } from "../../redux/features/cartItemsSlice";
import "./OrderDetailsBox.css";

type Props = {};

const OrderDetailsBox: FC<Props> = (props) => {
  const { value: cartItems, totalPayment } =
    useAppSelector(selectCartItemsState);

  return (
    <div id="order-details-box">
      <div id="order-details-top">
        <div id="order-details-title-and-back">
          <h1>Order Details</h1>
          <Link to="/shopping">Back to shopping page</Link>
        </div>

        {cartItems.map((cartItem) => (
          <div key={cartItem._id} className="order-cart-item">
            <div className="order-cart-item-img-container">
              <img src={cartItem.product.imgUrl} alt="order-cart-item" />
            </div>
            <div className="order-main-details">
              <div className="order-product-name">
                {cartItem.product.productName}
              </div>
              <span className="order-product-quantity">
                Quantity: {cartItem.quantity} /
              </span>
              <span className="order-product-price">
                price: {cartItem.product.price}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div id="order-total">Total: {totalPayment}</div>
    </div>
  );
};

export default OrderDetailsBox;
