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
 

  // const handleCounterChange = useCallback(
  //   (action: "increment" | "decrement") => {
  //     setIngredients((prevIngredients) => {
  //       if (action === "decrement" && prevIngredients.length > 0) {
  //         return prevIngredients.slice(0, -1);
  //       }
  //       if (action === "increment") {
  //         return [
  //           ...prevIngredients,
  //           {id: nanoid(), selectedValue: "", selectedUnit: ""},
  //         ];
  //       }
  //       return prevIngredients;
  //     });
  //   },
  //   [setIngredients]
  // );
  const [forceRender, setForceRender] = useState(0);
  const handleCounterChange = useCallback(
    (action: "increment" | "decrement") => {
      setIngredients((prevIngredients) => {
        let updated;
        if (action === "decrement") {
          updated = prevIngredients.length > 1 ? prevIngredients.slice(0, -1) : [];
        } else {
          updated = [...prevIngredients, { id: nanoid(), selectedValue: "", selectedUnit: "" }];
        }
  
        setForceRender((prev) => prev + 1); // 🔥 Wymusza re-render komponentu
        return updated;
      });
    },
    [setIngredients]
  );
  const ingredientOptions = useMemo((): Option[] => {
    return ingredientsAll.map((ingredient) => ({
      label: ingredient.ttl,
      value: ingredient.ttl,
    }));
  }, [ingredientsAll]);

  // const removeIngredient = useCallback(
  //   (fieldId: string) => {
  //     setIngredients((prev) =>
  //       prev.filter((ingredient) => ingredient.id !== fieldId)
  //     );
  //   },
  //   [setIngredients]
  // );
  const removeIngredient = useCallback((fieldId: string) => {
    setIngredients((prev) => {
      const updated = prev.filter((ingredient) => ingredient.id !== fieldId);
      setForceRender((prev) => prev + 1); // 🔥 Wymusza re-render komponentu
      return updated.length > 0 ? updated : [];
    });
  }, [setIngredients]);

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
        <SubTitle title="Ingredients" />
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

      <ul
        className={styles.recipeIngredients__list}
        aria-label="Ingredients list"
      >
        {ingredients.map((ingredient, index) => (
          <li key={ingredient.id} className={styles.recipeIngredients__item}>
            <Select
              options={ingredientOptions}
              onChange={(selectedOption) =>
                handleIngredientChange(index, selectedOption)
              }
              styles={selectIngredient}
              className={styles.recipeIngredients__select}
              placeholder="Select ingredient"
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
    </div>
  );
};

export default RecipeIngredientsFields;
