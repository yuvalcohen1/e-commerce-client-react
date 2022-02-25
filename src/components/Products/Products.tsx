import React, { FC, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/app/hooks";
import { selectCartItemsState } from "../../redux/features/cartItemsSlice";
import { selectCategoriesState } from "../../redux/features/categoriesSlice";
import { selectProductsState } from "../../redux/features/productsSlice";
import {
  fetchAllProducts,
  fetchProductsByCategoryId,
} from "../../redux/thunks/products-thunks";
import AddToCartModal from "../AddToCartModal/AddToCartModal";
import "./Products.css";

type Props = {};

const Products: FC<Props> = (props) => {
  const dispatch = useAppDispatch();
  const { value: products } = useAppSelector(selectProductsState);
  const { selectedCategory } = useAppSelector(selectCategoriesState);
  const { value: cartItems } = useAppSelector(selectCartItemsState);

  useEffect(() => {
    if (selectedCategory) {
      selectedCategory.categoryName === "All"
        ? dispatch(fetchAllProducts())
        : dispatch(fetchProductsByCategoryId(selectedCategory._id));
    }
  }, [dispatch, selectedCategory]);

  return (
    <div id="products">
      {products?.map((product) => (
        <div key={product._id} className="product">
          <div id="product-main-content">
            <div className="product-img-container">
              <img
                className="product-img"
                src={product.imgUrl}
                alt={product.productName}
              />
            </div>
            <div className="product-name">{product.productName}</div>
            <div className="product-price">{product.price}</div>
          </div>
          {cartItems.findIndex(
            (cartItem) => cartItem.product._id === product._id
          ) === -1 ? (
            <AddToCartModal product={product} />
          ) : null}
        </div>
      ))}
    </div>
  );
};

export default Products;
