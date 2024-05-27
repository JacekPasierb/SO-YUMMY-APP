import css from "./CardPopularRecipe.module.css";
import React, { FC } from "react";
import { IRecipe } from "../../types/recipesTypes";
interface CardPopularRecipeProps {
  recipe: IRecipe;
}
const CardPopularRecipe: FC<CardPopularRecipeProps> = ({ recipe }) => {
  const { preview, title, description } = recipe;
  return (
    <div className={css.cardBox}>
      <img
        src={preview}
        width="104"
        height="85"
        className={css.recipeImg}
        alt="recipe photo"
      />
      <div className={css.recipeInfo}>
        <h2 className={css.titleRecipe}>{title}</h2>

        <p className={css.recipeDescription}>{description}</p>
      </div>
    </div>
  );
};

export default CardPopularRecipe;
