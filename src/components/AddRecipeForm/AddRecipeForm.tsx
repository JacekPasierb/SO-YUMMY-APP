import styles from "./AddRecipeForm.module.css";

import axios from "axios";
import { toast } from "react-toastify";
import { ClimbingBoxLoader } from "react-spinners";

import React, { useEffect, useState } from "react";

import RecipeDescriptionFields from "../RecipeDescriptionFields/RecipeDescriptionFields";
import RecipeIngredientsFields from "../RecipeIngredientsFields/RecipeIngredientsFields";
import RecipePreparationFields from "../RecipePreparationFields/RecipePreparationFields";
import { fetchAllIngredients } from "../../API/ingredientsAPI";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { addOwnRecipes } from "../../redux/ownRecipes/operations";

import { Ing, Ingredient, IngredientData } from "../../types/ingredientsTypes";

interface RecipeInputs {
  file: string;
  title: string;
  description: string;
  category: string;
  time: string;
  ingredients: Ingredient[];
  instructions: string;
}

const AddRecipeForm: React.FC = () => {
  const [file, setFile] = useState("");
  const [titleRecipe, setTitleRecipe] = useState("");
  const [descriptionRecipe, setDescriptionRecipe] = useState("");
  const [categoryRecipe, setCategoryRecipe] = useState("");
  const [cookingTime, setCookingTime] = useState("");
  const [ingredients, setIngredients] = useState<Ing[]>([]);
  const [instructionsRecipe, setInstructionsRecipe] = useState("");
  const [ingredientsAll, setIngredientsAll] = useState<IngredientData[]>([]);
  const dispatch: AppDispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const { data } = await fetchAllIngredients();
        setIngredientsAll(data.ingredients);
      } catch (error) {
        console.error("Error fetching ingredients:", error);
        toast.error("Failed to load ingredients.");
      }
    };

    fetchIngredients();
  }, []);

  const resetForm = () => {
    setFile("");
    setTitleRecipe("");
    setDescriptionRecipe("");
    setCategoryRecipe("");
    setCookingTime("");
    setIngredients([]);
    setInstructionsRecipe("");
  };

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const inputs = buildInputs();
    if (!validateInputs(inputs)) return;

    setIsLoading(true);
    try {
      const imageUrl = await uploadImage();
      if (imageUrl) {
        const body = {
          ...inputs,
          imageUrl,
          thumb: imageUrl,
          preview: imageUrl,
        };
        await dispatch(addOwnRecipes(body));
        resetForm();
        toast.success("Recipe added successfully");
      }
    } catch (error) {
      console.error("Error adding recipe:", error);
      toast.error("Add recipe failed, try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const buildInputs = (): RecipeInputs => {
    const convertedIngredients: Ingredient[] = ingredients.map((ingredient) => {
      const foundIngredient = ingredientsAll.find(
        (ing) => ing.ttl === ingredient.selectedValue
      );
      const ingredientId = foundIngredient ? foundIngredient._id : "";
      return { id: ingredientId, measure: ingredient.selectedUnit };
    });

    return {
      file,
      title: titleRecipe,
      description: descriptionRecipe,
      category: categoryRecipe,
      time: cookingTime,
      ingredients: convertedIngredients,
      instructions: instructionsRecipe,
    };
  };

  const validateInputs = (inputs: RecipeInputs): boolean => {
    for (const [key, value] of Object.entries(inputs)) {
      if (!value || (Array.isArray(value) && value.length === 0)) {
        toast.error(`Please fill out the following field: ${key}`);
        return false;
      }

      if (key === "ingredients") {
        for (const ingredient of value) {
          if (
            !ingredient.id ||
            !ingredient.measure ||
            ingredient.measure.trim() === "undefined"
          ) {
            toast.error("Please fill out the following field for ingredient");
            return false;
          }
        }
      } else if (key === "instructions" && value.trim().length < 50) {
        toast.error("Instructions are too short. Please provide more details.");
        return false;
      }
    }
    return true;
  };

  const uploadImage = async (): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "alex_preset");

    try {
      const response = await axios.post("/api/ownRecipes/picture", formData);
      return response.data.secure_url;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw new Error("Image upload failed.");
    }
  };

  //pracuje nad loading dla kategori listy do formularza zeby formularz sie wczytal jak pobierze liste kategori
  return (
    <>
      {isLoading ? (
        <div className={styles.boxLoader}>
          <ClimbingBoxLoader color="#8BAA36" />
        </div>
      ) : (
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
      )}
    </>
  );
};

export default AddRecipeForm;
