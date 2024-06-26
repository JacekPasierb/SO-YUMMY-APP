import css from "./Navigation.module.css";
import sprite from "../../../assets/icons/sprite.svg";

import React from "react";
import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <nav className={css.navigation}>
      <NavLink to="/categories/:categoryName" className={css.link}>
        <span className={css.navText}>Categories</span>
      </NavLink>
      <NavLink to="/add" className={css.link}>
        <span className={css.navText}>Add Recipes</span>
      </NavLink>
      <NavLink to="/ownRecipes" className={css.link}>
        <span className={css.navText}>My Recipes</span>
      </NavLink>
      <NavLink to="/favorite" className={css.link}>
        <span className={css.navText}>Favorites</span>
      </NavLink>
      <NavLink to="/shopping-list" className={css.link}>
        <span className={css.navText}>Shopping List</span>
      </NavLink>
      <NavLink to="/search " className={css.link}>
        <svg className={css.iconSearch}>
          <use href={sprite + `#icon-search`}></use>
        </svg>
      </NavLink>
    </nav>
  );
};

export default Navigation;
