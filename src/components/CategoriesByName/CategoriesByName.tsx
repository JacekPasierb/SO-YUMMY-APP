import React, {useEffect, useState} from "react";
import {NavLink, useLocation, useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {
  selectIsLoading,
  selectRecipesByCategory,
  selectTotalRecipes,
} from "../../redux/recipes/selectors";
import {getRecipesByCategory} from "../../redux/recipes/operations";
import {AppDispatch} from "src/redux/store";
import BasicPagination from "../Pagination/BasicPagination";
import CardRecipe from "../CardRecipe/CardRecipe";
import {IRecipe} from "../../types/recipesTypes";
import {ClimbingBoxLoader} from "react-spinners";
import styles from "./CategoriesByName.module.css";
import {getPageFromQueryString} from "../../helpers/helpers";
import {useTranslation} from "react-i18next";
import {resetRecipes} from "../../redux/recipes/recipesSlice";
import NoResult from "../NoResult/NoResult";

const ITEMS_PER_PAGE = 8;

const CategoriesByName: React.FC = () => {
  const {categoryName} = useParams();
  const {search} = useLocation();
  const currentPage = getPageFromQueryString(search);
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const {t, i18n} = useTranslation();
  const currentLanguage = i18n.language;

  const recipes = useSelector(selectRecipesByCategory);
  const totalRecipes = useSelector(selectTotalRecipes);
  const isLoading = useSelector(selectIsLoading);

  const handlePageChange = (page: number) => {
    navigate(`?page=${page}`);
    window.scrollTo({top: 0, behavior: "smooth"});
  };

  // useEffect(() => {
  //   if (!categoryName) return;
  //   dispatch(resetRecipes());

  //   // 🔹 Opóźnienie pobrania przepisów, aby uniknąć podwójnego renderowania
  //   setTimeout(() => {
  //     dispatch(
  //       getRecipesByCategory({category: categoryName, page: currentPage})
  //     );
  //   }, 200); // Opóźnienie 200ms dla płynnego odświeżania
  // }, [dispatch, categoryName, currentPage, currentLanguage]);

  useEffect(() => {
    if (!categoryName) return;
    dispatch(resetRecipes());

    dispatch(getRecipesByCategory({category: categoryName, page: currentPage}));
  }, [dispatch, categoryName, currentPage, currentLanguage]);

  if (isLoading) {
    return (
      <div className={styles.loaderContainer}>
        <ClimbingBoxLoader color="#8BAA36" />
      </div>
    );
  }

  if (!recipes || recipes.length === 0) {
    return <NoResult text="NoRecipe" />;
  }

  return (
    <>
      {recipes && (
        <>
          <ul className={styles.recipesList}>
            {recipes.map((recipe: IRecipe) => (
              <li key={recipe._id} className={styles.recipesListItem}>
                <NavLink to={`/recipe/${recipe._id}`}>
                  <CardRecipe title={recipe.title} preview={recipe.preview} />
                </NavLink>
              </li>
            ))}
          </ul>

          <BasicPagination
            count={Math.ceil(totalRecipes / ITEMS_PER_PAGE)}
            page={currentPage}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </>
  );
};

export default CategoriesByName;
