import React from 'react'
import { NavLink } from 'react-router-dom';
import css from "./NavigationMobile.module.css";
import sprite from "../../../assets/icons/sprite.svg";

const NavigationMobile = ({onClose}) => {
  return (
    <nav className={css.navigation} onClick={onClose}>
      <NavLink to="/categories/:categoryName" className={css.link}>
        <span className={css.navText}>Categories</span>
      </NavLink>
      <NavLink to="/add" className={css.link}>
        <span className={css.navText}>Add Recipes</span>
      </NavLink>
      <NavLink to="/my" className={css.link}>
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
        <span className={css.navText}>Shearch</span>
      </NavLink>
    </nav>
  );
}

export default NavigationMobile