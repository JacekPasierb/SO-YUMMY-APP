import { toast } from "react-toastify";
import { RecipeInputs } from "../types/authTypes";

export const validateInputs = (inputs: RecipeInputs): boolean => {
  const { ingredients, instructions, ...otherInputs } = inputs;

  // Sprawdź ogólne pola
  for (const [key, value] of Object.entries(otherInputs)) {
    if (!value) {
      toast.error(`Please fill out the following field: ${key}`);
      return false;
    }
  }

  // Sprawdź składniki
  if (!ingredients || ingredients.length === 0) {
    toast.error("Please add at least one ingredient");
    return false;
  }

  for (const ingredient of ingredients) {
    if (!ingredient.id || !ingredient.measure || ingredient.measure.trim() === "undefined") {
      toast.error("Please fill out all fields for each ingredient");
      return false;
    }
  }

  // Sprawdź instrukcje
  if (!instructions || instructions.trim().length < 50) {
    toast.error("Instructions are too short. Please provide more details (at least 50 characters).");
    return false;
  }

  return true;
};
