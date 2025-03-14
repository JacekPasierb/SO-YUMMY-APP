import React, { lazy, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../components/Header/Header";
import ReceipePageHero from "../../components/ReceipePageHero/ReceipePageHero";
import { fetchRecipeById } from "../../API/recipesAPI";
import { IRecipe } from "../../types/recipesTypes";
import styles from "./RecipePage.module.css";

const RecipeInngredientsList = lazy(
  () => import("../../components/RecipeInngredientsList/RecipeInngredientsList")
);

const RecipePreparation = lazy(
  () => import("../../components/RecipePreparation/RecipePreparation")
);

const RecipePage: React.FC = () => {
  const { recipeId } = useParams<{ recipeId: string }>();
  const navigate = useNavigate();

  const [recipe, setRecipe] = useState<IRecipe | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRecipe = async (id: string) => {
    try {
      setIsLoading(true);
      const { data } = await fetchRecipeById(id);
      setRecipe(data.result);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Failed to fetch recipe"
      );
      navigate("/error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (recipeId !== undefined) {
      fetchRecipe(recipeId);
    }
  }, [recipeId]);
console.log("re",recipe?.ingredients);

  useEffect(() => {
    if (error) {
      navigate("/error");
    }
  }, [error, navigate]);

  if (!recipe) return null;

  return (
    <>
      <main>
        <section className={styles.receipePage}>
          <Header />

          <div className={styles.recipePage__container}>
            <ReceipePageHero recipe={recipe} isLoading={isLoading} />
          </div>
        </section>
        <div className={styles.recipePage__container}>
          <RecipeInngredientsList
            ingredients={recipe.ingredients}
            recipeId={recipeId}
          />
        </div>
        <div className={styles.recipePage__container}>
          <RecipePreparation
            img={recipe.preview}
            instructions={recipe.instructions}
          />
        </div>
      </main>
    </>
  );
};

export default RecipePage;
