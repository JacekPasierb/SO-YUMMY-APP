import css from "./ReceipePageHero.module.css";
import sprite from "../../assets/icons/sprite.svg";

import React, { useEffect } from "react";

import MainPageTitle from "../MainPageTitle/MainPageTitle";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/auth/selectors";

interface Recipe {
  title: string;
  description: string;
  time: string;
  favorites: any[];
}

const ReceipePageHero = ({ recipe }: { recipe: Recipe }) => {
  const { title, description, time, favorites } = recipe;
  const user = useSelector(selectUser);
  const userId = user.userId;
  let isFav = false;

  useEffect(() => {
    if (favorites !== undefined) {
      isFav = favorites.includes(userId);
    }
  }, [recipe]);

  // const handleFavorite = () => {
  //   isFav ? dispatch(updateRecipe())
  // }
  return (
    <div className={css.receipeHeroBox}>
      <MainPageTitle title={title} />
      <p className={css.recipeDescription}>{description}</p>

      <button
        type="button"
        className={`${css.btn} ${css.textBtn}`}
       
      >
        {!isFav ? "Add to favorite recipes" : "Remove from favorites"}
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
