
import axios from "axios";
import React, { useEffect, useState } from "react";
import {  useNavigate, useParams } from "react-router";
import BasicPagination from "../Pagination/BasicPagination";
import CardRecipe from "../CardRecipe/CardRecipe";
import css from "./CategoriesByName.module.css";

const CategoriesByName = () => {
  const { categoryName } = useParams();
  const [recipes, setRecipes] = useState([]);
  const [totalRecipes, setTotalRecipes] = useState(0);
  const navigate = useNavigate();
  const getRecipesByCategory = async (page) => {
    try {
      const { data } = await axios.get(`./api/recipes/categories/${categoryName}?page=${page}&limit=8`);
      setRecipes(data.data.result);
      setTotalRecipes(data.data.total);
    } catch (error) {
      console.error("Error fetching recipes by category: ", error);
    }
  };
  useEffect(() => {
   

    getRecipesByCategory(1);
    console.log("2", recipes);
  }, [categoryName]);
  console.log("1", recipes);

  const handlePageChange = (page) => {
    console.log("los");
    navigate(`?page=${page}`);
    getRecipesByCategory(page);
  };
  return (
    <>
      {recipes.length > 0 && (
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
     
      <BasicPagination count={ Math.ceil(totalRecipes/8)} onPageChange={handlePageChange}/>
    </>
  );
};

export default CategoriesByName;
