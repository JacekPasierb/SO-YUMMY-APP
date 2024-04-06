import React, { useEffect, useState } from "react";
import css from "./AddRecipeForm.module.css";
import RecipeDescriptionFields from "../RecipeDescriptionFields/RecipeDescriptionFields";
import RecipeIngredientsFields from "../RecipeIngredientsFields/RecipeIngredientsFields";
import RecipePreparationFields from "../RecipePreparationFields/RecipePreparationFields";
import axios from "axios";
import { fetchAllIngredients } from "../../API/ingredientsAPI";
import { useSelector } from "react-redux";
import {
  selectOwnRecipes,
  selectPopularRecipes,
  selectRecipeById,
} from "../../redux/recipes/selectors";

const AddRecipeForm = () => {
  const [file, setFile] = useState("");
  const [titleRecipe, setTitleRecipe] = useState("");
  const [descriptionRecipe, setDescriptionRecipe] = useState("");
  const [categoryRecipe, setCategoryRecipe] = useState("");
  const [cookingTime, setCookingTime] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [instructionsRecipe, setInstructionsRecipe] = useState("");
  const [ingredientsAll, setIngredientsAll] = useState([]);

  const[isLoading,setIsLoading]= useState(false);

  useEffect(() => {
    const getIngredientsAll = async () => {
      const { data } = await fetchAllIngredients();
      console.log("data", data.ingredients);
      setIngredientsAll(data.ingredients);
    };
    getIngredientsAll();
    console.log("poka", ingredientsAll);
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
  useEffect(() => {
    console.log("ing", ingredients);
  }, [ingredients]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let ingredientConvert = [];

    ingredients.map((ingredient) => {
      console.log("Składniki z przepisu", ingredient);
      const ingre = ingredientsAll
        .filter((ing) => ing.ttl === ingredient.selectedValue)
        .map((ing) => ing._id);
      console.log("frf", ingre);

      const measure = ingredient.selectedUnit;
      ingredientConvert.push({ id: ingre[0], measure: measure });
    });
    console.log("nowa ing", ingredientConvert);
setIsLoading(true)
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "alex_preset");
    try {
      console.log("frfrfr");
     alert("co")
      const response = await axios.post("/api/ownRecipes/picture", formData);
      alert("nnic")
      // const imageUrl = response.data.secure_url;
      // console.log("IMG",imageUrl);
    } catch (error) {
      setIsLoading(false)
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
