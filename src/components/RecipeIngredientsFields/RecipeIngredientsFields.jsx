import React, { useEffect, useState } from "react";
import css from "./RecipeIngredientsFields.module.css";
import sprite from "../../assets/icons/sprite.svg";
import { fetchAllIngredients } from "../../API/ingredientsAPI";
import { nanoid } from "@reduxjs/toolkit";
import x from "../../images/X.png";
import Select from "react-select";
import { red } from "@mui/material/colors";
import { selectIngredient } from "./selectStyles";
import UnitInput from "../UnitInput/UnitInput";

const RecipeIngredientsFields = () => {
  const [counter, setCounter] = useState(0);
  const [fields, setFields] = useState([]);
  const [ingredients, setIngredients] = useState([]);

  const handleDecreament = () => {
    setCounter(counter === 0 ? 0 : counter - 1);
    setFields((prev) => [...prev.slice(0, prev.length - 1)]);
  };

  const handleIncreament = () => {
    setCounter(counter + 1);
    setFields((prev) => [...prev, { id: nanoid(), inputValues: "", qty: "" }]);
  };

  useEffect(() => {
    const getIngredients = async () => {
      try {
        const { data } = await fetchAllIngredients();
        console.log("data", data.ingredients);
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
          <span className={css.counterFont}>{counter}</span>
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
                <img src={x} />
              </li>
            ))
          : ""}
      </ul>
    </>
  );
};

export default RecipeIngredientsFields;
