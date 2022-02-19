import React, { FC, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/app/hooks";
import {
  getCategories,
  selectCategoriesState,
} from "../../redux/features/categoriesSlice";
import "./Categories.css";

type Props = {};

const Categories: FC<Props> = (props) => {
  const dispatch = useAppDispatch();
  const { value: categories } = useAppSelector(selectCategoriesState);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  return (
    <div id="categories">
      {categories?.map((category) => (
        <div key={category._id} className="category">
          {category.categoryName}
        </div>
      ))}
    </div>
  );
};

export default Categories;
