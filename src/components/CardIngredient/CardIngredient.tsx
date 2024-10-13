import { Checkbox } from "@mui/material";
import React, { FC } from "react";
import { Ingredient } from "../RecipeInngredientsList/RecipeInngredientsList";
import styles from "./CardIngredient.module.css";

interface CardIngredientProps {
  ingredient: Ingredient;
}

const CardIngredient: React.FC<CardIngredientProps> = ({ ingredient }) => {
  return (
    <div className={styles.ingredientCard}>
      <div className={styles.ingredientCard__details}>
        <img
          src={ingredient.thb}
          width="65"
          height="65"
          alt={ingredient.ttl}
          className={styles.ingredientCard__image}
        />
        <p className={styles.ingredientCard__name}>{ingredient.ttl}</p>
      </div>
      <div className={styles.ingredientCard__details}>
        <div className={styles.ingredientCard__measureBox}>
          <p className={styles.ingredientCard__measureText}>
            {ingredient.measure}
          </p>
        </div>
        <Checkbox
          sx={{
            color: "#7E7E7E",

            "&.Mui-checked": {
              color: "transparent",
              stroke: "#7E7E7E",
            },
            ".MuiSvgIcon-fontSizeMedium": {
              width: "18px",
              height: "18px",
            },

            "@media (min-width: 768px)": {
              ".MuiSvgIcon-fontSizeMedium": {
                width: "35px",
                height: "35px",
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default CardIngredient;
