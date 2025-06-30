import React, { memo } from "react";
import styles from "./RecipePreparationFields.module.css";
import SubTitle from "../SubTitle/SubTitle";
import { useTranslation } from "react-i18next";

interface RecipePreparationFieldsProps {
  instructionsRecipe: string;
  setInstructionsRecipe:  (value: string | ((prevState: string) => string)) => void;
}

const RecipePreparationFields: React.FC<RecipePreparationFieldsProps> = ({
  instructionsRecipe,
  setInstructionsRecipe,
}) => {
  const {t}=useTranslation();
  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = event.currentTarget.value;
    setInstructionsRecipe(text);
  };

  return (
    <div className={styles.recipePreparationFields__container}>
      <SubTitle title={t("recipePreparation")} />

      <div className={styles.recipePreparationFields__inputWrapper}>
        <textarea
          placeholder={t("enterRecipeInstructions")}
          rows={10}
          cols={50}
          className={styles.recipePreparationFields__textarea}
          onChange={handleTextChange}
          value={instructionsRecipe}
          aria-label="Recipe preparation instructions"
          required
        />

        <button
          type="submit"
          className={styles.recipePreparationFields__button}
          aria-label="Add recipe instructions"
        >
         {t("add")}
        </button>
      </div>
    </div>
  );
};

export default memo(RecipePreparationFields);
