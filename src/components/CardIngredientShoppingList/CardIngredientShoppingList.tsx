import React from "react";
import axios from "axios";
import styles from "./CardIngredientShoppingList.module.css";
import { Ingredient } from "../IngredientsShoppingList/IngredientsShoppingList";
import sprite from "../../assets/icons/sprite.svg";

interface CardIngredientShoppingProps {
  ingredient: Ingredient;
  refreshList: () => void;
}

const CardIngredientShoppingList: React.FC<CardIngredientShoppingProps> = ({
  ingredient,
  refreshList,
}) => {
  const handleRemove = async () => {
    try {
      await axios.delete("/api/shopping-list/remove", {
        data: {
          ingredientId: ingredient.ingredientId,
          recipeId: ingredient.recipeId,
        },
      });
      refreshList();
    } catch (error) {
      console.error("Error removing ingredient:", error);
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
          aria-label="Remove ingredient"
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
