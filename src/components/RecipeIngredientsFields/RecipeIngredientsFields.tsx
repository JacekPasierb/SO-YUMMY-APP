import React, { FC, useEffect, useState } from "react";
import css from "./RecipeIngredientsFields.module.css";
import sprite from "../../assets/icons/sprite.svg";
import { fetchAllIngredients } from "../../API/ingredientsAPI";
import { nanoid } from "@reduxjs/toolkit";
import Select from "react-select";
import { selectIngredient } from "./selectStyles";
import UnitInput from "../UnitInput/UnitInput";

interface Ingredient {
  id: string;
  selectedValue?: string;
}

interface RecipeIngredientsProps {
  ingredients: Ingredient[];
  setIngredients: React.Dispatch<React.SetStateAction<Ingredient[]>>;
}

const RecipeIngredientsFields: FC<RecipeIngredientsProps> = ({
  ingredients,
  setIngredients,
}) => {
  const [dataIngredients, setDataIngredients] = useState([]);

  const handleDecreament = () => {
    setIngredients((prev) => [...prev.slice(0, prev.length - 1)]);
  };

  const handleIncreament = () => {
    setIngredients((prev) => [...prev, { id: nanoid() }]);
  };

  useEffect(() => {
    const getIngredients = async () => {
      try {
        const { data } = await fetchAllIngredients();

        setDataIngredients(data.ingredients);
      } catch (error) {
        console.log(error);
      }
    };

    getIngredients();
  }, []);

  const options = () => {
    const options = [];
    dataIngredients.map((ingredient) =>
      options.push({ label: ingredient.ttl, value: ingredient.ttl })
    );
    return options;
  };
  const remove = async (fieldId) => {
    const newField = await ingredients.filter(
      (ingredient) => ingredient.id !== fieldId
    );
    setIngredients(newField);
  };

  const handleIngr = (index, selectedOption) => {
    const updateFields = [...ingredients];

    updateFields[index].selectedValue = selectedOption.value;
    setIngredients(updateFields);
  };
  return (
    <>
      <div className={css.row}>
        <h2>Ingredients</h2>
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
        {dataIngredients
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
