import css from "./RecipeIngredientsFields.module.css";
import sprite from "../../assets/icons/sprite.svg";
import { selectIngredient } from "./selectStyles";

import React, { Dispatch, FC, SetStateAction } from "react";
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



const RecipeIngredientsFields: FC<RecipeIngredientsFieldsProps> = ({
  ingredients,
  setIngredients,
  ingredientsAll,
}) => {
  const handleDecreament = () => {
    setIngredients((prev) => [...prev.slice(0, prev.length - 1)]);
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

  const handleIngr = (index: number, selectedOption: SingleValue<Option>) => {
    const updateFields = [...ingredients];
    if (selectedOption) {
      updateFields[index].selectedValue = selectedOption.value;
      setIngredients(updateFields);
    }
  };
  return (
    <>
      <div className={css.row}>
        <SubTitle title={"Ingredients"}/>
        <div className={css.counterBox}>
          <button type="button" className={css.btn} onClick={handleDecreament}>
            <svg className={css.iconMinus}>
              <use href={sprite + `#icon-Minus`}></use>
            </svg>
          </button>
          <span className={css.counterFont}>{ingredients.length}</span>
          <button type="button" className={css.btn} onClick={handleIncreament}>
            <svg className={css.icon}>
              <use href={sprite + `#icon-Plus`}></use>
            </svg>
          </button>
        </div>
      </div>
      <ul className={css.ingredientsList}>
        {ingredientsAll
          ? ingredients.map((ingredient, index) => (
              <li key={ingredient.id} className={css.rowItem}>
                <Select
                  options={options()}
                  onChange={(selectedOption) =>
                    handleIngr(index, selectedOption)
                  }
                  styles={selectIngredient}
                />
                <UnitInput
                  ingredients={ingredients}
                  setIngredients={setIngredients}
                  index={index}
                />

                <button
                  className={css.btnX}
                  onClick={() => remove(ingredient.id)}
                >
                  <svg className={css.iconX}>
                    <use href={sprite + `#icon-X`}></use>
                  </svg>
                </button>
              </li>
            ))
          : ""}
      </ul>
    </>
  );
};

export default RecipeIngredientsFields;
