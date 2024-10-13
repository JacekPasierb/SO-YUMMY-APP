import css from "./RecipePage.module.css";

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

const RecipePage = () => {
  const { recipeId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [recipe, setRecipe] = useState<IRecipe | null>(null);

  useEffect(() => {
    const getRecipeById = async (id: string) => {
      try {
        setIsLoading(true);
        const { data } = await fetchRecipeById(id);

        setRecipe(data.result);
      } catch (error: any) {
        setError(error.message);
        toast.error("Something went wrong. Plese try again...");
      } finally {
        setIsLoading(false);
      }
    };

    if (recipeId !== undefined) {
      getRecipeById(recipeId);
    }
  }, [recipeId]);

  return (
    <>
      {isLoading ? (
        <p>Loading recipe...</p>
      ) : (
        recipe && (
          <main>
            <section className={css.receipePage}>
              <Header />
              <div className={css.container}>
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
