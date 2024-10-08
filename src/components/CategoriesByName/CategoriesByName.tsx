
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
import { IRecipe } from "../../types/recipesTypes";
import { ClimbingBoxLoader } from "react-spinners";

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
    let category = categoryName ?? "Beef"; 
    if (category === ":categoryName" || !category) {
      category = "Beef";
      navigate(`/categories/Beef`);
    }

    const request = { category, page: currentPage };
    dispatch(getRecipesByCategory(request));
  }, [dispatch, categoryName, currentPage, navigate]);

  return (
    <>
      {isLoading ? (
        <div className={css.boxLoader}>
          <ClimbingBoxLoader />
        </div>
      ) : (
        recipes && (
          <ul className={css.recipesList}>
            {recipes.map((recipe: IRecipe) => {
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
      {!isLoading && (
        <BasicPagination
          count={Math.ceil(totalRecipes / 8)}
          page={currentPage}
          onPageChange={handlePageChange}
        />
      )}
    </>
  );
};

export default CategoriesByName;
