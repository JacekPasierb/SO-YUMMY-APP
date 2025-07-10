import React, {FC} from "react";
import styles from "./RecipePreparation.module.css";
import {useTranslation} from "react-i18next";
import SubTitle from "../../SubTitle/SubTitle";
import {RecipeFormState} from "../../../types/authTypes";

type Props = {
  instructionsRecipe: string;
  updateField: <K extends keyof RecipeFormState>(
    field: K,
    value: RecipeFormState[K]
  ) => void;
};

const RecipePreparation: FC<Props> = ({instructionsRecipe, updateField}) => {
  const {t} = useTranslation();
  return (
    <div className={styles.recipePreparationFields__container}>
      <SubTitle title={t("recipePreparation")} />

      <div className={styles.recipePreparationFields__inputWrapper}>
        <textarea
          placeholder={t("enterRecipeInstructions")}
          rows={10}
          cols={50}
          className={styles.recipePreparationFields__textarea}
          onChange={(e) => updateField("instructionsRecipe", e.target.value)}
          value={instructionsRecipe}
          aria-label="Recipe preparation instructions"
        />
      </div>
    </div>
  );
};

export default RecipePreparation;
