import React, { FC } from "react";
import { NavLink } from "react-router-dom";
import styles from "./ButtonOtherCategories.module.css";

interface ButtonOtherCategoriesProps {
  text: string;
}

const ButtonOtherCategories: FC<ButtonOtherCategoriesProps> = ({ text }) => {
  return (
    <NavLink
      to={`/categories/:categoryName`}
      className={styles.btn}
      aria-label={`See all recipes in category`}
    >
      {text}
    </NavLink>
  );
};

export default ButtonOtherCategories;
