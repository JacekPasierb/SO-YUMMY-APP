import React, { FC, useEffect, useState } from "react";
import SubTitle from "../SubTitle/SubTitle";
import styles from "./RecipePreparation.module.css";

interface RecipePreparationProps {
  img: string;
  instructions: string;
}

const RecipePreparation: React.FC<RecipePreparationProps> = ({
  img,
  instructions,
}) => {
  const [step, setStep] = useState<string[]>([]);

  useEffect(() => {
    if (instructions) {
      const steps = instructions.split(". ");
      setStep(steps);
    }
  }, [instructions]);

  return (
    <div
      className={`${styles.recipePreparation__container} ${styles.recipePreparation}`}
    >
      <div className={styles.recipePreparation__content}>
        <SubTitle title={"Recipe Preparation"} />
        <ul className={styles.recipePreparation__instructionsList}>
          {step &&
            step.map((step, index) => (
              <li
                key={index}
                className={styles.recipePreparation__instructionsListItem}
              >
                <div className={styles.recipePreparation__numbStepBox}>
                  <p className={styles.recipePreparation__numbStepText}>{`${
                    index + 1
                  }`}</p>
                </div>
                <p
                  className={styles.recipePreparation__descStep}
                >{`${step}`}</p>
              </li>
            ))}
        </ul>
      </div>
      <img
        src={img}
        alt="Recipe Preparation"
        width="100%"
        height="100%"
        className={styles.recipePreparation__image}
      />
    </div>
  );
};

export default RecipePreparation;
