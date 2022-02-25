import React, {
  Dispatch,
  FC,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import { fetchDatesWithThreeOrders } from "../../api-client/orders-api";
import { OrderModel } from "../../models/Order.model";
import { useAppDispatch, useAppSelector } from "../../redux/app/hooks";
import {
  emptyCartItemsSync,
  selectCartItemsState,
} from "../../redux/features/cartItemsSlice";
import { selectCartState } from "../../redux/features/cartSlice";
import { selectCitiesState } from "../../redux/features/citiesSlice";
import { selectUserState } from "../../redux/features/userSlice";
import { closeCart } from "../../redux/thunks/cart-thunks";
import { createOrder } from "../../redux/thunks/orders-thunks";
import "./OrderFormBox.css";

interface Props {
  setOrderCompleted: Dispatch<SetStateAction<boolean>>;
}

const OrderFormBox: FC<Props> = ({ setOrderCompleted }) => {
  const { value: user } = useAppSelector(selectUserState);
  const { value: cities } = useAppSelector(selectCitiesState);
  const { value: cart } = useAppSelector(selectCartState);
  const { totalPayment } = useAppSelector(selectCartItemsState);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [shippingDate, setShippingDate] = useState<Date | null>(null);
  const [creditCardNumber, setCreditCardNumber] = useState("");
  const [datesArr, setDatesArr] = useState<string[]>([]);

  useEffect(() => {
    const setInitialFormValues = async () => {
      setCity(user ? user.city : "");
      setStreet(user ? user.street : "");
      const dates = await fetchDatesWithThreeOrders();
      setDatesArr(dates);
    };
    setInitialFormValues();
  }, [user]);

  const doesHaveThreeOrders = (date: Date): boolean => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const result = datesArr.some((dateStr) => {
      const dateDay = new Date(dateStr).getDate();
      const dateMonth = new Date(dateStr).getMonth() + 1;
      const dateYear = new Date(dateStr).getFullYear();

      return day === dateDay && month === dateMonth && year === dateYear;
    });

    return !result;
  };

  const handleOrder = useCallback(
    async (e) => {
      e.preventDefault();

      if (shippingDate && cart) {
        const fourLastDigitsOfPayment = Number(
          creditCardNumber.slice(creditCardNumber.length - 4)
        );

        const createOrderBody: Partial<OrderModel> = {
          cartId: cart._id,
          finalPrice: totalPayment,
          cityForShipping: city,
          streetForShipping: street,
          shippingDate,
          fourLastDigitsOfPayment,
        };

        await dispatch(createOrder(createOrderBody));
        await dispatch(closeCart(cart._id));
        dispatch(emptyCartItemsSync());

        setCity("");
        setStreet("");
        setShippingDate(null);
        setCreditCardNumber("");

        setOrderCompleted(true);
        setTimeout(() => {
          setOrderCompleted(false);
          navigate("/home");
        }, 4000);
      }
    },
    [
      shippingDate,
      cart,
      city,
      dispatch,
      street,
      totalPayment,
      creditCardNumber,
      setOrderCompleted,
      navigate,
    ]
  );

  return (
    <div id="order-form-box">
      <h1>Please fill the form to order:</h1>
      <form id="order-form" onSubmit={(e) => handleOrder(e)}>
        <div className="order-form-group">
          <label htmlFor="city">City:</label>
          <select
            name="city"
            id="city"
            onChange={(e) => setCity(e.target.value)}
            value={city}
            required
          >
            <option disabled hidden>
              Choose Your City
            </option>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>
        <div className="order-form-group">
          <label htmlFor="street">Street:</label>
          <input
            type="text"
            onChange={(e) => setStreet(e.target.value)}
            value={street}
            required
          />
        </div>
        <div className="order-form-group">
          <label htmlFor="shipping-date">Shipping Date:</label>
          <DatePicker
            selected={shippingDate}
            onChange={(date) => setShippingDate(date)}
            filterDate={doesHaveThreeOrders}
            placeholderText="Select a shipping date"
            required
          />
        </div>
        <div className="order-form-group">
          <label htmlFor="credit-card">Credit Card Number:</label>
          <input
            type="number"
            onChange={(e) => setCreditCardNumber(e.target.value)}
            value={creditCardNumber}
            required
          />
        </div>

        <button type="submit">Order</button>
      </form>
    </div>
  );
};

export default OrderFormBox;
