import React, { FC, useEffect, useState } from "react";
import css from "./RecipeInngredientsList.module.css";
import {
  fetchAllIngredients,
  fetchIngredientsById,
} from "../../API/ingredientsAPI";
import CardIngredient from "../CardIngredient/CardIngredient";

interface RecipeIngredientsListProps {
  ingredients: { id: string; measure: string }[];
}

export interface Ingredient {
  _id: string;
  ttl: string;
  desc: string;
  thb: string;
  measure: string;
}

const RecipeInngredientsList: FC<RecipeIngredientsListProps> = ({
  ingredients,
}) => {
  const [ingredientsList, setIngredientsList] = useState<Ingredient[]>([]);

  useEffect(() => {
    const fetchIngredientsData = async () => {
      if (ingredients !== undefined) {
        const fetchedData: Ingredient[] = [];
        for (const ing of ingredients) {
          const { data } = await fetchIngredientsById(ing.id);

          if (data) {
            const ingredient = data.ingredient;
            const ingredientWithMeasure:Ingredient = {
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
    <>
      {!ingredientsList && (
        <div className={`${css.container} ${css.ingredientsBox}`}>
          <p>Loading ingredients..</p>
        </div>
      )}
      {ingredientsList && (
        <div className={`${css.container} ${css.ingredientsBox}`}>
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
      )}
    </>
  );
};

export default RecipeInngredientsList;
