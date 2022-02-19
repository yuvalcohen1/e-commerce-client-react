import React from "react";
import { useAppSelector } from "../../redux/app/hooks";
import { selectUserState } from "../../redux/features/userSlice";
import "./Header.css";

type Props = {};

const Header = (props: Props) => {
  const { value: user } = useAppSelector(selectUserState);

  const currentLocation = window.location.pathname;

  return (
    <header>
      <div id="header-top">
        <div id="logo">SHOPO</div>
        <div id="contact">
          <div>contact us at:</div>
          <div>email: shopo@gmail.com</div>
          <div>phone: 03-1111111</div>
        </div>
      </div>

      <div
        id="header-bottom"
        className={
          currentLocation === "/home" ? "without-search" : "with-search"
        }
      >
        {currentLocation === "/shopping" ? (
          <div id="search-products">
            <label htmlFor="search-products">Search Products</label>
            <input type="text" id="search-products" />
            <button>Search</button>
          </div>
        ) : null}

        {currentLocation === "/home" ? (
          <div id="hello">hello {user ? user.firstName : "guest"}</div>
        ) : null}
      </div>
    </header>
  );
};

export default Header;
