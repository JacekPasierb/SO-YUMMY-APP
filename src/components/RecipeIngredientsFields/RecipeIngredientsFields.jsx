import React, { useEffect, useState } from "react";
import css from "./RecipeIngredientsFields.module.css";
import sprite from "../../assets/icons/sprite.svg";
import { fetchAllIngredients } from "../../API/ingredientsAPI";
import { nanoid } from "@reduxjs/toolkit";

const RecipeIngredientsFields = () => {
  const [counter, setCounter] = useState(0);
  const [fields, setFields] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [inputValues, setInputValues] = useState([]);

  const handleDecreament = () => {
    setCounter(counter === 0 ? 0 : counter - 1);
    
    setFields((prev) => [...prev.slice(0, prev.length - 1)]);
    
    setInputValues(prev => prev.slice(0, prev.length - 1));
  };

  const handleIncreament = () => {
    setCounter(counter + 1);
    setFields(prev=>[...prev, { id: nanoid(), inputValues:"", qty: "" }]);
  
    setInputValues(prev => [...prev, ""]);
  };
useEffect(()=>{console.log("ggg",fields);},[fields])
  useEffect(() => {
    const getIngredients = async () => {
      try {
        const { data } = await fetchAllIngredients();
        console.log(data.ingredients);
        setIngredients(data.ingredients);
      } catch (error) {
        console.log(error);
      }
    };

    getIngredients();
  }, []);
  const [inputValue, setInputValue] = useState("");


  const handleInputChange = (event, index) => {
    const newInputValues = [...inputValues];
    newInputValues[index] = event.target.value;
    setInputValues(newInputValues);
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
      <ul>
        {ingredients
          ? fields.map((field, index) => (
              <li key={index}>
                      <input
              type="text"
              value={inputValues[index] || ""}
              onChange={(event) => handleInputChange(event, index)}
              placeholder="Type to filter options..."
              list={`options-${field.id}`}
            />
                 <datalist id={`options-${field.id}`}>
              {ingredients
                .filter(
                  (ingredient) =>
                    ingredient.ttl
                      .toLowerCase()
                      .includes(inputValues[index]?.toLowerCase())
                )
                .map((ingredient) => (
                  <option key={ingredient._id} value={ingredient.ttl} />
                ))}
            </datalist>
              </li>
            ))
          : ""}
      </ul>
    </>
  );
};

export default RecipeIngredientsFields;
