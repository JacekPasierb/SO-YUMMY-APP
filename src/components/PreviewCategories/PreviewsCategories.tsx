import css from "./PreviewsCategories.module.css";

import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useMediaQuery } from "@react-hook/media-query";
import { useDispatch, useSelector } from "react-redux";
import { Recipe, getPopularRecipes } from "../../redux/recipes/operations";
import {
  selectIsLoading,
  selectPopularRecipes,
} from "../../redux/recipes/selectors";
import { AppDispatch } from "src/redux/store";

import CardRecipe from "../CardRecipe/CardRecipe";
import TitleCategories from "../TitleCategories/TitleCategories";

const PreviewsCategories = () => {
  const dispatch: AppDispatch = useDispatch();

  const recipesByMainCategory = useSelector(selectPopularRecipes);
  const isLoading = useSelector(selectIsLoading);
  console.log("recipesByMainCategory", recipesByMainCategory);

  const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 1200px)");
  const isDesctop = useMediaQuery("(min-width:1200px)");

  useEffect(() => {
    let count;
    if (isDesctop) {
      count = 4;
    } else if (isTablet) {
      count = 2;
    } else {
      count = 1;
    }
    dispatch(getPopularRecipes({ count }));
  }, [dispatch, isDesctop, isTablet]);

  return (
    <ul className={css.categoriesList}>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        recipesByMainCategory &&
        Object.entries(recipesByMainCategory).map(
          ([categories, recipes], idx) => {
            return (
              <li
                key={`${categories}-${idx}`}
                className={css.categoriesListItem}
              >
                <TitleCategories categories={categories} />
                <ul className={css.recipesList}>
                  {recipes &&
                    recipes.map((recipe: Recipe) => {
                      return (
                        <li
                          key={`${recipe._id}`}
                          className={css.recipesListItem}
                        >
                          <NavLink to={`/recipe/${recipe._id}`}>
                            <CardRecipe title={recipe.title} preview={recipe.preview}  />
                          </NavLink>
                        </li>
                      );
                    })}
                </ul>
                <NavLink
                  to={`/categories/${
                    categories.charAt(0).toUpperCase() + categories.slice(1)
                  }`}
                  className={css.btnCategories}
                >
                  See all
                </NavLink>
              </li>
            );
          }
        )
      )}
    </ul>
  );
};

export default PreviewsCategories;
