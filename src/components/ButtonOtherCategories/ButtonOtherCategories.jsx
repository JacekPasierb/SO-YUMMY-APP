import React from "react";
import css from "./ButtonOtherCategories.module.css";
import { NavLink } from "react-router-dom";

const ButtonOtherCategories = ({ text }) => {
  return (
    <NavLink to={`/categories/:categoryName`} className={css.btn}>
      {text}
    </NavLink>
  );
};

export default ButtonOtherCategories;
