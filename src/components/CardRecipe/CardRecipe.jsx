import React from "react";
import css from "./CardRecipe.module.css";

const CardRecipe = ({ dish }) => {
  return (
    <div className={css.cardRecipe}>
      {/* <img src={dish.preview} className={css.recipeIMG} /> */}
      {/* <div className={css.titleBox}>
        <h3 className={css.title}>{dish.title}</h3>
      </div> */}
    </div>
  );
};

export default CardRecipe;
