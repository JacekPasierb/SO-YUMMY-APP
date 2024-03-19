import React, { useState } from "react";
import css from "./RecipeIngredientsFields.module.css";

const RecipeIngredientsFields = () => {
  const [counter, setCounter] = useState(0);
  const handleDecreament = () => {
   counter === 0 ? setCounter(0) : 
    setCounter(counter - 1);
  };

  const handleIncreament = () => {
    setCounter(counter + 1);
  };
  return (
    <>
      <h2>Ingredients</h2>
      <button type="button" className={css.btn} onClick={handleDecreament}>
        -
      </button>
      {counter}
      <button type="button" className={css.btn} onClick={handleIncreament}>
        +
      </button>
      
    </>
  );
};

export default RecipeIngredientsFields;
