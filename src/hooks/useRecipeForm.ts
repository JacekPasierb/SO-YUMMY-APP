import { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { fetchAllIngredients } from '../API/ingredientsAPI';
import { addOwnRecipes } from '../redux/ownRecipes/operations';
import { AppDispatch } from '../redux/store';
import { Ing, IngredientData, Ingredient, FormIngredient } from '../types/ingredientsTypes';
import { validateInputs } from '../helpers/recipeValidation';
import { uploadImage } from '../helpers/imageUpload';
import { RecipeInputs, RecipeFormState } from '../types/authTypes';

const initialState: RecipeFormState = {
  file: null,
  titleRecipe: '',
  descriptionRecipe: '',
  categoryRecipe: '',
  cookingTime: '',
  ingredients: [],
  instructionsRecipe: '',
};

export const useRecipeForm = () => {
  const [formState, setFormState] = useState<RecipeFormState>(initialState);
  const [ingredientsAll, setIngredientsAll] = useState<IngredientData[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch: AppDispatch = useDispatch();

  const fetchIngredients = useCallback(async () => {
    try {
      const { data } = await fetchAllIngredients();
      setIngredientsAll(data.ingredients);
    } catch (error) {
      console.error('Error fetching ingredients:', error);
      toast.error('Failed to load ingredients');
    }
  }, []);

  useEffect(() => {
    fetchIngredients();
  }, [fetchIngredients]);

  const updateFormField = useCallback(<K extends keyof RecipeFormState>(
    field: K,
    value: RecipeFormState[K]
  ) => {
    setFormState(prev => ({ ...prev, [field]: value }));
  }, []);

  const resetForm = useCallback(() => {
    setFormState(initialState);
  }, []);

  const buildInputs = useCallback((): RecipeInputs => {
    const { file, titleRecipe, descriptionRecipe, categoryRecipe, cookingTime, ingredients, instructionsRecipe } = formState;

    const convertedIngredients: Ingredient[] = ingredients.map((ingredient) => {
      const foundIngredient = ingredientsAll.find(
        (ing) => ing.ttl === ingredient.selectedValue
      );
      return { 
        id: foundIngredient?._id || '',
        measure: ingredient.selectedUnit 
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
  }, [formState, ingredientsAll]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    const inputs = buildInputs();
    if (!validateInputs(inputs)) return;

    setIsLoading(true);
    try {
      const imageUrl = await uploadImage(formState.file);
      if (!imageUrl) {
        throw new Error('Failed to upload image');
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
        toast.success('Recipe added successfully');
      }
    } catch (error) {
      console.error('Error adding recipe:', error);
      toast.error('Failed to add recipe. Please try again');
    } finally {
      setIsLoading(false);
    }
  }, [buildInputs, dispatch, formState.file, resetForm]);

  return {
    ...formState,
    setFile: (file: File | null) => updateFormField('file', file),
    setTitleRecipe: (title: string) => updateFormField('titleRecipe', title),
    setDescriptionRecipe: (desc: string) => updateFormField('descriptionRecipe', desc),
    setCategoryRecipe: (category: string) => updateFormField('categoryRecipe', category),
    setCookingTime: (time: string) => updateFormField('cookingTime', time),
    setIngredients:(value: React.SetStateAction<FormIngredient[]>) => 
      updateFormField('ingredients', typeof value === 'function' ? value(formState.ingredients) : []),
    setInstructionsRecipe:(value: string | ((prevState: string) => string)) => 
      updateFormField('instructionsRecipe', typeof value === 'function' ? value(formState.instructionsRecipe) : value),
    ingredientsAll,
    isLoading,
    handleSubmit,
  };
};
