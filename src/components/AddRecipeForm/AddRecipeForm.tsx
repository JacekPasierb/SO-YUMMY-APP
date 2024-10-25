import React, { useMemo } from "react";
import { ClimbingBoxLoader } from "react-spinners";
import styles from "./AddRecipeForm.module.css";
import { useRecipeForm } from "../../hooks/useRecipeForm";
import RecipeDescriptionFields from "../RecipeDescriptionFields/RecipeDescriptionFields";
import RecipeIngredientsFields from "../RecipeIngredientsFields/RecipeIngredientsFields";
import RecipePreparationFields from "../RecipePreparationFields/RecipePreparationFields";

const AddRecipeForm: React.FC = () => {
  const {
    file,
    setFile,
    titleRecipe,
    setTitleRecipe,
    descriptionRecipe,
    setDescriptionRecipe,
    categoryRecipe,
    setCategoryRecipe,
    cookingTime,
    setCookingTime,
    ingredients,
    setIngredients,
    instructionsRecipe,
    setInstructionsRecipe,
    ingredientsAll,
    isLoading,
    handleSubmit,
  } = useRecipeForm();

  const dataForm = useMemo(() => ({
    file,
    setFile,
    titleRecipe,
    setTitleRecipe,
    descriptionRecipe,
    setDescriptionRecipe,
    categoryRecipe,
    setCategoryRecipe,
    cookingTime,
    setCookingTime,
    ingredients,
    setIngredients,
    instructionsRecipe,
    setInstructionsRecipe,
  }), [
    file, setFile, titleRecipe, setTitleRecipe, descriptionRecipe, setDescriptionRecipe,
    categoryRecipe, setCategoryRecipe, cookingTime, setCookingTime,
    ingredients, setIngredients, instructionsRecipe, setInstructionsRecipe
  ]);

  if (isLoading) {
    return (
      <div className={styles.boxLoader}>
        <ClimbingBoxLoader color="#8BAA36" />
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      encType="multipart/form-data"
      className={styles.form}
    >
      <RecipeDescriptionFields data={dataForm} />
      <RecipeIngredientsFields
        ingredients={ingredients}
        setIngredients={setIngredients}
        ingredientsAll={ingredientsAll}
      />
      <RecipePreparationFields
        instructionsRecipe={instructionsRecipe}
        setInstructionsRecipe={setInstructionsRecipe}
      />
    </form>
  );
};

export default AddRecipeForm;
