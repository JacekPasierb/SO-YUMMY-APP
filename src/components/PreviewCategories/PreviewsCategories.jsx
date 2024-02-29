import React, { useEffect, useState } from "react";
import css from "./PreviewsCategories.module.css";
import axios from "axios";
import { useMediaQuery } from "@react-hook/media-query";
import CardRecipe from "../CardRecipe/CardRecipe";
import { fetchRecipesByFourCategories } from "../../API/recipesAPI";
import { NavLink } from "react-router-dom";

const PreviewsCategories = () => {
  const [recipesByMainCategory, setRecipesByMainCategory] = useState("");

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

    const getRecipeByFourCategory = async () => {
      try {
        const { data } = await fetchRecipesByFourCategories(count);
        setRecipesByMainCategory(data);
      } catch (error) {
        console.log(error);
      }
    };
    getRecipeByFourCategory();
  }, [isDesctop, isTablet]);

  return (
    <ul className={css.categoriesList}>
      {recipesByMainCategory &&
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
                        <CardRecipe dish={recipe} />
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
  );
};

export default PreviewsCategories;
