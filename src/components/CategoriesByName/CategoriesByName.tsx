import React, { useEffect } from "react";
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

const ITEMS_PER_PAGE = 8;

const categoryTranslations: Record<string, Record<string, string>> = {
  en: {
    "Kurczak": "Chicken",
    "Jagnięcina": "Lamb",
    "Koźlina": "Goat",
    "Desery": "Dessert",
    "Dodatki": "Side",
    "Makarony": "Pasta",
    "Wołowina": "Beef",
  },
  pl: {
    "Chicken": "Kurczak",
    "Lamb": "Jagnięcina",
    "Goat": "Koźlina",
    "Dessert": "Desery",
    "Side": "Dodatki",
    "Pasta": "Makarony",
    "Beef": "Wołowina",
  }
};
const CategoriesByName: React.FC = () => {
  const {categoryName} = useParams();
  const {search} = useLocation();
  const currentPage = getPageFromQueryString(search);
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const {t, i18n} = useTranslation();
  const currentLanguage = i18n.language;
  const DEFAULT_CATEGORY = currentLanguage === "pl" ? "Wołowina" : "Beef";

  const recipes = useSelector(selectRecipesByCategory);
  const totalRecipes = useSelector(selectTotalRecipes);
  const isLoading = useSelector(selectIsLoading);

  const handlePageChange = (page: number) => {
    navigate(`?page=${page}`);
    window.scrollTo({top: 0, behavior: "smooth"});
  };
  useEffect(() => {
    if (!categoryName) return; 

    const translatedCategory = categoryTranslations[currentLanguage]?.[categoryName];

    if (translatedCategory && categoryName !== translatedCategory) {
      console.log(`🔄 Przekierowanie: ${categoryName} -> ${translatedCategory}`);
      navigate(`/categories/${translatedCategory}`, { replace: true });
    }
  }, [currentLanguage, categoryName, navigate]);


  React.useEffect(() => {
    const category =
      categoryName && categoryName !== ":categoryName"
        ? categoryName
        : DEFAULT_CATEGORY;
    

    if (categoryName === ":categoryName" || !categoryName) {
     

      navigate(`/categories/${DEFAULT_CATEGORY}`);
      return;
    }

    dispatch(getRecipesByCategory({category, page: currentPage}));
  }, [dispatch, categoryName, currentPage, navigate, t,currentLanguage]);

  if (isLoading) {
    return (
      <div className={styles.loaderContainer}>
        <ClimbingBoxLoader color="#8BAA36" />
      </div>
    );
  }

  if (!recipes || recipes.length === 0) {
    return <p>Brak przepisów w danej kategori.</p>;
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
