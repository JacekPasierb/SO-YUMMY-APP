import React from "react";
import {useDispatch} from "react-redux";
import {NavLink, useLocation} from "react-router-dom";
import {toast} from "react-toastify";
import {AppDispatch} from "../../redux/store";
import {deleteRecipe, getOwnRecipes} from "../../redux/ownRecipes/operations";
import {removeFromFavorite} from "../../redux/favoriteRecipes/operations";
import styles from "./CardOwnRecipe.module.css";
import sprite from "../../assets/icons/sprite.svg";
import {useTranslation} from "react-i18next";
import { getPageFromQueryString } from "../../helpers/helpers";

interface OwnRecipe {
  _id: string;
  title: string;
  preview: string;
  description: string;
  time: string;
}

interface CardOwnRecipeProps {
  ownRecipe: OwnRecipe;
}

const CardOwnRecipe: React.FC<CardOwnRecipeProps> = ({ownRecipe}) => {
  const dispatch: AppDispatch = useDispatch();
  const {pathname} = useLocation();
  const {_id, preview, title, description, time} = ownRecipe;
  const {t} = useTranslation();
  const { search } = useLocation();
  const currentPage = getPageFromQueryString(search);
  
  const handleDelete = async() => {
    await dispatch(deleteRecipe(_id));
    dispatch(getOwnRecipes({ page: currentPage }));
  };

  const handleRemove = () => {
    dispatch(removeFromFavorite(_id));

    toast.success("Recipe removed from favorites");
  };

  const isFavorite = pathname === "/favorite";

  return (
    <div className={styles.myRecipesList__card}>
      <img
        src={preview}
        width="124"
        height="124"
        className={styles.myRecipesList__image}
        alt={`${title} recipe`}
      />
      <div className={styles.myRecipesList__info}>
        <div className={styles.myRecipesList__rowFirst}>
          <h2 className={styles.myRecipesList__title}>{title}</h2>
          <button
            type="button"
            onClick={isFavorite ? handleRemove : handleDelete}
            className={styles.myRecipesList__deleteBtn}
            aria-label={isFavorite ? "Remove from favorites" : "Delete recipe"}
          >
            <svg
              className={
                isFavorite
                  ? styles.myRecipesList__iconBgRemove
                  : styles.myRecipesList__iconBgDelete
              }
            >
              <use
                href={`${sprite}#icon-trash-01`}
                className={styles.myRecipesList__iconDel}
              />
            </svg>
          </button>
        </div>
        <p className={styles.myRecipesList__description}>{description}</p>
        <div className={styles.myRecipesList__row}>
          <p className={styles.myRecipesList__time}>{time} min</p>
          <NavLink
            to={`/recipe/${_id}`}
            className={`${styles.myRecipesList__seeBtn} ${
              isFavorite
                ? styles.myRecipesList__txtFavBtn
                : styles.myRecipesList__txtBtn
            }`}
          >
            {t("seeRecipe")}
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default CardOwnRecipe;
