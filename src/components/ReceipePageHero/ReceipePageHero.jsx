import React from "react";
import MainPageTitle from "../MainPageTitle/MainPageTitle";
import css from "./ReceipePageHero.module.css";
import sprite from "../../assets/icons/sprite.svg";
import Button from "../Button/Button";

const ReceipePageHero = ({ recipe }) => {
  const { title, description, time } = recipe;
  return (
    <div className={css.receipeHeroBox}>
      <MainPageTitle title={title} />
      <p className={css.recipeDescription}>{description}</p>
      <Button text={"Add to favotite recipes"}/>
 
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
