import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Nav.module.css";

const NAV_ITEMS = [
  {
    path: "/search?ingredient=''",
    label: "Ingredients",
  },
  {
    path: "/add",
    label: "Add Recipes",
  },
  {
    path: "/ownRecipes",
    label: "My Recipes",
  },
  {
    path: "/favorite",
    label: "Favorites",
  },
  {
    path: "/shopping-list",
    label: "Shopping List",
  },
] as const;

const Nav: React.FC = () => {
  return (
    <nav className={styles.navigation} aria-label="Footer navigation">
      <ul className={styles.navigation__list}>
        {NAV_ITEMS.map(({ path, label }) => (
          <li key={path} className={styles.navigation__item}>
            <NavLink
              to={path}
              className={({ isActive }) =>
                `${styles.navigation__link} ${
                  isActive ? styles.navigation__link_active : ""
                }`
              }
            >
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Nav;
