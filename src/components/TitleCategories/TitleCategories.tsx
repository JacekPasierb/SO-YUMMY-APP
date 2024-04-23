import css from "./TitleCategories.module.css";

import React, { FC } from "react";

interface TitleCategoriesProps {
  categories: string;
}

const TitleCategories: FC<TitleCategoriesProps> = ({ categories }) => {
  return (
    <h2 className={css.titleCategories}>
      {categories.charAt(0).toUpperCase() + categories.slice(1)}
    </h2>
  );
};

export default TitleCategories;
