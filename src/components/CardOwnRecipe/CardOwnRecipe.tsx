import css from "./CardOwnRecipe.module.css";
import sprite from "../../assets/icons/sprite.svg";

import React from "react";

interface OwnRecipe {
  title: string;
  preview: string;
  description: string;
  time: string;
}

interface Props {
  ownRecipe: OwnRecipe;
}

const CardOwnRecipe = ({ ownRecipe }: Props) => {


  return (
    <div className={css.cardBox}>
      <img
        src={ownRecipe.preview}
        width="124"
        height="124"
        className={css.recipeImg}
        alt="recipe photo"
      />
      <div className={css.recipeInfo}>
        <div className={css.rowFirst}>
          <h2 className={css.titleRecipe}>{ownRecipe.title}</h2>
          <svg className={css.iconDelete}>
            <use
              href={sprite + `#icon-trash-01`}
              width="14px"
              height="14px"
            ></use>
          </svg>
        </div>
        <p className={css.recipeDescription}>{ownRecipe.description}</p>
        <div className={css.row}>
          <p className={css.recipeTime}>{ownRecipe.time} min</p> <button className={`${css.recipeSeeBtn} ${css.txtBtn}`}>See recipes</button>
        </div>
      </div>
    </div>
  );
};

export default CardOwnRecipe;
