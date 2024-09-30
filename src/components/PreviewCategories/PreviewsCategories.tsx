import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useMediaQuery } from "@react-hook/media-query";
import { toast } from "react-toastify";
import { ClimbingBoxLoader } from "react-spinners";

import CardRecipe from "../CardRecipe/CardRecipe";
import TitleCategories from "../TitleCategories/TitleCategories";
import { fetchRecipesByFourCategories } from "../../API/recipesAPI";
import { IRecipe } from "src/types/recipesTypes";

import styles from "./PreviewsCategories.module.css";

interface RecipesByMainCategory {
  [category: string]: IRecipe[];
}

const PreviewsCategories: React.FC = () => {
  const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 1200px)");
  const isDesktop = useMediaQuery("(min-width:1200px)");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [recipesMainCategories, setRecipesMainCategories] =
    useState<RecipesByMainCategory>();

  // Helper function to determine count of recipes
  const getRecipeCount = (): number => {
    if (isDesktop) return 4;
    if (isTablet) return 2;
    return 1;
  };

  // Fetching data on component mount and when screen size changes
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setIsLoading(true);
        const count = getRecipeCount();
        const { data } = await fetchRecipesByFourCategories(count);
        setRecipesMainCategories(data);
      } catch (error: any) {
        setError(error.message || "An error occurred.");
        toast.error("Something went wrong. Please try again...");
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecipes();
  }, [isDesktop, isTablet]);

  // Helper to render recipes list
  const renderRecipes = (recipes: IRecipe[]) =>
    recipes.map((recipe) => (
      <li key={recipe._id} className={styles.recipesListItem}>
        <NavLink to={`/recipe/${recipe._id}`}>
          <CardRecipe title={recipe.title} preview={recipe.preview} />
        </NavLink>
      </li>
    ));

  return (
    <>
      {error && (
        <p className={styles.errorText}>Something went wrong. Try again...</p>
      )}
      {isLoading ? (
        <div className={styles.loaderBox}>
          <ClimbingBoxLoader />
        </div>
      ) : (
        <ul className={styles.categoriesList}>
          {recipesMainCategories &&
            Object.entries(recipesMainCategories).map(
              ([category, recipes], idx) => (
                <li
                  key={`${category}-${idx}`}
                  className={styles.categoriesListItem}
                >
                  <TitleCategories categories={category} />
                  <ul className={styles.recipesList}>
                    {renderRecipes(recipes)}
                  </ul>
                  <NavLink
                    to={`/categories/${
                      category.charAt(0).toUpperCase() + category.slice(1)
                    }`}
                    className={styles.btnCategories}
                  >
                    See all
                  </NavLink>
                </li>
              )
            )}
        </ul>
      )}
    </>
  );
};

export default PreviewsCategories;
