import React, { useEffect, useState } from "react";
import css from "./PopularRecipe.module.css";
import { fetchPopularRecipe } from "../../API/recipesAPI";
import { Recipe } from "../../types/recipesTypes";
import CardPopularRecipe from "../CardPopularRecipe/CardPopularRecipe";
import { NavLink } from "react-router-dom";
import { useMediaQuery } from "@react-hook/media-query";
import { ClimbingBoxLoader } from "react-spinners";

const PopularRecipe: React.FC = () => {
  const [popularRecipes, setPopularRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 1200px)");
  const isDesctop = useMediaQuery("(min-width:1200px)");

  useEffect(() => {
    let count: number;

    if (isDesctop) {
      count = 4;
    } else if (isTablet) {
      count = 2;
    } else {
      count = 4;
    }
    const getPopularRecipe = async () => {
      try {
        setIsLoading(true);
        const data = await fetchPopularRecipe(count);

        setPopularRecipes(data.popularRecipes);
      } catch (error: any) {
        console.error(`Error: ${error.message}`);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    getPopularRecipe();
  }, [isDesctop, isTablet]);

  return (
    <>
      <h2 className={css.title}>Popular Recipes</h2>
      {isLoading && (
        <div className={css.boxLoader}>
          <ClimbingBoxLoader />
        </div>
      )}
      {error && <p>Error: {error}</p>}
      {popularRecipes.length === 0 ? (
        <p>Brak popularnych przepisów w danym momencie</p>
      ) : (
        <ul className={css.popularRecipesList}>
          {popularRecipes.map((recipe: Recipe) => (
            <li key={recipe._id}>
              <NavLink to={`/recipe/${recipe._id}`}>
                <CardPopularRecipe recipe={recipe} />
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default PopularRecipe;
