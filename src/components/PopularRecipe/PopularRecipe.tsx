import React, { FC, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useMediaQuery } from "@react-hook/media-query";
import { ClimbingBoxLoader } from "react-spinners";
import styles from "./PopularRecipe.module.css";
import { fetchPopularRecipe } from "../../API/recipesAPI";
import { IRecipe } from "../../types/recipesTypes";
import CardPopularRecipe from "../CardPopularRecipe/CardPopularRecipe";
import SubTitle from "../SubTitle/SubTitle";
import { useTranslation } from "react-i18next";

const RECIPES_COUNT = {
  MOBILE: 4,
  TABLET: 2,
  DESKTOP: 4,
} as const;

const PopularRecipe: FC = () => {
  const [popularRecipes, setPopularRecipes] = useState<IRecipe[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 1200px)");
  const isDesktop = useMediaQuery("(min-width:1200px)");
const {t}=useTranslation();
  useEffect(() => {
    const count = isDesktop
      ? RECIPES_COUNT.DESKTOP
      : isTablet
      ? RECIPES_COUNT.TABLET
      : RECIPES_COUNT.MOBILE;

    const getPopularRecipe = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await fetchPopularRecipe(count);
        setPopularRecipes(data.popularRecipes);
      } catch (error: any) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : "Failed to fetch popular recipes";
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    getPopularRecipe();
  }, [isDesktop, isTablet]);

  if (isLoading) {
    return (
      <div className={styles.popularRecipe__loader}>
        <ClimbingBoxLoader />
      </div>
    );
  }

  if (error) {
    return <p className={styles.popularRecipe__error}>Error: {error}</p>;
  }

  return (
    <div className={styles.popularRecipe__container}>
      <SubTitle title={t("popularRecipes")} />

      {popularRecipes.length === 0 ? (
        <p className={styles.popularRecipe__empty}>
          t("noPopularRecipes")
        </p>
      ) : (
        <ul className={styles.popularRecipe__list}>
          {popularRecipes.map((recipe) => (
            <li key={recipe._id} className={styles.popularRecipe__item}>
              <NavLink
                to={`/recipe/${recipe._id}`}
                className={styles.popularRecipe__link}
                aria-label={`View recipe: ${recipe.title}`}
              >
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
