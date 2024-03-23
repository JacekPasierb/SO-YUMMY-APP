import React, { useEffect, useState } from "react";
import css from "./AddRecipeForm.module.css";
import RecipeDescriptionFields from "../RecipeDescriptionFields/RecipeDescriptionFields";
import RecipeIngredientsFields from "../RecipeIngredientsFields/RecipeIngredientsFields";

const AddRecipeForm = () => {
  const [file, setFile] = useState("");
  const [titleRecipe, setTitleRecipe] = useState("");
  const [descriptionRecipe, setDescriptionRecipe] = useState("");
  const [categoryRecipe, setCategoryRecipe] = useState("");
  const [cookingTime, setCookingTime] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [instructionsRecipe, setInstructionsRecipe] = useState();

  return (
    <form>
      <RecipeDescriptionFields />
      <RecipeIngredientsFields />
    </form>
  );
};

export default AddRecipeForm;
