import css from "./ReceipePageHero.module.css";
import sprite from "../../assets/icons/sprite.svg";

import React, { useEffect, useState } from "react";

import MainPageTitle from "../MainPageTitle/MainPageTitle";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../redux/auth/selectors";

import { toast } from "react-toastify";
import { AppDispatch } from "../../redux/store";
import {
  addToFavorite,
  removeFromFavorite,
} from "../../redux/favoriteRecipes/operations";
import { IRecipe } from "../../types/recipesTypes";

const ReceipePageHero = ({ recipe ,isLoading}: { recipe: IRecipe, isLoading: boolean }) => {
  const { title, description, time, favorites, _id } = recipe;
  const user = useSelector(selectUser);
  const userId = user.userId;

  const [isFav, setIsFav] = useState(false);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (userId && Array.isArray(favorites)) {
      setIsFav(favorites.includes(userId));
    }
  }, [recipe, favorites, userId]);

  const handleFavorite = async (id: string) => {
    try {
      if (isFav) {
        await dispatch(removeFromFavorite(id));
        toast.success("Recipe removed from favorites");
      } else {
        await dispatch(addToFavorite(id));
        toast.success("Recipe add to favorites");
      }

      setIsFav(!isFav);
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong..");
    }
  };

  if (isLoading) {
    return (
      <div className={css.skeleton}>
        <div className={css.skeletonTitle}></div>
        <div className={css.skeletonDescription}></div>
        <div className={css.skeletonButton}></div>
        <div className={css.skeletonTime}></div>
      </div>
    );
  }
  return (
    <div className={css.receipeHeroBox}>
      <MainPageTitle title={title} />
      <p className={css.recipeDescription}>{description}</p>

      <button
        type="button"
        className={`${css.btn} ${css.textBtn}`}
        onClick={() => handleFavorite(_id)}
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
