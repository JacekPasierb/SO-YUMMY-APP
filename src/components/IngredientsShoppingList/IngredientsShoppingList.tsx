import React from 'react'
import styles from "./IngredientsShoppingList.module.css";

const IngredientsShoppingList = () => {
  return (
    <div
    className={` ${styles.shoppingList__box}`}
  >
    <div className={styles.shoppingList__header}>
      <p className={styles.shoppingList__title}>Ingredients</p>
      <div className={styles.shoppingList__flexWrapper}>
        <p className={styles.shoppingList__title}>Number</p>
        <p className={styles.shoppingList__title}>Add to list</p>
      </div>
    </div>
    <ul className={styles.recipeIngredientsList}>
      {/* {ingredientsList.map((ingredient) => (
        <li key={ingredient._id} className={styles.ingredientsList__item}>
          <CardIngredient ingredient={ingredient} recipeId={recipeId} />
        </li>
      ))} */}
    </ul>
  </div>
  )
}

export default IngredientsShoppingList