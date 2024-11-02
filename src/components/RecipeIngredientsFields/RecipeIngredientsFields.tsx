import React, { FC, Dispatch, SetStateAction } from "react";
import { nanoid } from "@reduxjs/toolkit";
import Select, { SingleValue } from "react-select";
import SubTitle from "../SubTitle/SubTitle";
import UnitInput from "../UnitInput/UnitInput";
import { Ing, IngredientData, Option } from "../../types/ingredientsTypes";
import { selectIngredient } from "./selectStyles";
import sprite from "../../assets/icons/sprite.svg";
import styles from "./RecipeIngredientsFields.module.css";

interface RecipeIngredientsFieldsProps {
  ingredients: Ing[];
  setIngredients: Dispatch<SetStateAction<Ing[]>>;
  ingredientsAll: IngredientData[];
}

const RecipeIngredientsFields: FC<RecipeIngredientsFieldsProps> = ({
  ingredients,
  setIngredients,
  ingredientsAll,
}) => {
  const handleCounterChange = (action: 'increment' | 'decrement') => {
    if (action === 'decrement' && ingredients.length > 0) {
      setIngredients(prev => prev.slice(0, prev.length - 1));
    } else if (action === 'increment') {
      setIngredients(prev => [...prev, { id: nanoid(), selectedUnit: "" }]);
    }
  };

  const getIngredientOptions = (): Option[] => {
    return ingredientsAll.map(ingredient => ({
      label: ingredient.ttl,
      value: ingredient.ttl
    }));
  };

  const removeIngredient = (fieldId: string) => {
    setIngredients(prev => prev.filter(ingredient => ingredient.id !== fieldId));
  };

  const handleIngredientChange = (
    index: number,
    selectedOption: SingleValue<Option>
  ) => {
    if (!selectedOption) return;

    setIngredients(prev => {
      const updated = [...prev];
      updated[index] = {
        ...updated[index],
        selectedValue: selectedOption.value
      };
      return updated;
    });
  };

  return (
    <div className={styles.recipeIngredientsContainer}>
      <div className={styles.recipeIngredients}>
        <SubTitle title="Ingredients" />
        <div className={styles.recipeIngredients__counterBox}>
          <button
            type="button"
            className={styles.recipeIngredients__btn}
            onClick={() => handleCounterChange('decrement')}
            aria-label="Remove ingredient"
            disabled={ingredients.length === 0}
          >
            <svg className={styles.iconMinus} aria-hidden="true">
              <use href={`${sprite}#icon-Minus`} />
            </svg>
          </button>

          <span className={styles.recipeIngredients__counterFont}>
            {ingredients.length}
          </span>

          <button
            type="button"
            className={styles.recipeIngredients__btn}
            onClick={() => handleCounterChange('increment')}
            aria-label="Add ingredient"
          >
            <svg className={styles.icon} aria-hidden="true">
              <use href={`${sprite}#icon-Plus`} />
            </svg>
          </button>
        </div>
      </div>

      <ul className={styles.recipeIngredients__list}>
        {ingredients.map((ingredient, index) => (
          <li 
            key={ingredient.id} 
            className={styles.recipeIngredients__item}
          >
            <Select
              options={getIngredientOptions()}
              onChange={(selectedOption) => 
                handleIngredientChange(index, selectedOption)
              }
              styles={selectIngredient}
              className={styles.recipeIngredients__select}
              placeholder="Select ingredient"
              aria-label="Select ingredient"
              isSearchable
              required
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
              aria-label="Remove this ingredient"
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
