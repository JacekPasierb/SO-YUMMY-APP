import styles from "./RecipePage.module.css";

import React, { lazy, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import ReceipePageHero from "../../components/ReceipePageHero/ReceipePageHero";
import Header from "../../components/Header/Header";
import { fetchRecipeById } from "../../API/recipesAPI";
import { toast } from "react-toastify";
import { IRecipe } from "../../types/recipesTypes";

const RecipeInngredientsList = lazy(
  () => import("../../components/RecipeInngredientsList/RecipeInngredientsList")
);
const RecipePreparation = lazy(
  () => import("../../components/RecipePreparation/RecipePreparation")
);

const RecipePage: React.FC = () => {
  const { recipeId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [recipe, setRecipe] = useState<IRecipe | null>(null);

  useEffect(() => {
    if (!recipeId) {
      setError("Recipe ID is missing.");
      return;
    }

    const getRecipeById = async (id: string) => {
      setIsLoading(true);
      try {
        const { data } = await fetchRecipeById(id);
        setRecipe(data.result);
      } catch (error: any) {
        setError("Failed to fetch recipe. Please try again.");
        toast.error("Something went wrong. Please try again...");
      } finally {
        setIsLoading(false);
      }
    };

    getRecipeById(recipeId);
  }, [recipeId]);

  return (
    <>
      {isLoading ? (
        <p>Loading recipe...</p>
      ) : (
        recipe && (
          <main>
            <section className={styles.receipePage}>
              <Header />
              <div className={styles.container}>
                <ReceipePageHero recipe={recipe} />
              </div>
            </section>
            <RecipeInngredientsList ingredients={recipe.ingredients} />
            <RecipePreparation
              img={recipe.preview}
              instructions={recipe.instructions}
            />
          </main>
        )
      )}
      {error && <p>Something went wrong.. try again</p>}
    </>
  );
};

export default RecipePage;
