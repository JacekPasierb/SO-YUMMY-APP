import React, {FC, useEffect, useState, useMemo} from "react";
import SubTitle from "../SubTitle/SubTitle";
import styles from "./RecipePreparation.module.css";
import {useTranslation} from "react-i18next";

interface RecipePreparationProps {
  img: string;
  instructions: string;
}

const RecipePreparation: FC<RecipePreparationProps> = ({img, instructions}) => {
  const [steps, setSteps] = useState<string[]>([]);
  const {t} = useTranslation();
  useEffect(() => {
    if (instructions) {
      const formattedSteps = instructions
        .split(".")
        .map((step) => step.trim())
        .filter((step) => step.length > 0);
      setSteps(formattedSteps);
    }
  }, [instructions]);

  const instructionsList = useMemo(() => {
    return steps.map((step, index) => (
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
        <p className={styles.recipePreparation__descStep}>{step}</p>
      </li>
    ));
  }, [steps]);

  if (!instructions || !img) {
    return null;
  }

  return (
    <div className={styles.recipePreparation__wrapper}>
      <div className={styles.recipePreparation__content}>
        <SubTitle title={t("recipePreparation")} />
        <ol
          className={styles.recipePreparation__instructionsList}
          aria-label="Recipe preparation steps"
        >
          {instructionsList}
        </ol>
      </div>
      <div className={styles.recipePreparation__imageWrapper}>
        <img
          src={img}
          alt="Final dish presentation"
          className={styles.recipePreparation__image}
          loading="lazy"
          width="433"
          height="332"
        />
      </div>
    </div>
  );
};

export default RecipePreparation;
