import React, { useEffect } from "react";
import styles from "./CardIngredientShoppingList.module.css";
import { Ingredient } from "../IngredientsShoppingList/IngredientsShoppingList";
import sprite from "../../assets/icons/sprite.svg";
import axios from "axios";

interface CardIngredientShoppingProps {
  ingredient: Ingredient;
}

const CardIngredientShoppingList: React.FC<CardIngredientShoppingProps> = ({
  ingredient,
}) => {
  console.log("car", ingredient);
 
  const handleRemove = async () => {
    try {
      console.log("Removing ingredient:", ingredient);

      await axios.delete("/api/shopping-list/remove", {
        data: {
          ingredientId: ingredient.ingredientId,
          recipeId: ingredient.recipeId,
        },
      });
      console.log("Składnik usunięty");
    } catch (error) {
      console.error("Błąd usuwania składnika:", error);
    }
  };
  return (
    <div className={styles.ingredientCard}>
      <div className={styles.ingredientCard__details}>
        <img
          src={ingredient.thb}
          width="60"
          height="60"
          alt={ingredient.name}
          className={styles.ingredientCard__image}
        />
        <p className={styles.ingredientCard__name}>{ingredient.name}</p>
      </div>
      <div className={styles.ingredientCard__details}>
        <div className={styles.ingredientCard__measureBox}>
          <p className={styles.ingredientCard__measureText}>
            {ingredient.measure}
          </p>
        </div>
        <button
          className={styles.recipeIngredients__btnX}
          onClick={handleRemove}
        >
          <svg className={styles.iconX}>
            <use href={`${sprite}#icon-X`}></use>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default CardIngredientShoppingList;
