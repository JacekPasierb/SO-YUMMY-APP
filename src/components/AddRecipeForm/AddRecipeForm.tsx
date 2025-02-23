import React, { memo, useEffect } from "react";
import { ClimbingBoxLoader } from "react-spinners";
import styles from "./AddRecipeForm.module.css";
import { useRecipeForm } from "../../hooks/useRecipeForm";
import RecipeDescriptionFields from "../RecipeDescriptionFields/RecipeDescriptionFields";
import RecipeIngredientsFields from "../RecipeIngredientsFields/RecipeIngredientsFields";
import RecipePreparationFields from "../RecipePreparationFields/RecipePreparationFields";
import { FormIngredient, Ing } from "../../types/ingredientsTypes";

interface FormData {
  file: File | null;
  setFile: (file: File | null) => void;
  titleRecipe: string;
  setTitleRecipe: (title: string) => void;
  descriptionRecipe: string;
  setDescriptionRecipe: (desc: string) => void;
  categoryRecipe: string;
  setCategoryRecipe: (category: string) => void;
  cookingTime: string;
  setCookingTime: (time: string) => void;
  ingredients:FormIngredient[];
  setIngredients: (value: React.SetStateAction<FormIngredient[]>) => void;
  instructionsRecipe: string;
  setInstructionsRecipe:(value: string | ((prevState: string) => string)) => void;
}

const Loader = () => (
  <div className={styles.boxLoader}>
    <ClimbingBoxLoader color="#8BAA36" />
  </div>
);

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

  if (isLoading) {
    return <Loader />;
  }

  const formData: FormData = {
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
  };

  return (
    <form
      onSubmit={handleSubmit}
      encType="multipart/form-data"
      className={styles.form}
      aria-label="Add recipe form"
    >
      <RecipeDescriptionFields data={formData} />
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

export default memo(AddRecipeForm);
