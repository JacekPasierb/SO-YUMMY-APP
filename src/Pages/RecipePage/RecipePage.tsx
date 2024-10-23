import styles from "./RecipePage.module.css";

import React, { lazy, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import ReceipePageHero from "../../components/ReceipePageHero/ReceipePageHero";
import Header from "../../components/Header/Header";
import { fetchRecipeById } from "../../API/recipesAPI";
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
  const navigate = useNavigate();
console.log("recip",recipeId);

  useEffect(() => {
    const getRecipeById = async (id: string) => {
      try {
        setIsLoading(true);
        const { data } = await fetchRecipeById(id);
        setRecipe(data.result);
      } catch (error: any) {
        setError(error.message);
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
      {recipe && (
        <main>
          <section className={styles.receipePage}>
            <Header />
            <div className={styles.container}>
              <ReceipePageHero recipe={recipe} isLoading={isLoading} />
            </div>
          </section>
          <RecipeInngredientsList ingredients={recipe.ingredients} recipeId={recipeId}/>
          <RecipePreparation
            img={recipe.preview}
            instructions={recipe.instructions}
          />
        </main>
      )}
      {error && navigate("/error")}
    </>
  );
};

export default RecipePage;
