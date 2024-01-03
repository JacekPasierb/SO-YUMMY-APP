import React from "react";
import css from "./Navigation.module.css";
import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <nav className={css.navigation}>
      <NavLink href="/categories/:categoryName" className={css.link}>
        <span className={css.navText}>Categories</span>
      </NavLink>
      <NavLink href="/add" className={css.link}>
        <span className={css.navText}>Add Recipes</span>
      </NavLink>
      <NavLink href="/my" className={css.link}>
        <span className={css.navText}>My Recipes</span>
      </NavLink>
      <NavLink href="/favorite" className={css.link}>
        <span className={css.navText}>Favorites</span>
      </NavLink>
      <NavLink href="/shopping-list" className={css.link}>
        <span className={css.navText}>Shopping List</span>
      </NavLink>
      <NavLink href="/search " className={css.link}>
        <span className={css.navText}>Search</span>
      </NavLink>
    </nav>
  );
};

export default Navigation;
