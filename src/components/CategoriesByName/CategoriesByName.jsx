import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import BasicPagination from "../Pagination/BasicPagination";
import CardRecipe from "../CardRecipe/CardRecipe";
import css from "./CategoriesByName.module.css";
import { getPageFromQueryString } from "../../helpers/getPageFromQueryString";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCategoryRecipes,
  selectIsLoading,
  selectTotalRecipes,
} from "../../redux/recipes/selectors";
import { getCategoryRecipes } from "../../redux/recipes/operations";

const CategoriesByName = () => {
  const { categoryName } = useParams();

  const currentPage = getPageFromQueryString();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const recipes = useSelector(selectCategoryRecipes);
  const totalRecipes = useSelector(selectTotalRecipes);
  const isLoading = useSelector(selectIsLoading);

  const handlePageChange = (page) => {
    navigate(`?page=${page}`);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    let category;
    if (categoryName === ":categoryName" || "") {
      category = "Beef";
      navigate(`/categories/Beef`);
    } else {
      category = categoryName;
    }

    dispatch(getCategoryRecipes({ category, currentPage }));
    console.log("fort", recipes);
    console.log("for", totalRecipes);
  }, [dispatch, categoryName, currentPage]);

  return (
    <>
      {isLoading ? (
        <p>Loading recipes...</p>
      ) : (
        recipes && (
          <ul className={css.recipesList}>
            {recipes.map((recipe) => {
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
