import {toast} from "react-toastify";
import {RecipeInputs} from "../types/authTypes";
import {TFunction} from "i18next";

interface ValidationError {
  field: string;
  message: string;
}

const MINIMUM_INSTRUCTIONS_LENGTH = 50;

export const validateInputs = (inputs: RecipeInputs, t: TFunction): boolean => {
  const errors: ValidationError[] = [];
  const {ingredients, instructions, ...otherInputs} = inputs;
  // Validate general fields
  for (const [key, value] of Object.entries(otherInputs)) {
    if (!value) {
      if (key === "file") {
        toast.error(t("missingImage"));
        return false;
      }
      const fieldLabel = t(`fields.${key}`);
      toast.error(t("missingField", {field: fieldLabel}));

      return false;
    }
  }

  // Validate ingredients
  if (!ingredients || ingredients.length === 0) {
    toast.error(t("missingIngredients"));

    return false;
  }

  for (const ingredient of ingredients) {
    if (
      !ingredient.id ||
      !ingredient.measure ||
      ingredient.measure.trim() === "undefined"
    ) {
      toast.error(t("incompleteIngredient"));
      console.log("er", ingredient);
      return false;
    }
  }

  // Validate instructions
  if (!instructions || instructions.trim().length < 50) {
    toast.error(t("instructionsTooShort", {min: 50}));
    return false;
  }

  return true;
};
