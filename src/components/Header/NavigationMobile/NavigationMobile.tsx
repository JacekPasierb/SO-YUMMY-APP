import React, { FC } from "react";
import { NavLink } from "react-router-dom";
import styles from "./NavigationMobile.module.css";
import sprite from "../../../assets/icons/sprite.svg";

interface NavigationMobileProps {
  onClose: () => void;
}

const NavigationMobile: FC<NavigationMobileProps> = ({ onClose }) => {
  return (
    <nav className={styles.navigation}>
      <NavLink
        to="/categories/:categoryName"
        className={styles.navigation__link}
      >
        <span className={styles.navigation__text} onClick={onClose}>
          Categories
        </span>
      </NavLink>
      <NavLink to="/add" className={styles.navigation__link}>
        <span className={styles.navigation__text} onClick={onClose}>
          Add Recipes
        </span>
      </NavLink>
      <NavLink to="/ownRecipes" className={styles.navigation__link}>
        <span className={styles.navigation__text} onClick={onClose}>
          My Recipes
        </span>
      </NavLink>
      <NavLink to="/favorite" className={styles.navigation__link}>
        <span className={styles.navigation__text} onClick={onClose}>
          Favorites
        </span>
      </NavLink>
      <NavLink to="/shopping-list" className={styles.navigation__link}>
        <span className={styles.navigation__text} onClick={onClose}>
          Shopping List
        </span>
      </NavLink>
      <NavLink to="/search " className={styles.navigation__link}>
        <svg className={styles.navigation__icon}>
          <use href={`${sprite}#icon-search`} ></use>
        </svg>
        <span className={styles.navigation__text} onClick={onClose}>
          Search
        </span>
      </NavLink>
    </nav>
  );
};

export default NavigationMobile;
