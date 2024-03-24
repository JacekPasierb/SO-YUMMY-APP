import React, { useEffect, useState } from "react";
import css from "./RecipeIngredientsFields.module.css";
import sprite from "../../assets/icons/sprite.svg";
import { fetchAllIngredients } from "../../API/ingredientsAPI";
import { nanoid } from "@reduxjs/toolkit";
import Select from "react-select";
import { selectIngredient } from "./selectStyles";
import UnitInput from "../UnitInput/UnitInput";

const RecipeIngredientsFields = () => {
  const [fields, setFields] = useState([]);
  const [ingredients, setIngredients] = useState([]);

  const handleDecreament = () => {
    setFields((prev) => [...prev.slice(0, prev.length - 1)]);
  };

  const handleIncreament = () => {
    setFields((prev) => [...prev, { id: nanoid(), inputValues: "", qty: "" }]);
  };

  useEffect(() => {
    const getIngredients = async () => {
      try {
        const { data } = await fetchAllIngredients();

        setIngredients(data.ingredients);
      } catch (error) {
        console.log(error);
      }
    };

    getIngredients();
  }, []);

  const options = () => {
    const options = [];
    ingredients.map((ingredient) =>
      options.push({ label: ingredient.ttl, value: ingredient.ttl })
    );
    return options;
  };
  const remove = async (fieldId) => {
    const newField = await fields.filter((field) => field.id !== fieldId);
    setFields(newField);
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
          <span className={css.counterFont}>{fields.length}</span>
          <button type="button" className={css.btn} onClick={handleIncreament}>
            <svg className={css.icon}>
              <use href={sprite + `#icon-Plus`}></use>
            </svg>
          </button>
        </div>
      </div>
      <ul className={css.ingredientsList}>
        {ingredients
          ? fields.map((field) => (
              <li key={field.id} className={css.rowItem}>
                <Select options={options()} styles={selectIngredient} />
                <UnitInput />

                <button className={css.btnX} onClick={() => remove(field.id)}>
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
