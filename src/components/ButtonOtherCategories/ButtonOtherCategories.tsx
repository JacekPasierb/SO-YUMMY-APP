import React, { FC } from "react";
import css from "./ButtonOtherCategories.module.css";
import { NavLink } from "react-router-dom";

interface ButtonOtherCategoriesProps {
  text: string;
}

const ButtonOtherCategories:FC<ButtonOtherCategoriesProps> = ({ text }) => {
  return (
    <NavLink to={`/categories/:categoryName`} className={css.btn}>
      {text}
    </NavLink>
  );
};

export default ButtonOtherCategories;
