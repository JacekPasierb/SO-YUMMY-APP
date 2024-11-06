import React, { useCallback, useEffect, useState } from "react";
import { fetchIngredientsById } from "../../API/ingredientsAPI";
import CardIngredient from "../CardIngredient/CardIngredient";
import RecipeIngredientsListSkeleton from "./RecipeIngredientsListSkeleton";
import styles from "./RecipeInngredientsList.module.css";

interface RecipeIngredientsListProps {
  ingredients: Array<{
    id: string;
    measure: string;
  }>;
  recipeId?: string;
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
  recipeId,
}) => {
  const [ingredientsList, setIngredientsList] = useState<Ingredient[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchIngredientsData = useCallback(async () => {
    if (!ingredients?.length) return;

    try {
      setIsLoading(true);
      setError(null);

      const fetchedData = await Promise.all(
        ingredients.map(async (ing) => {
          const { data } = await fetchIngredientsById(ing.id);
          if (!data?.ingredient) {
            throw new Error(`Failed to fetch ingredient with ID: ${ing.id}`);
          }
          return {
            ...data.ingredient,
            measure: ing.measure,
          };
        })
      );

      setIngredientsList(fetchedData);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to fetch ingredients"
      );
    } finally {
      setIsLoading(false);
    }
  }, [ingredients]);

  useEffect(() => {
    fetchIngredientsData();
  }, [fetchIngredientsData]);

  if (error) {
    return (
      <div className={styles.error} role="alert">
        {error}
      </div>
    );
  }

  if (isLoading) {
    return <RecipeIngredientsListSkeleton />;
  }

  return (
    <div
      className={styles.recipeIngredientsList__box}
    >
      <div className={styles.recipeIngredientsList__header}>
        <h2 className={styles.recipeIngredientsList__title}>Ingredients</h2>
        <div
          className={styles.recipeIngredientsList__flexWrapper}
          aria-hidden="true"
        >
          <span className={styles.recipeIngredientsList__title}>Number</span>
          <span className={styles.recipeIngredientsList__title}>
            Add to list
          </span>
        </div>
      </div>
      <ul
        className={styles.recipeIngredientsList}
        aria-label="Recipe ingredients"
      >
        {ingredientsList.map((ingredient) => (
          <li key={ingredient._id} className={styles.ingredientsList__item}>
            <CardIngredient ingredient={ingredient} recipeId={recipeId} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecipeInngredientsList;
