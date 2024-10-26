import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./ButtonOtherCategories.module.css";

interface ButtonOtherCategoriesProps {
  text: string;
  categoryName: string;
}

const ButtonOtherCategories: React.FC<ButtonOtherCategoriesProps> = ({ text, categoryName }) => {
  return (
    <NavLink
      to={`/categories/${categoryName}`}
      className={styles.btn}
      aria-label={`See all recipes in ${categoryName} category`}
    >
      {text}
    </NavLink>
  );
};

export default ButtonOtherCategories;
