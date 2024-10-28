import React, { useMemo } from "react";
import { NavLink } from "react-router-dom";
import { useMediaQuery } from "@react-hook/media-query";

import styles from "./ChooseYourBreakfast.module.css";
import sprite from "../../assets/icons/sprite.svg";
import { getRecipeImage } from "../../helpers/helpers";

const ChooseYourBreakfast: React.FC = () => {
  const isMobile = useMediaQuery("(max-width:767px)");
  const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 1199px)");
  const isDesktop = useMediaQuery("(min-width:1200px)");

  const recipeImage = useMemo(() => {
    return getRecipeImage(isMobile, isTablet, isDesktop);
  }, [isMobile, isTablet, isDesktop]);

  return (
    <div className={styles.container}>
      <img
        src={recipeImage}
        alt="Delicious dish"
        className={styles.image}
        loading="lazy"
      />
      <div className={styles.recipeInfo}>
        <span className={styles.description}>
          <span className={styles.highlight}>Delicious and healthy</span>
          way to enjoy a variety of fresh ingredients in one satisfying meal
        </span>

        <NavLink
          to={`/categories/Breakfast`}
          className={styles.button}
          aria-label="See breakfast recipes"
        >
          See recipes
          <svg className={styles.icon} aria-hidden="true">
            <use href={`${sprite}#icon-arrow-narrow-right`}></use>
          </svg>
        </NavLink>
      </div>
    </div>
  );
};

export default ChooseYourBreakfast;
