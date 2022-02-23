import React, { FC, useCallback, useEffect } from "react";
import { CategoryModel } from "../../models/Category.model";
import { useAppDispatch, useAppSelector } from "../../redux/app/hooks";
import {
  selectCategoriesState,
  selectCategory,
} from "../../redux/features/categoriesSlice";
import { fetchCategories } from "../../redux/thunks/categories-thunks";
import "./Categories.css";

type Props = {};

const Categories: FC<Props> = (props) => {
  const dispatch = useAppDispatch();
  const { value: categories, selectedCategory } = useAppSelector(
    selectCategoriesState
  );

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const onCategoryClick = useCallback(
    (category: CategoryModel) => {
      dispatch(selectCategory(category));
    },
    [dispatch]
  );

  return (
    <div id="categories">
      {categories?.map((category) => (
        <div
          key={category._id}
          id={
            selectedCategory?.categoryName === category.categoryName
              ? "selected-category"
              : undefined
          }
          className="category"
          onClick={() => onCategoryClick(category)}
        >
          {category.categoryName}
        </div>
      ))}
    </div>
  );
};

export default Categories;
