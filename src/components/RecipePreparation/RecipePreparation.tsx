import React, { FC } from "react";
import SubTitle from "../SubTitle/SubTitle";
import styles from "./RecipePreparation.module.css";

interface RecipePreparationProps {
  img: string;
  instructions: string;
}

const RecipePreparation: FC<RecipePreparationProps> = ({
  img,
  instructions,
}) => {
  if (!instructions || !img) {
    return null;
  }

  const steps = instructions.split('.');

  return (
    <div className={styles.recipePreparation__container}>
      <div className={styles.recipePreparation__content}>
        <SubTitle title="Recipe Preparation" />
        <ol 
          className={styles.recipePreparation__instructionsList}
          aria-label="Recipe preparation steps"
        >
          {steps.map((step, index) => (
            <li
              key={`step-${index}`}
              className={styles.recipePreparation__instructionsListItem}
            >
              <div 
                className={styles.recipePreparation__numbStepBox}
                aria-hidden="true"
              >
                <span className={styles.recipePreparation__numbStepText}>
                  {index + 1}
                </span>
              </div>
              <p className={styles.recipePreparation__descStep}>
                {step}
              </p>
            </li>
          ))}
        </ol>
      </div>
      <img
        src={img}
        alt="Final dish presentation"
        width="433"
        height="332"
        className={styles.recipePreparation__image}
        loading="lazy"
      />
    </div>
  );
};

export default RecipePreparation;
