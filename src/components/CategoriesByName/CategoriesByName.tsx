import React from "react";
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
import styles from "./CategoriesByName.module.css";

const ITEMS_PER_PAGE = 8;
const DEFAULT_CATEGORY = "Beef";

const CategoriesByName: React.FC = () => {
  const { categoryName } = useParams();
  const currentPage = getPageFromQueryString();
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const recipes = useSelector(selectRecipesByCategory);
  const totalRecipes = useSelector(selectTotalRecipes);
  const isLoading = useSelector(selectIsLoading);

  const handlePageChange = (page: number) => {
    navigate(`?page=${page}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  React.useEffect(() => {
    const category = categoryName && categoryName !== "Beef" 
      ? categoryName 
      : DEFAULT_CATEGORY;

    if (categoryName === "Beef" || !categoryName) {
      navigate(`/categories/${DEFAULT_CATEGORY}`);
      return;
    }

    dispatch(getRecipesByCategory({ category, page: currentPage }));
  }, [dispatch, categoryName, currentPage, navigate]);

  if (isLoading) {
    return (
      <div className={styles.loaderContainer}>
        <ClimbingBoxLoader color="#8BAA36" />
      </div>
    );
  }

  if (!recipes || recipes.length === 0) {
    navigate("/*");
    return null;
  }

  return (
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
  );
};

export default CategoriesByName;
