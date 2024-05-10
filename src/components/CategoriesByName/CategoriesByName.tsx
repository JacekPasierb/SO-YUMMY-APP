import css from "./CategoriesByName.module.css";

import React, { FC, useEffect } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  selectIsLoading,
  selectRecipesByCategory,
  selectTotalRecipes,
} from "../../redux/recipes/selectors";
import { getRecipesByCategory } from "../../redux/recipes/operations";
import { AppDispatch } from "src/redux/store";

import { getPageFromQueryString } from "../../helpers/getPageFromQueryString";
import BasicPagination from "../Pagination/BasicPagination";
import CardRecipe from "../CardRecipe/CardRecipe";
import { Recipe } from "../../types/recipesTypes";

interface CategoryRecipesRequest {
  category: string;
  page: number;
}

const CategoriesByName: FC = () => {
  const { categoryName } = useParams();

  const currentPage = getPageFromQueryString();
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const recipes = useSelector(selectRecipesByCategory);
  const totalRecipes = useSelector(selectTotalRecipes);
  const isLoading = useSelector(selectIsLoading);

  const handlePageChange = (page: number) => {
    navigate(`?page=${page}`);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    let category: string;
    if (categoryName === ":categoryName" || "") {
      category = "Beef";
      navigate(`/categories/Beef`);
    } else {
      category = categoryName as string;
    }
    const request: CategoryRecipesRequest = { category, page: currentPage };
    dispatch(getRecipesByCategory(request));
  }, [dispatch, categoryName, currentPage]);


  return (
    <>
      {isLoading ? (
        <p>Loading recipes...</p>
      ) : (
        recipes && (
          <ul className={css.recipesList}>
            {recipes.map((recipe: Recipe) => {
              return (
                <li key={`${recipe._id}`} className={css.recipesListItem}>
                  <NavLink to={`/recipe/${recipe._id}`}>
                    <CardRecipe title={recipe.title} preview={recipe.preview} />
                  </NavLink>
                </li>
              );
            })}
          </ul>
        )
      )}

      <BasicPagination
        count={Math.ceil(totalRecipes / 8)}
        page={currentPage}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default CategoriesByName;
