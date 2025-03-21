import React, {FC, useCallback, useEffect, useMemo, useState} from "react";
import {nanoid} from "@reduxjs/toolkit";
import Select, {SingleValue} from "react-select";
import SubTitle from "../SubTitle/SubTitle";
import UnitInput from "../UnitInput/UnitInput";
import {
  FormIngredient,
  IngredientData,
  Option,
} from "../../types/ingredientsTypes";
import {selectIngredient} from "./selectStyles";
import sprite from "../../assets/icons/sprite.svg";
import styles from "./RecipeIngredientsFields.module.css";
import { useTranslation } from "react-i18next";

interface RecipeIngredientsFieldsProps {
  ingredients: FormIngredient[];
  setIngredients: React.Dispatch<React.SetStateAction<FormIngredient[]>>;
  ingredientsAll: IngredientData[];
}

const RecipeIngredientsFields: FC<RecipeIngredientsFieldsProps> = ({
  ingredients,
  setIngredients,
  ingredientsAll,
}) => {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;
  const handleCounterChange = useCallback(
    (action: "increment" | "decrement") => {
      setIngredients((prevIngredients) => {
        if (action === "increment") {
          return [
            ...prevIngredients,
            {id: nanoid(), selectedValue: "", selectedUnit: ""},
          ];
        }
        if (action === "decrement") {
          return prevIngredients.slice(0, -1);
        }
        return prevIngredients;
      });
    },
    [setIngredients]
  );

  const ingredientOptions = useMemo((): Option[] => {
    return ingredientsAll.map((ingredient) => ({
      label: currentLanguage === "pl" ? ingredient.ttlPl : ingredient.ttl, // Wybór nazwy
      value: currentLanguage === "pl" ? ingredient.ttlPl : ingredient.ttl,
    }));
  }, [ingredientsAll, currentLanguage]);

  const removeIngredient = (fieldId: string) => {
    setIngredients((prev) => {
      const updatedIngredients = prev.filter(
        (ingredient) => ingredient.id !== fieldId
      );

      return updatedIngredients;
    });
  };

  const handleIngredientChange = useCallback(
    (index: number, selectedOption: SingleValue<Option>) => {
      if (!selectedOption) return;

      setIngredients((prev) => {
        const updated = [...prev];
        updated[index] = {
          ...updated[index],
          selectedValue: selectedOption.value,
        };
        return updated;
      });
    },
    [setIngredients]
  );

  return (
    <div className={styles.recipeIngredientsContainer}>
      <div className={styles.recipeIngredients}>
        <SubTitle title={t("ingredients")} />

        <div
          className={styles.recipeIngredients__counterBox}
          role="group"
          aria-label="Ingredient counter"
        >
          <button
            type="button"
            className={styles.recipeIngredients__btn}
            onClick={() => handleCounterChange("decrement")}
            aria-label="Remove ingredient"
            disabled={ingredients.length === 0}
          >
            <svg className={styles.iconMinus} aria-hidden="true">
              <use href={`${sprite}#icon-Minus`} />
            </svg>
          </button>

          <span
            className={styles.recipeIngredients__counterFont}
            aria-live="polite"
          >
            {ingredients.length}
          </span>

          <button
            type="button"
            className={styles.recipeIngredients__btn}
            onClick={() => handleCounterChange("increment")}
            aria-label="Add ingredient"
          >
            <svg className={styles.icon} aria-hidden="true">
              <use href={`${sprite}#icon-Plus`} />
            </svg>
          </button>
        </div>
      </div>
      {ingredients.length > 0 && (
        <ul
          className={styles.recipeIngredients__list}
          aria-label="Ingredients list"
        >
          {ingredients.map((ingredient, index) => (
            <li key={ingredient.id} className={styles.recipeIngredients__item}>
              <Select
                id={`ingredient-${ingredient.id}`} // Dodaje unikalne id
                name={`ingredient-${index}`} // Dodaje unikalną nazwę
                options={ingredientOptions}
                onChange={(selectedOption) =>
                  handleIngredientChange(index, selectedOption)
                }
                styles={selectIngredient}
                className={styles.recipeIngredients__select}
                placeholder={t("selectIngredient")}
                aria-label="Select ingredient"
                isSearchable
                required
                menuPlacement="auto"
                menuPosition="fixed"
                value={
                  ingredient.selectedValue
                    ? {
                        label: ingredient.selectedValue,
                        value: ingredient.selectedValue,
                      }
                    : null
                }
              />

              <UnitInput
                ingredients={ingredients}
                setIngredients={setIngredients}
                index={index}
              />

              <button
                type="button"
                className={styles.recipeIngredients__btnX}
                onClick={() => removeIngredient(ingredient.id)}
                aria-label={`Remove ingredient ${index + 1}`}
              >
                <svg className={styles.iconX} aria-hidden="true">
                  <use href={`${sprite}#icon-X`} />
                </svg>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RecipeIngredientsFields;
