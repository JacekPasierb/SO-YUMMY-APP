import React, { useEffect, useState } from "react";
import styles from "./PopularRecipe.module.css";
import { fetchPopularRecipe } from "../../API/recipesAPI";
import { IRecipe } from "../../types/recipesTypes";
import CardPopularRecipe from "../CardPopularRecipe/CardPopularRecipe";
import { NavLink } from "react-router-dom";
import { useMediaQuery } from "@react-hook/media-query";
import { ClimbingBoxLoader } from "react-spinners";
import SubTitle from "../SubTitle/SubTitle";

const PopularRecipe: React.FC = () => {
  const [popularRecipes, setPopularRecipes] = useState<IRecipe[]>([]);
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
    <div className={styles.popularRecipe__container}>
      <SubTitle title={"Popular Recipes"} />

      {isLoading && (
        <div className={styles.popularRecipe__loader}>
          <ClimbingBoxLoader />
        </div>
      )}
      {error && <p>Error: {error}</p>}
      {popularRecipes.length === 0 ? (
        <p>No popular recipes available at this time.</p>
      ) : (
        <ul className={styles.popularRecipe__list}>
          {popularRecipes.map((recipe: IRecipe) => (
            <li key={recipe._id} className={styles.popularRecipe__item}>
              <NavLink to={`/recipe/${recipe._id}`}>
                <CardPopularRecipe recipe={recipe} />
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PopularRecipe;
