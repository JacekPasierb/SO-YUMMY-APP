import css from "./ReceipePageHero.module.css";
import sprite from "../../assets/icons/sprite.svg";

import React from "react";

import MainPageTitle from "../MainPageTitle/MainPageTitle";

interface Recipe {
  title: string;
  description: string;
  time: string;
}

const ReceipePageHero = ({ recipe }: { recipe: Recipe }) => {
  const { title, description, time } = recipe;

  return (
    <div className={css.receipeHeroBox}>
      <MainPageTitle title={title} />
      <p className={css.recipeDescription}>{description}</p>

      <button type="button" className={css.btn}>
        <span className={css.textBtn}>Add to favotite recipes</span>
      </button>
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
