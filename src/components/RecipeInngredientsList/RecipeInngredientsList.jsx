import React, { useEffect, useState } from "react";
import css from "./RecipeInngredientsList.module.css";
import {
  fetchAllIngredients,
  fetchIngredientsById,
} from "../../API/ingredientsAPI";
import CardIngredient from "../CardIngredient/CardIngredient";

const RecipeInngredientsList = ({ ingredients }) => {
  const [ingredientsList, setIngredientsList] = useState([]);

  useEffect(() => {
    const fetchIngredientsData = async () => {
      if (ingredients !== undefined) {
        const fetchedData = [];
        for (const ing of ingredients) {
          const { data } = await fetchIngredientsById(ing.id);

          if (data) {
            const ingredient = data.ingredient;
            const ingredientWithMeasure = {
              ...ingredient,
              measure: ing.measure,
            };
            fetchedData.push(ingredientWithMeasure);
          }
        }
        setIngredientsList(fetchedData);
      }
    };

    fetchIngredientsData();
  }, [ingredients]);

  return (
    <div className={css.container}>
      <div className={css.headerListIngredients}>
        <p className={css.titleList}>Ingredients</p>
        <div className={css.flexHelp}>
          <p className={css.titleList}>Number</p>
          <p className={css.titleList}>Add to list</p>
        </div>
      </div>
      <ul className={css.ingredientsList}>
        {ingredientsList.map((ingredient) => (
          <li key={ingredient._id}>
            <CardIngredient ingredient={ingredient} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecipeInngredientsList;
