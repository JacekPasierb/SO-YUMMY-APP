import styles from "./CardOwnRecipe.module.css";
import sprite from "../../assets/icons/sprite.svg";

import React from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { NavLink, useLocation } from "react-router-dom";
import { deleteRecipe } from "../../redux/ownRecipes/operations";
import { toast } from "react-toastify";
import { removeFromFavorite } from "../../redux/favoriteRecipes/operations";

interface OwnRecipe {
  _id: string;
  title: string;
  preview: string;
  description: string;
  time: string;
}

interface Props {
  ownRecipe: OwnRecipe;
}

const CardOwnRecipe = ({ ownRecipe }: Props) => {
  const dispatch: AppDispatch = useDispatch();
  const { pathname } = useLocation();
  const handleDelete = (id: string) => {
    dispatch(deleteRecipe(id));
  };
  const handleRemove = (id: string) => {
    dispatch(removeFromFavorite(id));
    toast.success("Recipe removed from favorites");
  };

  const { _id, preview, title, description, time } = ownRecipe;

  return (
    <div className={styles.myRecipesList__card}>
      <img
        src={preview}
        width="124"
        height="124"
        className={styles.myRecipesList__image}
        alt="recipe photo"
      />
      <div className={styles.myRecipesList__info}>
        <div className={styles.myRecipesList__rowFirst}>
          <h2 className={styles.myRecipesList__title}>{title}</h2>
          <button
            type="button"
            onClick={() =>
              pathname === "/favorite" ? handleRemove(_id) : handleDelete(_id)
            }
            className={styles.myRecipesList__deleteBtn}
          >
            <svg
              className={
                pathname === "/favorite"
                  ? styles.myRecipesList__iconBgRemove
                  : styles.myRecipesList__iconBgDelete
              }
            >
              <use
                href={sprite + `#icon-trash-01`}
                className={styles.myRecipesList__iconDel}
              ></use>
            </svg>
          </button>
        </div>
        <p className={styles.myRecipesList__description}>{description}</p>
        <div className={styles.myRecipesList__row}>
          <p className={styles.myRecipesList__time}>{time} min</p>
          <NavLink
            to={`/recipe/${_id}`}
            className={
              pathname === "/favorite"
                ? `${styles.myRecipesList__favSeeBtn} ${styles.myRecipesList__txtFavBtn}`
                : `${styles.myRecipesList__seeBtn} ${styles.myRecipesList__txtBtn}`
            }
          >
            See recipes
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default CardOwnRecipe;
