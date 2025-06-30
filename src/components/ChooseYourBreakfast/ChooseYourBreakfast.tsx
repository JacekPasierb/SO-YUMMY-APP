import React, {useMemo} from "react";
import {NavLink} from "react-router-dom";
import {useMediaQuery} from "@react-hook/media-query";

import styles from "./ChooseYourBreakfast.module.css";
import sprite from "../../assets/icons/sprite.svg";
import {getRecipeImage} from "../../helpers/helpers";
import { useTranslation } from "react-i18next";

const ChooseYourBreakfast: React.FC = () => {
  const isMobile = useMediaQuery("(max-width:767px)");
  const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 1199px)");
  const isDesktop = useMediaQuery("(min-width:1200px)");
  const { t } = useTranslation();

  const recipeImage = useMemo(() => {
    return getRecipeImage({isMobile, isTablet, isDesktop});
  }, [isMobile, isTablet, isDesktop]);

  return (
    <div className={styles.container}>
      <img
        src={recipeImage}
        alt="Delicious dish"
        width="315px"
        height="291px"
        className={styles.image}
        loading="lazy"
      />
      <div className={styles.recipeInfo}>
        <span className={styles.description}>
          <span className={styles.highlight}>{t("deliciousAndHealthy")}</span>
          <span> {t("wayToEnjoy")}</span>
        </span>

        <NavLink
          to={`/categories/Breakfast`}
          className={styles.button}
          aria-label="See breakfast recipes"
        >
            {t("seeRecipes")}
          <svg className={styles.icon} aria-hidden="true">
            <use href={`${sprite}#icon-arrow-narrow-right`}></use>
          </svg>
        </NavLink>
      </div>
    </div>
  );
};

export default ChooseYourBreakfast;
