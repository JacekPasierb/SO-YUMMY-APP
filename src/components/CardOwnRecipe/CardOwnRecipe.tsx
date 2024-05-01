import css from "./CardOwnRecipe.module.css";
import sprite from "../../assets/icons/sprite.svg";

import React from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { deleteRecipe } from "../../redux/recipes/operations";
import { NavLink } from "react-router-dom";

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

  const handleDelete = (id: string) => {
    dispatch(deleteRecipe(id));
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
          <button type="button" onClick={() => handleDelete(_id)} className={css.delBtn}>
            <svg className={css.iconDelete}>
              <use
                href={sprite + `#icon-trash-01`}
                width="14px"
                height="14px"
              ></use>
            </svg>
          </button>
        </div>
        <p className={css.recipeDescription}>{description}</p>
        <div className={css.row}>
          <p className={css.recipeTime}>{time} min</p>
          <NavLink
            to={`/recipe/${_id}`}
            className={`${css.recipeSeeBtn} ${css.txtBtn}`}
          >
            See recipes
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default CardOwnRecipe;
