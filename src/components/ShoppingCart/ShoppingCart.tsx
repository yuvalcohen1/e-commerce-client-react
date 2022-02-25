import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { FC, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ProductModel } from "../../models/Product.model";
import { useAppDispatch, useAppSelector } from "../../redux/app/hooks";
import { selectCartItemsState } from "../../redux/features/cartItemsSlice";
import { selectCartState } from "../../redux/features/cartSlice";
import {
  deleteCartItem,
  emptyCartItems,
} from "../../redux/thunks/cart-items-thunks";
import "./ShoppingCart.css";

interface Props {}

const ShoppingCart: FC<Props> = () => {
  const dispatch = useAppDispatch();
  const { value: cartItems, totalPayment } =
    useAppSelector(selectCartItemsState);
  const { value: cart } = useAppSelector(selectCartState);

  const navigate = useNavigate();

  const handleDeleteCartItem = useCallback(
    async (cartItemId: string) => {
      if (cart) {
        await dispatch(deleteCartItem(cartItemId));
      }
    },
    [cart, dispatch]
  );

  const onEmptyCart = useCallback(async () => {
    if (cart) {
      await dispatch(emptyCartItems(cart._id));
    }
  }, [cart, dispatch]);

  const onCheckout = useCallback(() => {
    navigate("/order");
  }, [navigate]);

  return (
    <div id="shopping-cart">
      <h1>Shopping Cart</h1>
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
      {cartItems.length ? (
        <button id="empty-cart-btn" onClick={() => onEmptyCart()}>
          Empty Cart
        </button>
      ) : null}

      <div id="total-price">Total: {totalPayment}</div>

      <button
        id="checkout-btn"
        disabled={cartItems.length ? false : true}
        onClick={onCheckout}
      >
        Checkout
      </button>
    </div>
  );
};

export default ShoppingCart;
