import React, {useMemo} from "react";
import styles from "./RecipeForm.module.css";
import RecipeData from "./RecipeData/RecipeData";
import IngredientsData from "./IngredientsData/IngredientsData";
import useRecipeForm from "../../hooks/useRecipeForm";
import RecipePreparation from "./RecipePreparation/RecipePreparation";
import {useTranslation} from "react-i18next";
import {categoryKeys} from "../../data/categoryKeys";

const RecipeForm = () => {
  const {formData, updateField, timeOptionsList, handleSubmit} =
    useRecipeForm();
  const {t, i18n} = useTranslation();

  const categoriesList = useMemo(() => {
    return categoryKeys.map((key) => t(`categoriess.${key}`));
  }, [t, i18n.language]);

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.formData}>
        <RecipeData
          formData={formData}
          updateField={updateField}
          categoriesList={categoriesList}
          timeOptionsList={timeOptionsList()}
        />
        <IngredientsData
          ingredients={formData.ingredients}
          updateField={updateField}
        />

        <RecipePreparation
          instructionsRecipe={formData.instructionsRecipe}
          updateField={updateField}
        />
      </div>

      <button
        type="submit"
        className={styles.recipePreparationFields__button}
        aria-label="Add recipe"
      >
        {t("add")}
      </button>
    </form>
  );
};

export default RecipeForm;
