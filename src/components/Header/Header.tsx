import React, { useCallback, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/app/hooks";
import { setSelectedCategoryToNull } from "../../redux/features/categoriesSlice";
import { selectUserState } from "../../redux/features/userSlice";
import { fetchProductsByProductName } from "../../redux/thunks/products-thunks";
import "./Header.css";

type Props = {};

const Header = (props: Props) => {
  const [searchProductInput, setSearchProductInput] = useState("");

  const dispatch = useAppDispatch();
  const { value: user } = useAppSelector(selectUserState);

  const currentLocation = window.location.pathname;

  const handleSearchProducts = useCallback(
    async (e) => {
      e.preventDefault();
      dispatch(setSelectedCategoryToNull());
      await dispatch(fetchProductsByProductName(searchProductInput));
    },
    [dispatch, searchProductInput]
  );

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
          <form
            id="search-products-form"
            onSubmit={(e) => handleSearchProducts(e)}
          >
            <label id="search-products-label" htmlFor="search-products">Search Products</label>
            <input
              type="text"
              id="search-products"
              onChange={(e) => setSearchProductInput(e.target.value)}
            />
            <button id="search-products-btn" type="submit">Search</button>
          </form>
        ) : null}

        {currentLocation === "/home" ? (
          <div id="hello">hello {user ? user.firstName : "guest"}</div>
        ) : null}
      </div>
    </header>
  );
};

export default Header;
