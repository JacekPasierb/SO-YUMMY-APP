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
        className={styles.cardRecipe__image}
        loading="lazy"
        style={{ marginTop: "1000px" }} // Tymczasowy test
      />
      <div className={styles.cardRecipe__titleContainer}>
        <h3 className={styles.cardRecipe__title}>
          {title || "Untitled Recipe"}
        </h3>
      </div>
    </article>
  );
};

export default CardRecipe;
