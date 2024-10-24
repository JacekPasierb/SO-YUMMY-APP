import React from 'react'
import  styles from "./CardIngredientShoppingList.module.css";
import { Ingredient } from '../IngredientsShoppingList/IngredientsShoppingList';

interface CardIngredientShoppingProps {
    ingredient: Ingredient;
   
  }

const CardIngredientShoppingList : React.FC<CardIngredientShoppingProps>= ({ingredient}) => {
    console.log("car",ingredient);
    
  return (
    <div className={styles.ingredientCard}>
      <div className={styles.ingredientCard__details}>
        <img
          src={ingredient.thb}
          width="65"
          height="65"
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
        
      </div>
    </div>
  )
}

export default CardIngredientShoppingList