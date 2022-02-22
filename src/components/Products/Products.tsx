import React, { FC, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/app/hooks";
import { selectCategoriesState } from "../../redux/features/categoriesSlice";
import {
  getAllProducts,
  getProductsByCategoryId,
  selectProductsState,
} from "../../redux/features/productsSlice";
import AddToCartModal from "../AddToCartModal/AddToCartModal";
import "./Products.css";

type Props = {};

const Products: FC<Props> = (props) => {
  const dispatch = useAppDispatch();
  const { value: products } = useAppSelector(selectProductsState);
  const { selectedCategory } = useAppSelector(selectCategoriesState);

  useEffect(() => {
    if (selectedCategory) {
      selectedCategory.categoryName === "All"
        ? dispatch(getAllProducts())
        : dispatch(getProductsByCategoryId(selectedCategory._id));
    }
  }, [dispatch, selectedCategory]);

  return (
    <div id="products">
      {products?.map((product) => (
        <div key={product._id} className="product">
          <div className="product-img-container">
            <img
              className="product-img"
              src={product.imgUrl}
              alt={product.productName}
            />
          </div>
          <div className="product-name">{product.productName}</div>
          <div className="product-price">{product.price}</div>
          <AddToCartModal product={product} />
        </div>
      ))}
    </div>
  );
};

export default Products;
