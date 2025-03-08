import React, { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import MainPageTitle from "../MainPageTitle/MainPageTitle";
import { selectUser } from "../../redux/auth/selectors";
import { AppDispatch } from "../../redux/store";
import {
  addToFavorite,
  removeFromFavorite,
} from "../../redux/favoriteRecipes/operations";
import { IRecipe } from "../../types/recipesTypes";
import sprite from "../../assets/icons/sprite.svg";
import styles from "./ReceipePageHero.module.css";
import { useTranslation } from "react-i18next";

interface ReceipePageHeroProps {
  recipe: IRecipe;
  isLoading: boolean;
}

const ReceipePageHero: FC<ReceipePageHeroProps> = ({ recipe, isLoading }) => {
  const { title, description, time, favorites, _id } = recipe;
  const { userId } = useSelector(selectUser);
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (userId && Array.isArray(favorites)) {
      setIsFavorite(favorites.includes(userId));
    }
  }, [favorites, userId]);

  const handleFavoriteClick = async (id: string) => {
    try {
      if (isFavorite) {
        await dispatch(removeFromFavorite(id));
        toast.success(t("recipeRemoved"));
      } else {
        await dispatch(addToFavorite(id));
        toast.success(t("recipeAdded"));
      }

      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error("Error:", error);
      toast.error(t("general"));
    }
  };

  if (isLoading) {
    return (
      <div className={styles.recipeHero__skeleton} aria-busy="true">
        <div className={styles.recipeHero__skeletonTitle} />
        <div className={styles.recipeHero__skeletonDescription} />
        <div className={styles.recipeHero__skeletonBtn} />
        <div className={styles.recipeHero__skeletonTime} />
      </div>
    );
  }

  return (
    <div className={styles.recipeHero}>
      <MainPageTitle title={title} />
      <p className={styles.recipeHero__description}>{description}</p>
      <button
        type="button"
        className={`${styles.recipeHero__btn} ${styles.recipeHero__btnText}`}
        onClick={() => handleFavoriteClick(_id)}
      >
        {!isFavorite ? t("addToFavorites") : t("removeFromFavorites")}
      </button>
      {time && (
        <div className={styles.recipeHero__timeBox}>
          <svg className={styles.recipeHero__iconClock}>
            <use href={`${sprite}#icon-clock`}></use>
          </svg>
          <p className={styles.recipeHero__timeText}>{time} min</p>
        </div>
      )}
    </div>
  );
};

export default ReceipePageHero;
