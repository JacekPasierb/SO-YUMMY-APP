import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import BasicPagination from "../Pagination/BasicPagination";
import CardRecipe from "../CardRecipe/CardRecipe";
import css from "./CategoriesByName.module.css";
import { fetchRecipesByCategoryName } from "../../API/recipesAPI";
import { getPageFromQueryString } from "../../helpers/getPageFromQueryString";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { selectCategoryRecipes } from "../../redux/recipes/selectors";
import { getCategoryRecipes } from "../../redux/recipes/operations";

const CategoriesByName = () => {
  const { categoryName } = useParams();
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalRecipes, setTotalRecipes] = useState(0);
  const currentPage = getPageFromQueryString();
const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlePageChange = (page) => {
    navigate(`?page=${page}`);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
   
    const getRecipesByCategoryName = async () => {
      try {
        setIsLoading(true);
        let category;
        if (categoryName === ":categoryName" || "") {
          category = "Beef";
          navigate(`/categories/Beef`);
        } else {
          category = categoryName;
        }
        
        dispatch(getCategoryRecipes({category,currentPage}))
        
        const { data } = await fetchRecipesByCategoryName(
          category,
          currentPage
        );

        setRecipes(data.result);
        setTotalRecipes(data.total);
      } catch (error) {
        console.error("Error fetching recipes by category: ", error);
      } finally {
        setIsLoading(false);
      }
    };
    getRecipesByCategoryName();
  }, [dispatch, categoryName, currentPage]);

  return (
    <>
      {isLoading && <p>Loading recipes...</p>}
      {recipes.length > 0 && !isLoading && (
        <ul className={css.recipesList}>
          {recipes.map((recipe) => {
            return (
              <li key={`${recipe._id}`} className={css.recipesListItem}>
                <NavLink to={`/recipe/${recipe._id}`}><CardRecipe dish={recipe} /></NavLink>
              </li>
            );
          })}
        </ul>
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
