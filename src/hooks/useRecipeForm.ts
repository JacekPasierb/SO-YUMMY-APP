import React, {useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "../redux/store";
import {useTranslation} from "react-i18next";
import {Ingredient, IngredientData, Ing} from "../types/ingredientsTypes";
import {toast} from "react-toastify";
import {fetchAllIngredients} from "../API/ingredientsAPI";
import {RecipeFormState, RecipeInputs} from "../types/authTypes";
import {validateInputs} from "../helpers/recipeValidation";
import {uploadImage} from "../helpers/imageUpload";
import {addOwnRecipes} from "../redux/ownRecipes/operations";

const initialState = {
  file: null,
  titleRecipe: "",
  descriptionRecipe: "",
  categoryRecipe: "",
  cookingTime: "",
  ingredients: [],
  instructionsRecipe: "",
};

const useRecipeForm = () => {
  const [formData, setFormData] = useState<RecipeFormState>(initialState);
  const [ingredientsAll, setIngredientsAll] = useState<IngredientData[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const updateField = <K extends keyof RecipeFormState>(
    field: K,
    value: RecipeFormState[K]
  ) => {
    setFormData((prev) => ({...prev, [field]: value}));
  };

  const dispatch: AppDispatch = useDispatch();
  const {t} = useTranslation();

  const fetchIngredients = useCallback(async () => {
    try {
      const {data} = await fetchAllIngredients();

      setIngredientsAll(data.ingredients);
    } catch (error) {
      console.error("Error fetching ingredients:", error);
      toast.error(t("loadIngredients"));
    }
  }, []);

  useEffect(() => {
    fetchIngredients();
  }, [fetchIngredients]);

  const timeOptionsList = () => {
    const time = [];
    for (let i = 5; i <= 180; i += 5) {
      time.push({label: `${i} min`, value: i});
    }
    return time;
  };

  const buildInputs = useCallback((): RecipeInputs => {
    const {
      file,
      titleRecipe,
      descriptionRecipe,
      categoryRecipe,
      cookingTime,
      ingredients,
      instructionsRecipe,
    } = formData;

    const convertedIngredients = ingredients.map((ingredient) => {
      const foundIngredient = ingredientsAll.find(
        (ing) => ing.ttl === ingredient.name || ing.ttlPl === ingredient.name
      );

      const measureAmount = ingredient.amount + " " + ingredient.unit;

      return {
        id: foundIngredient?._id || "",
        measure: measureAmount,
      };
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
  }, [formData, ingredientsAll]);

  const resetForm = useCallback(() => {
    setFormData(initialState);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const inputs = buildInputs();
    if (!validateInputs(inputs, t)) return;

    setIsLoading(true);
    try {
      const imageUrl = await uploadImage(formData.file);
      if (!imageUrl) {
        throw new Error("Failed to upload image");
      }

      const recipeData = {
        ...inputs,
        imageUrl,
        thumb: imageUrl,
        preview: imageUrl,
      };

      const result = await dispatch(addOwnRecipes(recipeData));
      if (addOwnRecipes.fulfilled.match(result)) {
        resetForm();
        toast.success(t("recipeAddedSuccess"));
      }
    } catch (error) {
      console.error("Error adding recipe:", error);
      toast.error(t("recipeAddFailed"));
    } finally {
      setIsLoading(false);
    }
  };
  return {
    formData,
    updateField,
    timeOptionsList,
    ingredientsAll,
    handleSubmit,
  };
};

export default useRecipeForm;
