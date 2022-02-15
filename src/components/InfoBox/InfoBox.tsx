import React, { FC } from "react";
import "./InfoBox.css";

interface Props {}

const InfoBox: FC<Props> = (props) => {
  return (
    <div id="info-box">
      <div id="orders-amount" className="info-part">
        number of all orders
      </div>
      <div id="products-amount" className="info-part">
        number of all products available
      </div>
      <div id="notification" className="info-part">
        notifications
      </div>
    </div>
  );
};

export default InfoBox;
