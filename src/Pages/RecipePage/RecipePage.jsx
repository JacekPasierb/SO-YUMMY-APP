import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { fetchRecipeById } from "../../API/recipesAPI";
import ReceipePageHero from "../../components/ReceipePageHero/ReceipePageHero";
import css from "./RecipePage.module.css"
import Header from "../../components/Header/Header";
import RecipeInngredientsList from "../../components/RecipeInngredientsList/RecipeInngredientsList";
const RecipePage = () => {
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getRecipeById = async () => {
      try {
        setIsLoading(true);
        const { data } = await fetchRecipeById(recipeId);
        console.log("rec", data.result);
        setRecipe(data.result);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    getRecipeById();
  }, [recipeId]);

  return (
    <>
      {isLoading && <p>Loading recipe...</p>}
      {!isLoading && (
        <main >
          
          <section className={css.receipePage} >
            <div className={css.container}>
            <Header/>
            <ReceipePageHero recipe={recipe} /></div>
          </section>
          <RecipeInngredientsList ingredients={recipe.ingredients}/>
        </main>
      )}
    </>
  );
};

export default RecipePage;
