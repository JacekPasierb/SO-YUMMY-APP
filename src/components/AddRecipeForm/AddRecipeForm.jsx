import React, { useState } from "react";
import css from "./AddRecipeForm.module.css";
import RecipeDescriptionFields from "../RecipeDescriptionFields/RecipeDescriptionFields";

const AddRecipeForm = () => {
    const [formData, setFormData]= useState({});

  return (
    <form>
      <RecipeDescriptionFields />
    </form>
  );
};

export default AddRecipeForm;
