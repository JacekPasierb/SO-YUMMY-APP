import styles from "./RecipeIngredientsFields.module.css";
import sprite from "../../assets/icons/sprite.svg";
import { selectIngredient } from "./selectStyles";

import React, { Dispatch, SetStateAction } from "react";
import { nanoid } from "@reduxjs/toolkit";
import Select, { SingleValue } from "react-select";

import UnitInput from "../UnitInput/UnitInput";

import SubTitle from "../SubTitle/SubTitle";
import { Ing, IngredientData, Option } from "../../types/ingredientsTypes";

interface RecipeIngredientsFieldsProps {
  ingredients: Ing[];
  setIngredients: Dispatch<SetStateAction<Ing[]>>;
  ingredientsAll: IngredientData[];
}

const RecipeIngredientsFields: React.FC<RecipeIngredientsFieldsProps> = ({
  ingredients,
  setIngredients,
  ingredientsAll,
}) => {
  const handleDecrement = () => {
    if (ingredients.length > 0) {
      setIngredients((prev) => prev.slice(0, prev.length - 1));
    }
  };

  const handleIncreament = () => {
    setIngredients((prev) => [...prev, { id: nanoid(), selectedUnit: "" }]);
  };

  const options = () => {
    const options: Option[] = [];
    ingredientsAll.map((ingredient) =>
      options.push({ label: ingredient.ttl, value: ingredient.ttl })
    );
    return options;
  };

  const remove = async (fieldId: string) => {
    const newField = await ingredients.filter(
      (ingredient) => ingredient.id !== fieldId
    );
    setIngredients(newField);
  };

  const handleIngredientChange = (
    index: number,
    selectedOption: SingleValue<Option>
  ) => {
    const updateFields = [...ingredients];
    if (selectedOption) {
      updateFields[index].selectedValue = selectedOption.value;
      setIngredients(updateFields);
    }
  };

  return (
    <>
      <div className={styles.recipeIngredients}>
        <SubTitle title={"Ingredients"} />
        <div className={styles.recipeIngredients__counterBox}>
          <button
            type="button"
            className={styles.recipeIngredients__btn}
            onClick={handleDecrement}
          >
            <svg className={styles.iconMinus}>
              <use href={`${sprite}#icon-Minus`}></use>
            </svg>
          </button>
          <span className={styles.recipeIngredients__counterFont}>
            {ingredients.length}
          </span>
          <button
            type="button"
            className={styles.recipeIngredients__btn}
            onClick={handleIncreament}
          >
            <svg className={styles.icon}>
              <use href={`${sprite}#icon-Plus`}></use>
            </svg>
          </button>
        </div>
      </div>
      <ul className={styles.recipeIngredients__list}>
        {ingredients.map((ingredient, index) => (
          <li key={ingredient.id} className={styles.recipeIngredients__item}>
            <Select
              options={options()}
              onChange={(selectedOption) =>
                handleIngredientChange(index, selectedOption)
              }
              styles={selectIngredient}
              className={styles.recipeIngredients__select}
              
            />
            <UnitInput
              ingredients={ingredients}
              setIngredients={setIngredients}
              index={index}
            />

            <button
              className={styles.recipeIngredients__btnX}
              onClick={() => remove(ingredient.id)}
            >
              <svg className={styles.iconX}>
                <use href={`${sprite}#icon-X`}></use>
              </svg>
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default RecipeIngredientsFields;
