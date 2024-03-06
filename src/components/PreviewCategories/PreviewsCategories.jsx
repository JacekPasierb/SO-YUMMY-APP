import React, { useEffect, useState } from "react";
import css from "./PreviewsCategories.module.css";
import axios from "axios";
import { useMediaQuery } from "@react-hook/media-query";
import CardRecipe from "../CardRecipe/CardRecipe";
import { fetchRecipesByFourCategories } from "../../API/recipesAPI";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPopularRecipes } from "../../redux/recipes/operations";
import {
  selectIsLoading,
  selectPopularRecipes,
} from "../../redux/recipes/selectors";
import { selectIsRefreshing } from "../../redux/auth/selectors";

const PreviewsCategories = () => {
  const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 1200px)");
  const isDesctop = useMediaQuery("(min-width:1200px)");
  const dispatch = useDispatch();
  const recipesByMainCategory = useSelector(selectPopularRecipes);
  const isLoading = useSelector(selectIsLoading);

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
                <h2 className={css.titleCategories}>
                  {categories.charAt(0).toUpperCase() + categories.slice(1)}
                </h2>
                <ul className={css.recipesList}>
                  {recipes.map((recipe) => {
                    return (
                      <li key={`${recipe._id}`} className={css.recipesListItem}>
                        <NavLink to={`/recipe/${recipe._id}`}>
                          {" "}
                          <CardRecipe dish={recipe} />
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
