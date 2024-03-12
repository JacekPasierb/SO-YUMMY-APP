import React from "react";
import MainPageTitle from "../MainPageTitle/MainPageTitle";
import css from "./ReceipePageHero.module.css";
import sprite from "../../assets/icons/sprite.svg";

import ButtonOtherCategories from "../ButtonOtherCategories/ButtonOtherCategories";
import { NavLink } from "react-router-dom";

const ReceipePageHero = ({ recipe }) => {
  const { title, description, time } = recipe;
  return (
    <div className={css.receipeHeroBox}>
      <MainPageTitle title={title} />
      <p className={css.recipeDescription}>{description}</p>

      <NavLink to={`/categories/:categoryName`} className={css.btn}>
       <span className={css.textBtn}>Add to favotite recipes</span> 
      </NavLink>
      {time && (
        <div className={css.timeBox}>
          <svg className={css.iconClock}>
            <use href={sprite + `#icon-clock`}></use>
          </svg>
          <p className={css.timeText}>{time} min</p>
        </div>
      )}
    </div>
  );
};

export default ReceipePageHero;
