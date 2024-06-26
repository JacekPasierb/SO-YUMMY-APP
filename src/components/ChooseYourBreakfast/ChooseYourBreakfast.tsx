import css from "./ChooseYourBreakfast.module.css";
import recipesMobile from "../../images/recipesMobile1x.png";
import recipesTablet from "../../images/recipesTablet1x.png";
import recipesDesctop from "../../images/recipesDesctop1x.png";
import sprite from "../../assets/icons/sprite.svg";

import React from "react";
import { useMediaQuery } from "@react-hook/media-query";
import { NavLink } from "react-router-dom";

const ChooseYourBreakfast = () => {
  const isMobile = useMediaQuery("(max-width:768px)");
  const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 1200px)");
  const isDesctop = useMediaQuery("(min-width:1200px)");

  const recipes = () => {
    if (isMobile) {
      return recipesMobile;
    } else if (isTablet) {
      return recipesTablet;
    } else if (isDesctop) {
      return recipesDesctop;
    }
  };

  return (
    <div className={css.box}>
      <img src={recipes()} alt="picture dish" className={css.chooseBox} />
      <div className={css.boxRecipes}>
        <span className={css.fontRecipes}>
          <span className={css.fontRecipesInnerColor}>
            Delicious and healthy
          </span>
          way to enjoy a variety of fresh ingredients in one satisfying meal
        </span>

        <NavLink to={`/categories/Breakfast`} className={css.btn}>
          See recipes
          <svg className={css.icon}>
            <use href={sprite + `#icon-arrow-narrow-right`}></use>
          </svg>
        </NavLink>
      </div>
    </div>
  );
};

export default ChooseYourBreakfast;
