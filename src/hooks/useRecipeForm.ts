import { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { fetchAllIngredients } from '../API/ingredientsAPI';
import { addOwnRecipes } from '../redux/ownRecipes/operations';
import { AppDispatch } from '../redux/store';
import { Ing, IngredientData, Ingredient } from '../types/ingredientsTypes';
import { validateInputs } from '../helpers/recipeValidation';
import { uploadImage } from '../helpers/imageUpload';
import { RecipeInputs } from '../types/authTypes';

export const useRecipeForm = () => {
  const [file, setFile] = useState<File | null>(null);
  const [titleRecipe, setTitleRecipe] = useState("");
  const [descriptionRecipe, setDescriptionRecipe] = useState("");
  const [categoryRecipe, setCategoryRecipe] = useState("");
  const [cookingTime, setCookingTime] = useState("");
  const [ingredients, setIngredients] = useState<Ing[]>([]);
  const [instructionsRecipe, setInstructionsRecipe] = useState("");
  const [ingredientsAll, setIngredientsAll] = useState<IngredientData[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch: AppDispatch = useDispatch();

  const fetchIngredients = useCallback(async () => {
    try {
      const { data } = await fetchAllIngredients();
      setIngredientsAll(data.ingredients);
    } catch (error) {
      console.error("Error fetching ingredients:", error);
      toast.error("Failed to load ingredients.");
    }
  }, []);

  useEffect(() => {
    fetchIngredients();
  }, [fetchIngredients]);

  const resetForm = useCallback(() => {
    setFile(null);
    setTitleRecipe("");
    setDescriptionRecipe("");
    setCategoryRecipe("");
    setCookingTime("");
    setIngredients([]);
    setInstructionsRecipe("");
  }, []);

  const buildInputs = useCallback((): RecipeInputs => {
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
  }, [file, titleRecipe, descriptionRecipe, categoryRecipe, cookingTime, ingredients, instructionsRecipe, ingredientsAll]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    const inputs = buildInputs();
    if (!validateInputs(inputs)) return;

    setIsLoading(true);
    try {
      const imageUrl = await uploadImage(file);
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
  }, [buildInputs, dispatch, file, resetForm]);

  return {
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
  };
};
