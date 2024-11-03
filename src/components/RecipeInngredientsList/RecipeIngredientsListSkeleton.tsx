import React from "react";
import styles from "./RecipeInngredientsList.module.css";

const RecipeIngredientsListSkeleton = () => {
  return (
    <div className={styles.skeleton}>
      <div className={styles.skeleton__header}></div>
      <ul className={styles.skeleton__list}>
        <li className={styles.skeleton__item}></li>
        <li className={styles.skeleton__item}></li>
        <li className={styles.skeleton__item}></li>
      </ul>
    </div>
  );
};

export default RecipeIngredientsListSkeleton;
