import React, { useEffect, useState } from "react";
import css from "./PreviewsCategories.module.css";
import axios from "axios";
import { useMediaQuery } from "@react-hook/media-query";
import CardRecipe from "../CardRecipe/CardRecipe";

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
      const { data } = await axios.get(`./api/recipes?count=${count}`);

      setRecipesByMainCategory(data.data);
    };
    getRecipeByFourCategory();
  }, [isDesctop, isTablet]);
  const entri = Object.entries(recipesByMainCategory);

  return (
    <ul className={css.categoriesList}>
      {recipesByMainCategory &&
        entri.map(([categories, recipes], idx) => {
          return (
            <li key={`${categories}-${idx}`} className={css.categories}>
              <h2 className={css.titleCategories}>{categories}</h2>
              <ul className={css.recipesList}>
                {recipes.map((recipe) => {
                  return (
                    <li key={`${recipe._id}`}>
                      <CardRecipe dish={recipe} />
                    </li>
                  );
                })}
              </ul>
              <button type="button" className={css.btn}>See all</button>
            </li>
          );
        })}
    </ul>
  );
};

export default PreviewsCategories;
