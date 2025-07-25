import React, {useTransition} from "react";
import {NavLink, useLocation} from "react-router-dom";
import styles from "./Navigation.module.css";
import sprite from "../../../assets/icons/sprite.svg";
import {useTranslation} from "react-i18next";

interface NavigationLink {
  to: string;
  text?: string;
  icon?: string;
  ariaLabel?: string;
}

const Navigation: React.FC = () => {
  const {pathname} = useLocation();
  const isRecipePage = pathname.includes("/recipe/");
  const { t, i18n } = useTranslation();

  const currentLanguage = i18n.language;
  const category = currentLanguage === "pl" ? "Śniadanie" : "Breakfast";

  const navigationLinks = [
    {to: `/categories/${category}`, text: t("categories")},
    {to: "/add", text: t("add_recipe")},
    {to: "/ownRecipes", text: t("my_recipes")},
    {to: "/favorite", text: t("favorites")},
    {to: "/shopping-list", text: t("shopping_list")},
    {to: "/search", icon: "icon-search", ariaLabel: t("search_button")},
  ];
  return (
    <nav className={styles.navigation} aria-label="Main navigation">
      {navigationLinks.map(({to, text, icon, ariaLabel}) => (
        <NavLink
          key={to}
          to={to}
          className={({isActive}) =>
            `${styles.navigation__link} ${
              isActive ? styles.navigation__link_active : ""
            }`
          }
          aria-label={ariaLabel}
        >
          {text && (
            <span
              className={`${styles.navigation__text} ${
                isRecipePage ? styles.navigation__text_recipePage : ""
              }`}
            >
              {text}
            </span>
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
