import React from "react";
import MainPageTitle from "../MainPageTitle/MainPageTitle";
import css from "./ReceipePageHero.module.css";
import sprite from "../../assets/icons/sprite.svg";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/auth/selectors";

const ReceipePageHero = ({ recipe }) => {
  const { title, description, time } = recipe;
  const { id: userId } = useSelector(selectUser);

  console.log("id Uzytk", userId);
  console.log("recipe", recipe);
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
