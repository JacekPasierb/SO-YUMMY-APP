import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Navigation.module.css";
import sprite from "../../../assets/icons/sprite.svg";

const Navigation: React.FC = () => {
  return (
    <nav className={styles.navigation}>
      <NavLink
        to="/categories/Beef"
        className={styles.navigation__link}
      >
        <span className={styles.navigation__text}>Categories</span>
      </NavLink>
      <NavLink to="/add" className={styles.navigation__link}>
        <span className={styles.navigation__text}>Add Recipes</span>
      </NavLink>
      <NavLink to="/ownRecipes" className={styles.navigation__link}>
        <span className={styles.navigation__text}>My Recipes</span>
      </NavLink>
      <NavLink to="/favorite" className={styles.navigation__link}>
        <span className={styles.navigation__text}>Favorites</span>
      </NavLink>
      <NavLink to="/shopping-list" className={styles.navigation__link}>
        <span className={styles.navigation__text}>Shopping List</span>
      </NavLink>
      <NavLink
        to="/search"
        className={styles.navigation__link}
        aria-label="Search"
      >
        <svg className={styles.navigation__iconSearch}>
          <use href={`${sprite}#icon-search`} />
        </svg>
      </NavLink>
    </nav>
  );
};

export default Navigation;
