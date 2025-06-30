import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Nav.module.css";
import { useTranslation } from "react-i18next";



const Nav: React.FC = () => {
  const {t}=useTranslation();
  const NAV_ITEMS = [
    {
      path: "/search?type=ingredient",
      
      label: t("ingredients"),
    },
    {
      path: "/add",
      label: t("add_recipe"),
    },
    {
      path: "/ownRecipes",
      label: t("my_recipes"),
    },
    {
      path: "/favorite",
      label: t("favorites"),
    },
    {
      path: "/shopping-list",
      label: t("shopping_list"),
    },
  ] as const;
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
