import css from "./CardOwnRecipe.module.css";
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
    dispatch(removeFromFavorite(id))
    toast.success("Recipe removed from favorites");
  };

  const { _id, preview, title, description, time } = ownRecipe;

  return (
    <div className={css.cardBox}>
      <img
        src={preview}
        width="124"
        height="124"
        className={css.recipeImg}
        alt="recipe photo"
      />
      <div className={css.recipeInfo}>
        <div className={css.rowFirst}>
          <h2 className={css.titleRecipe}>{title}</h2>
          <button
            type="button"
            onClick={() =>
              pathname === "/favorite" ? handleRemove(_id) : handleDelete(_id)
            }
            className={css.delBtn}
          >
            <svg
              className={
                pathname === "/favorite" ? css.iconBgRemove : css.iconBgDelete
              }
            >
              <use
                href={sprite + `#icon-trash-01`}
                className={css.iconDel}
              ></use>
            </svg>
          </button>
        </div>
        <p className={css.recipeDescription}>{description}</p>
        <div className={css.row}>
          <p className={css.recipeTime}>{time} min</p>
          <NavLink
            to={`/recipe/${_id}`}
            className={
              pathname === "/favorite"
                ? `${css.recipeFavSeeBtn} ${css.txtFavBtn}`
                : `${css.recipeSeeBtn} ${css.txtBtn}`
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
