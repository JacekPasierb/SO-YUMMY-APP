import React, { useState } from "react";
import css from "./AddRecipeForm.module.css";
import RecipeDescriptionFields from "../RecipeDescriptionFields/RecipeDescriptionFields";
import RecipeIngredientsFields from "../RecipeIngredientsFields/RecipeIngredientsFields";

const AddRecipeForm = () => {
  const [formData, setFormData] = useState({});

  return (
    <form>
      <RecipeDescriptionFields />
      <RecipeIngredientsFields />
    </form>
  );
};

export default AddRecipeForm;
