import React, { FC } from "react";
import styles from "./RecipeData.module.css";
import ImageUploader from "../ImageUploader/ImageUploader";
import { TextInput } from "../TextInput/TextInput";
import { SelectField } from "../SelectField/SelectField";
import useRecipeForm from "../../../hooks/useRecipeForm";
import { RecipeFormState } from "../../../types/authTypes";
import { useTranslation } from "react-i18next";

type Props = {
  formData: RecipeFormState;
  updateField: <K extends keyof RecipeFormState>(
    field: K,
    value: RecipeFormState[K]
  ) => void;
  categoriesList: string[];
  timeOptionsList: { label: string; value: number }[];
};

const RecipeData: FC<Props> = ({
  formData,
  updateField,
  categoriesList,
  timeOptionsList,
}) => {
  const { t, i18n } = useTranslation();

  return (
    <div className={styles.recipeData}>
      <ImageUploader file={formData.file} updateField={updateField} />
      <div className={styles.inputsWrapper}>
        <TextInput
          name="title"
          value={formData.titleRecipe}
          onChange={(value) => updateField("titleRecipe", value)}
          placeholder={t("enterRecipeTitle")}
          className={styles.input}
        />
        <TextInput
          name="about"
          value={formData.descriptionRecipe}
          onChange={(value) => updateField("descriptionRecipe", value)}
          placeholder={t("enterAboutRecipe")}
          isTextarea
          className={styles.textarea}
        />

        <SelectField
          name="category"
          label={t("category")}
          value={formData.categoryRecipe}
          onChange={(value) => updateField("categoryRecipe", value)}
          options={categoriesList}
          className={styles.select}
        />

        <SelectField
          name="cookingTime"
          label={t("cookingTime")}
          value={formData.cookingTime}
          onChange={(value) => updateField("cookingTime", value)}
          options={timeOptionsList}
          className={`${styles.select} ${styles.selectTime}`}
        />
      </div>
    </div>
  );
};

export default RecipeData;
