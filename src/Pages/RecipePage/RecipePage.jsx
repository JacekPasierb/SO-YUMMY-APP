import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { fetchRecipeById } from "../../API/recipesAPI";
import ReceipePageHero from "../../components/ReceipePageHero/ReceipePageHero";
import css from "./RecipePage.module.css";
import Header from "../../components/Header/Header";
import RecipeInngredientsList from "../../components/RecipeInngredientsList/RecipeInngredientsList";
import RecipePreparation from "../../components/RecipePreparation/RecipePreparation";
import { useDispatch, useSelector } from "react-redux";
import { selectIsLoading, selectRecipeById } from "../../redux/recipes/selectors";
import { getRecipeById } from "../../redux/recipes/operations";
const RecipePage = () => {
  const { recipeId } = useParams();
 

const dispatch = useDispatch();
const recipe = useSelector(selectRecipeById)
const isLoading = useSelector(selectIsLoading)

  useEffect(() => {
   
dispatch(getRecipeById(recipeId))
   
  }, [dispatch, recipeId]);

  const { ingredients, thumb, instructions, preview } = recipe;
  return (
    <>
      {isLoading ? <p>Loading recipe...</p> :
      recipe && (
        <main>
          <section className={css.receipePage}>
          <Header />
            <div className={css.container}>
              
              <ReceipePageHero recipe={recipe} />
            </div>
          </section>
          <RecipeInngredientsList ingredients={ingredients} />
          <RecipePreparation img={preview} instructions={instructions} />
        </main>
      )}
    </>
  );
};

export default RecipePage;
