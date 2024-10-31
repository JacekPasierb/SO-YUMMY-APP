import React, { FC } from "react";
import { NavLink } from "react-router-dom";
import styles from "./NavigationMobile.module.css";
import sprite from "../../../assets/icons/sprite.svg";

interface NavigationLink {
  to: string;
  text: string;
  icon?: string;
}

interface NavigationMobileProps {
  onClose: () => void;
}

const navigationLinks: NavigationLink[] = [
  { to: "/categories/Beef", text: "Categories" },
  { to: "/add", text: "Add Recipes" },
  { to: "/ownRecipes", text: "My Recipes" },
  { to: "/favorite", text: "Favorites" },
  { to: "/shopping-list", text: "Shopping List" },
  { to: "/search", text: "Search", icon: "icon-search" }
];

const NavigationMobile: FC<NavigationMobileProps> = ({ onClose }) => {
  return (
    <nav 
      className={styles.navigation}
      aria-label="Mobile navigation"
    >
      {navigationLinks.map(({ to, text, icon }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) => 
            `${styles.navigation__link} ${isActive ? styles.navigation__link_active : ''}`
          }
          onClick={onClose}
        >
          {icon && (
            <svg 
              className={styles.navigation__icon}
              width="24"
              height="24"
              aria-hidden="true"
            >
              <use href={`${sprite}#${icon}`} />
            </svg>
          )}
          <span className={styles.navigation__text}>
            {text}
          </span>
        </NavLink>
      ))}
    </nav>
  );
};

export default NavigationMobile;
