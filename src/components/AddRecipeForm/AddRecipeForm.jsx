import React, { useEffect, useState } from "react";
import css from "./AddRecipeForm.module.css";
import RecipeDescriptionFields from "../RecipeDescriptionFields/RecipeDescriptionFields";
import RecipeIngredientsFields from "../RecipeIngredientsFields/RecipeIngredientsFields";
import RecipePreparationFields from "../RecipePreparationFields/RecipePreparationFields";
import axios from "axios";
import { fetchAllIngredients } from "../../API/ingredientsAPI";
import { toast } from "react-toastify";

const AddRecipeForm = () => {
  const [file, setFile] = useState("");
  const [titleRecipe, setTitleRecipe] = useState("");
  const [descriptionRecipe, setDescriptionRecipe] = useState("");
  const [categoryRecipe, setCategoryRecipe] = useState("");
  const [cookingTime, setCookingTime] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [instructionsRecipe, setInstructionsRecipe] = useState("");
  const [ingredientsAll, setIngredientsAll] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getIngredientsAll = async () => {
      const { data } = await fetchAllIngredients();

      setIngredientsAll(data.ingredients);
    };

    getIngredientsAll();
  }, []);

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

    let ingredientConvert = [];

    ingredients.map((ingredient) => {
      const ingre = ingredientsAll
        .filter((ing) => ing.ttl === ingredient.selectedValue)
        .map((ing) => ing._id);

      const measure = ingredient.selectedUnit;
      ingredientConvert.push({ id: ingre[0], measure: measure });
    });

    const inputs = {
      file,
      Title: titleRecipe,
      Description: descriptionRecipe,
      Category: categoryRecipe,
      Time: cookingTime,
      Ingredients: ingredientConvert,
      Instructions: instructionsRecipe,
    };

    for (const [key, value] of Object.entries(inputs)) {
      if (value.length === 0) {
        toast.error(`Please fill out the following field: ${key}`);

        return;
      }

      if (key === "Ingredients") {
        for (const v of value) {
          if (!v.id || !v.measure || v.measure.trim().includes("undefined")) {
            toast.error(`Please fill out the following field for ingredient`);

            return;
          }
        }
      } else if (key === "Instructions") {
        if (value.replace(/ +/, " ").trim().length < 50) {
          toast.error(`Instructions is too short..`);
          return;
        }
      }
    }

    setIsLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "alex_preset");

    try {
      const response = await axios.post("/api/ownRecipes/picture", formData);

      const imageUrl = response.data.secure_url;

      const body = {
        ...inputs,
        imageUrl,
        thumb: imageUrl,
        preview: imageUrl,
      };
      console.log("body", body);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log("Ten błąd 500");
    }
    // const body = {
    //   preview: "file", // this problem
    //   title: titleRecipe,
    //   description: descriptionRecipe,
    //   category: categoryRecipe,
    //   time: cookingTime,
    //   ingredients: ingredientConvert,
    //   instructions: instructionsRecipe,
    // };
    // const retur = await axios.post("./api/ownRecipes/add", body);
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
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
