import React, { FC, useEffect, useState } from "react";
import { fetchNumOfAvailableProducts } from "../../api-client/product-api";
import "./InfoBox.css";

interface Props {}

const InfoBox: FC<Props> = (props) => {
  const [numOfAvailableProducts, setNumOfAvailableProducts] = useState(0);

  useEffect(() => {
    const getNumOfAvailableProducts = async () => {
      const numOfAvailableProducts: number =
        await fetchNumOfAvailableProducts();

      console.log(numOfAvailableProducts);

      setNumOfAvailableProducts(numOfAvailableProducts);
    };

    getNumOfAvailableProducts();
  }, []);

  return (
    <div id="info-box">
      <div id="orders-amount" className="info-part">
        number of all orders
      </div>
      <div id="products-amount" className="info-part">
        {numOfAvailableProducts}{" "}
        {numOfAvailableProducts === 1 ? "product is" : "products are"} currently
        available in our store
      </div>
      <div id="notification" className="info-part">
        notifications
      </div>
    </div>
  );
};

export default InfoBox;
