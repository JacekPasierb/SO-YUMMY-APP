import React, { FC } from "react";
import { NavLink } from "react-router-dom";
import css from "./NavigationMobile.module.css";
import sprite from "../../../assets/icons/sprite.svg";

interface NavigationMobileProps {
  onClose: () => void;
}

const NavigationMobile: FC<NavigationMobileProps> = ({ onClose }) => {
  return (
    <nav className={css.navigation}>
      <NavLink to="/categories/:categoryName" className={css.link}>
        <span className={css.navText} onClick={onClose}>
          Categories
        </span>
      </NavLink>
      <NavLink to="/add" className={css.link}>
        <span className={css.navText} onClick={onClose}>
          Add Recipes
        </span>
      </NavLink>
      <NavLink to="/my" className={css.link}>
        <span className={css.navText} onClick={onClose}>
          My Recipes
        </span>
      </NavLink>
      <NavLink to="/favorite" className={css.link}>
        <span className={css.navText} onClick={onClose}>
          Favorites
        </span>
      </NavLink>
      <NavLink to="/shopping-list" className={css.link}>
        <span className={css.navText} onClick={onClose}>
          Shopping List
        </span>
      </NavLink>
      <NavLink to="/search " className={css.link}>
        <svg className={css.iconSearch}>
          <use href={sprite + `#icon-search`}></use>
        </svg>
        <span className={css.navText} onClick={onClose}>
          Shearch
        </span>
      </NavLink>
    </nav>
  );
};

export default NavigationMobile;
