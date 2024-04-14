import React, { FC, useEffect } from "react";

import BasicPagination from "../Pagination/BasicPagination";
import CardRecipe from "../CardRecipe/CardRecipe";
import css from "./CategoriesByName.module.css";
import { getPageFromQueryString } from "../../helpers/getPageFromQueryString";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCategoryRecipes,
  selectIsLoading,
  selectTotalRecipes,
} from "../../redux/recipes/selectors";
import { getCategoryRecipes } from "../../redux/recipes/operations";
import { AppDispatch } from "src/redux/store";

interface CategoryRecipesRequest {
  category: string;
  page: number;
}

const CategoriesByName: FC = () => {
  const { categoryName } = useParams();

  const currentPage = getPageFromQueryString();
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const recipes = useSelector(selectCategoryRecipes);
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
    dispatch(getCategoryRecipes(request));
  }, [dispatch, categoryName, currentPage]);

  return (
    <>
      {isLoading ? (
        <p>Loading recipes...</p>
      ) : (
        recipes && (
          <ul className={css.recipesList}>
            {recipes.map((recipe:any) => {
              return (
                <li key={`${recipe._id}`} className={css.recipesListItem}>
                  <NavLink to={`/recipe/${recipe._id}`}>
                    <CardRecipe dish={recipe} />
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
