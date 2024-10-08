import styles from "./CardRecipe.module.css";
import React, { FC } from "react";

interface CardRecipeProps {
  preview: string;
  title: string;
}

const CardRecipe: FC<CardRecipeProps> = ({ title, preview }) => {
  const altText = title ? `${title} preview` : "Recipe image";
  return (
    <article
      className={styles.cardRecipe}
      aria-label={`Recipe card for ${title}`}
    >
      <img
        src={preview}
        alt={altText}
        className={styles.recipeIMG}
        loading="lazy"
      />
      <div className={styles.titleBox}>
        <h3 className={styles.title}>{title}</h3>
      </div>
    </article>
  );
};

export default CardRecipe;
