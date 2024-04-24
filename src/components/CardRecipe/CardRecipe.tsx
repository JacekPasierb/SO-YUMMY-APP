import css from "./CardRecipe.module.css";

import React, { FC } from "react";

interface CardRecipeProps {
  preview: string;
  title: string;
}

const CardRecipe: FC<CardRecipeProps> = ({ title, preview }) => {
  return (
    <div className={css.cardRecipe}>
      <img src={preview} className={css.recipeIMG} />
      <div className={css.titleBox}>
        <h3 className={css.title}>{title}</h3>
      </div>
    </div>
  );
};

export default CardRecipe;
