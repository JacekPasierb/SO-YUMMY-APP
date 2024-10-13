import React, { useEffect, useState } from "react";
import styles from "./RecipeInngredientsList.module.css";
import { fetchIngredientsById } from "../../API/ingredientsAPI";
import CardIngredient from "../CardIngredient/CardIngredient";

interface RecipeIngredientsListProps {
  ingredients: { id: string; measure: string }[];
  isLoading: boolean;
}

export interface Ingredient {
  _id: string;
  ttl: string;
  desc: string;
  thb: string;
  measure: string;
}

const RecipeInngredientsList: React.FC<RecipeIngredientsListProps> = ({
  ingredients,
  isLoading,
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
      {isLoading && (
        <div className={styles.skeleton}>
          <div className={styles.skeleton__header}></div>
          <ul className={styles.skeleton__list}>
            <li className={styles.skeleton__item}></li>
            <li className={styles.skeleton__item}></li>
            <li className={styles.skeleton__item}></li>
          </ul>
        </div>
      )}

      {ingredientsList && (
        <div
          className={`${styles.container} ${styles.recipeIngredientsList__box}`}
        >
          <div className={styles.recipeIngredientsList__header}>
            <p className={styles.recipeIngredientsList__title}>Ingredients</p>
            <div className={styles.recipeIngredientsList__flexWrapper}>
              <p className={styles.recipeIngredientsList__title}>Number</p>
              <p className={styles.recipeIngredientsList__title}>Add to list</p>
            </div>
          </div>
          <ul className={styles.recipeIngredientsList__list}>
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
