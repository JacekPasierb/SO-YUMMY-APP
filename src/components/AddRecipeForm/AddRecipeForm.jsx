import React, { useEffect, useState } from "react";
import css from "./AddRecipeForm.module.css";
import RecipeDescriptionFields from "../RecipeDescriptionFields/RecipeDescriptionFields";
import RecipeIngredientsFields from "../RecipeIngredientsFields/RecipeIngredientsFields";
import RecipePreparationFields from "../RecipePreparationFields/RecipePreparationFields";
import axios from "axios";

const AddRecipeForm = () => {
  const [file, setFile] = useState("");
  const [titleRecipe, setTitleRecipe] = useState("");
  const [descriptionRecipe, setDescriptionRecipe] = useState("");
  const [categoryRecipe, setCategoryRecipe] = useState("");
  const [cookingTime, setCookingTime] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [instructionsRecipe, setInstructionsRecipe] = useState("");

  const dataForm = {
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("ok");
    const data = {
      preview: file,
      title: titleRecipe,
      description: descriptionRecipe,
      category: categoryRecipe,
      time: cookingTime,
      ingredients: ingredients,
      instructions: instructionsRecipe,
    };
    try {
      console.log("try");
      const red = await axios.post("/api/ownRecipes/add", data);
      console.log("dodano",red);
    } catch (error) {
      console.log("blaednik",error);
    }
    
   
  };
  return (
    <form onSubmit={handleSubmit}>
      <RecipeDescriptionFields data={dataForm} />
      <RecipeIngredientsFields
        ingredients={ingredients}
        setIngredients={setIngredients}
      />
      <RecipePreparationFields
        instructionsRecipe={instructionsRecipe}
        setInstructionsRecipe={setInstructionsRecipe}
      />
    </form>
  );
};

export default AddRecipeForm;
