import css from "./RecipePage.module.css";

import React, { lazy, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  selectIsLoading,
  selectRecipeById,
} from "../../redux/recipes/selectors";
import { getRecipeById } from "../../redux/recipes/operations";
import { AppDispatch } from "src/redux/store";

import ReceipePageHero from "../../components/ReceipePageHero/ReceipePageHero";
import Header from "../../components/Header/Header";
const RecipeInngredientsList = lazy(
  () => import("../../components/RecipeInngredientsList/RecipeInngredientsList")
);
const RecipePreparation = lazy(
  () => import("../../components/RecipePreparation/RecipePreparation")
);

const RecipePage = () => {
  const { recipeId } = useParams();

  const dispatch: AppDispatch = useDispatch();
  const recipe = useSelector(selectRecipeById);
  const isLoading = useSelector(selectIsLoading);

  useEffect(() => {
    if (recipeId !== undefined) {
      dispatch(getRecipeById({ id: recipeId }));
    }
  }, [dispatch, recipeId]);

  const { ingredients, instructions, preview } = recipe;
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
            <RecipeInngredientsList ingredients={ingredients} />
            <RecipePreparation img={preview} instructions={instructions} />
          </main>
        )
      )}
    </>
  );
};

export default RecipePage;
