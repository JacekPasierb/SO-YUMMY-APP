import React, {FC, useEffect, useState} from "react";
import {NavLink} from "react-router-dom";
import {useMediaQuery} from "@react-hook/media-query";
import {toast} from "react-toastify";
import {ClimbingBoxLoader} from "react-spinners";

import CardRecipe from "../CardRecipe/CardRecipe";
import TitleCategories from "../TitleCategories/TitleCategories";
import {fetchRecipesByFourCategories} from "../../API/recipesAPI";
import {IRecipe} from "src/types/recipesTypes";

import styles from "./PreviewsCategories.module.css";
import {useTranslation} from "react-i18next";
import i18next from "i18next";

interface RecipesByMainCategory {
  [category: string]: IRecipe[];
}

interface ApiResponse {
  data: RecipesByMainCategory;
}

const RECIPES_COUNT = {
  MOBILE: 1,
  TABLET: 2,
  DESKTOP: 4,
} as const;

const PreviewsCategories: FC = () => {
  const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 1199px)");
  const isDesktop = useMediaQuery("(min-width: 1200px)");
  const {t} = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [recipesMainCategories, setRecipesMainCategories] =
    useState<RecipesByMainCategory | null>(null);

  const getRecipeCount = (): number => {
    if (isDesktop) return RECIPES_COUNT.DESKTOP;
    if (isTablet) return RECIPES_COUNT.TABLET;
    return RECIPES_COUNT.MOBILE;
  };
  const lang = i18next.language || "pl";
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetchRecipesByFourCategories(
          getRecipeCount(),
          lang
        );
        const {data} = response as ApiResponse;

        if (!data || typeof data !== "object") {
          throw new Error("Invalid data format received from server");
        }

        setRecipesMainCategories(data);
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Failed to fetch recipes";
        setError(errorMessage);
        toast.error("Something went wrong. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecipes();
  }, [isDesktop, isTablet, i18next.language]);

  const renderRecipes = (recipes: IRecipe[]) =>
    recipes.map((recipe) => (
      <li key={recipe._id} className={styles.recipesListItem}>
        <NavLink
          to={`/recipe/${recipe._id}`}
          className={styles.recipeLink}
          aria-label={`View recipe: ${recipe.title}`}
        >
          <CardRecipe title={recipe.title} preview={recipe.preview} />
        </NavLink>
      </li>
    ));

  if (isLoading) {
    return (
      <div className={styles.loaderBox} aria-busy="true">
        <ClimbingBoxLoader />
      </div>
    );
  }

  if (error) {
    return (
      <p className={styles.errorText} role="alert">
        {error}
      </p>
    );
  }

  if (!recipesMainCategories) {
    return null;
  }

  return (
    <div className={styles.previewCategories}>
      <ul className={styles.categoriesList}>
        {Object.entries(recipesMainCategories).map(([category, recipes]) => (
          <li key={category} className={styles.categoriesListItem}>
            <TitleCategories categories={category} />
            <ul className={styles.recipesList}>{renderRecipes(recipes)}</ul>
            <NavLink
              to={`/categories/${
                category.charAt(0).toUpperCase() + category.slice(1)
              }`}
              className={styles.btnCategories}
              aria-label={`See all recipes in ${category}`}
            >
              {t("seeAll")}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PreviewsCategories;
