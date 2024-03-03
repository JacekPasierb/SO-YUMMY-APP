import React from "react";
import css from "./CardIngredient.module.css";
import { Checkbox } from "@mui/material";

const CardIngredient = ({ ingredient }) => {
  return (
    <div className={css.ingredientCard}>
      <div className={css.flexHelp}>
        <img
          src={ingredient.thb}
          width="65px"
          height="65px"
          className={css.imgIngredient}
        />
        <p className={css.nameIngredient}>{ingredient.ttl}</p>
      </div>
      <div className={css.flexHelp}>
        <p className={css.measureIngredient}>{ingredient.measure}</p>
        <Checkbox />
      </div>
    </div>
  );
};

export default CardIngredient;
