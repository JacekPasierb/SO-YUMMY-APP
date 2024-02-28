import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import BasicPagination from "../Pagination/BasicPagination";
import CardRecipe from "../CardRecipe/CardRecipe";
import css from "./CategoriesByName.module.css";
import { Loader } from "../Loader/Loader";

const CategoriesByName = () => {
  const { categoryName } = useParams();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  const getPageFromQueryString = () => {
    const searchParams = new URLSearchParams(location.search);
    return parseInt(searchParams.get("page")) || 1;
  };

  const currentPage = getPageFromQueryString();

  const [recipes, setRecipes] = useState([]);
  const [totalRecipes, setTotalRecipes] = useState(0);
  const navigate = useNavigate();
  const getRecipesByCategory = async (page) => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(
        `./api/recipes/categories/${categoryName}?page=${page}&limit=8`
      );

      setRecipes(data.data.result);
      setTotalRecipes(data.data.total);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      console.error("Error fetching recipes by category: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getRecipesByCategory(currentPage);
  }, [categoryName, currentPage]);

  const handlePageChange = (page) => {
    navigate(`?page=${page}`);
  };
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
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default CategoriesByName;
