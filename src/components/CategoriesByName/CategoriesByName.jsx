import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import BasicPagination from "../Pagination/BasicPagination";
import CardRecipe from "../CardRecipe/CardRecipe";
import css from "./CategoriesByName.module.css";
import { Loader } from "../Loader/Loader";
import { fetchRecipesByCategoryName } from "../../API/recipesAPI";

const CategoriesByName = () => {
  const { categoryName } = useParams();
  const location = useLocation();

  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getPageFromQueryString = () => {
    const searchParams = new URLSearchParams(location.search);
    return parseInt(searchParams.get("page")) || 1;
  };

  const currentPage = getPageFromQueryString();

  const [totalRecipes, setTotalRecipes] = useState(0);
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
          navigate(`/categories/Beef`)
        } else {
          category = categoryName;
        }

        const { data } = await fetchRecipesByCategoryName(category,currentPage);

        setRecipes(data.result);
        setTotalRecipes(data.total);
      } catch (error) {
        console.error("Error fetching recipes by category: ", error);
      } finally {
        setIsLoading(false);
      }
    };
    getRecipesByCategoryName();
  }, [categoryName, currentPage]);
  return (
    <>
      {isLoading && <p>Loading recipes...</p>}
      {recipes.length > 0 && !isLoading && (
        <ul className={css.recipesList}>
          {recipes.map((recipe) => {
            return (
              <li key={`${recipe._id}`} className={css.recipesListItem}>
                <CardRecipe dish={recipe} />
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
