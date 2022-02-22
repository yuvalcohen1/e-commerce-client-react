import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { FC, useCallback } from "react";
import { ProductModel } from "../../models/Product.model";
import { useAppDispatch, useAppSelector } from "../../redux/app/hooks";
import { selectCartItemsState } from "../../redux/features/cartItemsSlice";
import "./ShoppingCart.css";

type Props = {};

const ShoppingCart: FC<Props> = (props) => {
  const dispatch = useAppDispatch();
  const { value: cartItems } = useAppSelector(selectCartItemsState);

  const handleDeleteCartItem = useCallback((cartItemId: string) => {}, []);

  return (
    <div id="shopping-cart">
      <div id="cart-items">
        {cartItems.map((cartItem) => (
          <div key={cartItem._id} className="cart-item">
            <div className="cart-item-img-container">
              <img
                src={(cartItem.product as ProductModel).imgUrl}
                alt="product-img"
              />
            </div>
            <div className="cart-item-content">
              <div className="cart-item-name">
                {(cartItem.product as ProductModel).productName}
              </div>
              <div className="cart-item-price">
                {(cartItem.product as ProductModel).price}
              </div>
              <div className="cart-item-quantity">{cartItem.quantity}</div>
            </div>
            <div
              className="delete-cart-item-btn"
              onClick={() => handleDeleteCartItem(cartItem._id)}
            >
              <FontAwesomeIcon icon={faTrash} />
            </div>
          </div>
        ))}
      </div>
      <button id="empty-cart-btn">Empty Cart</button>
      <button id="checkout-btn">Checkout</button>
    </div>
  );
};

export default ShoppingCart;
