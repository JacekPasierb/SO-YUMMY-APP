import React, { useEffect, useState } from "react";
import styles from "./RecipeInngredientsList.module.css";
import { fetchIngredientsById } from "../../API/ingredientsAPI";
import CardIngredient from "../CardIngredient/CardIngredient";
import RecipeIngredientsListSkelton from "./RecipeIngredientsListSkelton";

interface RecipeIngredientsListProps {
  ingredients: { id: string; measure: string }[];
  recipeId?:string;
}

export interface Ingredient {
  _id: string;
  ttl: string;
  desc: string;
  thb: string;
  measure: string;
}

const RecipeInngredientsList: React.FC<RecipeIngredientsListProps> = ({
  ingredients, recipeId
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
            const ingredientWithMeasure: Ingredient = {
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
      {ingredientsList.length === 0 ? (
        <RecipeIngredientsListSkelton />
      ) : (
        <div
          className={`${styles.recipeIngredientsList__container} ${styles.recipeIngredientsList__box}`}
        >
          <div className={styles.recipeIngredientsList__header}>
            <p className={styles.recipeIngredientsList__title}>Ingredients</p>
            <div className={styles.recipeIngredientsList__flexWrapper}>
              <p className={styles.recipeIngredientsList__title}>Number</p>
              <p className={styles.recipeIngredientsList__title}>Add to list</p>
            </div>
          </div>
          <ul className={styles.recipeIngredientsList}>
            {ingredientsList.map((ingredient) => (
              <li key={ingredient._id} className={styles.ingredientsList__item}>
                <CardIngredient ingredient={ingredient} recipeId={recipeId}/>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default RecipeInngredientsList;
