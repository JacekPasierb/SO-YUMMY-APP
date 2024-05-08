import css from "./PreviewsCategories.module.css";

import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useMediaQuery } from "@react-hook/media-query";

import { Recipe } from "../../redux/recipes/operations";

import CardRecipe from "../CardRecipe/CardRecipe";
import TitleCategories from "../TitleCategories/TitleCategories";

import { fetchRecipesByFourCategories } from "../../API/recipesAPI";
import { toast } from "react-toastify";
import { Loader } from "../Loader/Loader";

interface RecipesByMainCategory {
  [category: string]: Recipe[];
}

const PreviewsCategories = () => {
  const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 1200px)");
  const isDesctop = useMediaQuery("(min-width:1200px)");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [recipesMainCategories, setRecipesMainCategories] =
    useState<RecipesByMainCategory>();

  useEffect(() => {
    let count: number;

    if (isDesctop) {
      count = 4;
    } else if (isTablet) {
      count = 2;
    } else {
      count = 1;
    }
    const getRecipesByFourCategories = async () => {
      try {
        setIsLoading(true);
        const { data } = await fetchRecipesByFourCategories(count);
        setRecipesMainCategories(data);
      } catch (error: any) {
        setError(error.message);
        toast.error("Something went wrong. Plese try again...");
      } finally {
        setIsLoading(false);
      }
    };

    getRecipesByFourCategories();
  }, [isDesctop, isTablet]);

  return (
    <>
      {error && <p>Something went wrong. Try again...</p>}
      {isLoading && <Loader />}
      <ul className={css.categoriesList}>
        {recipesMainCategories &&
          Object.entries(recipesMainCategories).map(
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
                              <CardRecipe
                                title={recipe.title}
                                preview={recipe.preview}
                              />
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
          )}
      </ul>
    </>
  );
};

export default PreviewsCategories;
