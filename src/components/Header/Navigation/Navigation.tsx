import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Navigation.module.css";
import sprite from "../../../assets/icons/sprite.svg";

interface NavigationLink {
  to: string;
  text?: string;
  icon?: string;
  ariaLabel?: string;
}

const navigationLinks: NavigationLink[] = [
  { to: "/categories/Beef", text: "Categories" },
  { to: "/add", text: "Add Recipes" },
  { to: "/ownRecipes", text: "My Recipes" },
  { to: "/favorite", text: "Favorites" },
  { to: "/shopping-list", text: "Shopping List" },
  { to: "/search", icon: "icon-search", ariaLabel: "Search" }
];

const Navigation: React.FC = () => {
  return (
    <nav className={styles.navigation} aria-label="Main navigation">
      {navigationLinks.map(({ to, text, icon, ariaLabel }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) => 
            `${styles.navigation__link} ${isActive ? styles.navigation__link_active : ''}`
          }
          aria-label={ariaLabel}
        >
          {text && (
            <span className={styles.navigation__text}>{text}</span>
          )}
          {icon && (
            <svg 
              className={styles.navigation__icon} 
              aria-hidden="true"
              width="24"
              height="24"
            >
              <use href={`${sprite}#${icon}`} />
            </svg>
          )}
        </NavLink>
      ))}
    </nav>
  );
};

export default Navigation;
