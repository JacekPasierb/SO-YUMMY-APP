import css from "./AddRecipeForm.module.css";

import axios from "axios";
import { toast } from "react-toastify";
import { ClimbingBoxLoader } from "react-spinners";

import React, { FC, useEffect, useState } from "react";

import RecipeDescriptionFields from "../RecipeDescriptionFields/RecipeDescriptionFields";
import RecipeIngredientsFields from "../RecipeIngredientsFields/RecipeIngredientsFields";
import RecipePreparationFields from "../RecipePreparationFields/RecipePreparationFields";
import { fetchAllIngredients } from "../../API/ingredientsAPI";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { addOwnRecipes } from "../../redux/ownRecipes/operations";


interface Ingredient {
  id: string;
  measure: string;
}

export interface Ing {
  id: string;
  selectedValue?: string;
  selectedUnit: string;
}

export interface IngredientData {
  _id: string;
  ttl: string;
  thb: string;
  t: string;
  desc: string;
}

const AddRecipeForm: FC = () => {
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
    const getIngredientsAll = async () => {
      const { data } = await fetchAllIngredients();
      setIngredientsAll(data.ingredients);
    };

    getIngredientsAll();
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
    let ingredientConvert: Ingredient[] = [];

    ingredients.map((ingredient) => {
      const ingre = ingredientsAll
        .filter((ing) => ing.ttl === ingredient.selectedValue)
        .map((ing) => ing._id);

      const measure = ingredient.selectedUnit;
      ingredientConvert.push({ id: ingre[0], measure: measure });
    });

    const inputs = {
      file,
      title: titleRecipe,
      description: descriptionRecipe,
      category: categoryRecipe,
      time: cookingTime,
      ingredients: ingredientConvert,
      instructions: instructionsRecipe,
    };

    for (const [key, value] of Object.entries(inputs)) {
      if (value.length === 0) {
        toast.error(`Please fill out the following field: ${key}`);

        return;
      }

      if (key === "ingredients") {
        for (const v of value) {
          if (
            typeof v !== "string" &&
            (!v.id || !v.measure || v.measure.trim().includes("undefined"))
          ) {
            toast.error(`Please fill out the following field for ingredient`);

            return;
          }
        }
      } else if (key === "instructions") {
        if (
          typeof value === "string" &&
          value.replace(/ +/, " ").trim().length < 50
        ) {
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

      // const addRecipe = await axios.post("./api/ownRecipes/add", body);
      await dispatch(addOwnRecipes(body));
      resetForm();
      toast.success("Recipe added successfully");
    } catch (error: any) {
      console.error("er", error);
      toast.error(`Add recipe failed, try again..`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading ? (
        <div className={css.boxLoader}>
          <ClimbingBoxLoader color="#8BAA36" />
        </div>
      ) : (
        <form onSubmit={handleSubmit} encType="multipart/form-data">
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
