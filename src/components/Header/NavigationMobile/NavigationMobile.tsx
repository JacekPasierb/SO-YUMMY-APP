import React, { FC } from "react";
import { NavLink } from "react-router-dom";
import styles from "./NavigationMobile.module.css";
import sprite from "../../../assets/icons/sprite.svg";
import { useTranslation } from "react-i18next";

interface NavigationLink {
  to: string;
  text: string;
  icon?: string;
}

interface NavigationMobileProps {
  onClose: () => void;
}



const NavigationMobile: FC<NavigationMobileProps> = ({ onClose }) => {
  const { t, i18n } = useTranslation();

  const currentLanguage = i18n.language;
  const category = currentLanguage === "pl" ? "Śniadanie" : "Breakfast";


  const navigationLinks: NavigationLink[] = [
    { to:`/categories/${category}`, text: t("categories") },
    { to: "/add", text: t("add_recipe") },
    { to: "/ownRecipes", text: t("my_recipes") },
    { to: "/favorite", text: t("favorites") },
    { to: "/shopping-list", text: t("shopping_list") },
    { to: "/search", text: t("search_button"), icon: "icon-search" }
  ];


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
