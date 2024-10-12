import React from "react";
import styles from "./CardPopularRecipe.module.css";
import { IRecipe } from "../../types/recipesTypes";

interface CardPopularRecipeProps {
  recipe: IRecipe;
}
const CardPopularRecipe: React.FC<CardPopularRecipeProps> = ({ recipe }) => {
  const { preview, title, description } = recipe;

  return (
    <article className={styles.cardPopularRecipe__container}>
      <img
        src={preview}
        width="104"
        height="85"
        className={styles.cardPopularRecipe__image}
        alt="recipe photo"
      />
      <div className={styles.cardPopularRecipe__info}>
        <h2 className={styles.cardPopularRecipe__title}>{title}</h2>
        <p className={styles.cardPopularRecipe__description}>{description}</p>
      </div>
    </article>
  );
};

export default CardPopularRecipe;
