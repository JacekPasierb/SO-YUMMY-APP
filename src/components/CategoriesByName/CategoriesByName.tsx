import React, {useEffect, useState} from "react";
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
import {resetRecipes} from "../../redux/recipes/recipesSlice";

const ITEMS_PER_PAGE = 8;

const categoryTranslations: Record<string, Record<string, string>> = {
  en: {
    Kurczak: "Chicken",
    Jagnięcina: "Lamb",
    Koźlina: "Goat",
    Desery: "Dessert",
    Dodatki: "Side",
    Makarony: "Pasta",
    Wołowina: "Beef",
    Śniadanie: "Breakfast",
    Różne:"Miscellaneous",
    Wieprzowina:"Pork",
    OwoceMorza: "Seafood",
    Przystawka: "Starter"
  },
  pl: {
    Chicken: "Kurczak",
    Lamb: "Jagnięcina",
    Goat: "Koźlina",
    Dessert: "Desery",
    Side: "Dodatki",
    Pasta: "Makarony",
    Beef: "Wołowina",
    Breakfast: "Śniadanie",
    Miscellaneous:"Różne",
    Pork:"Wieprzowina",
    Seafood: "Owoce morza",
     Starter: "Przystawka"
  },
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
  const [forceUpdate, setForceUpdate] = useState(0);
  const handlePageChange = (page: number) => {
    navigate(`?page=${page}`);
    window.scrollTo({top: 0, behavior: "smooth"});
  };

  console.log("🌍 Aktualny język:", currentLanguage);
console.log("📌 Aktualna kategoria:", categoryName);
console.log("📄 Aktualna strona:", currentPage);

  useEffect(() => {
    if (!categoryName) return;

    const translatedCategory =
      categoryTranslations[currentLanguage]?.[categoryName];

    if (translatedCategory && categoryName !== translatedCategory) {
      console.log(
        `🔄 Przekierowanie: ${categoryName} -> ${translatedCategory}`
      );
      navigate(`/categories/${translatedCategory}`, {replace: true});
    }
  }, [currentLanguage, categoryName, navigate]);

  // React.useEffect(() => {
  //   const category =
  //     categoryName && categoryName !== ":categoryName"
  //       ? categoryName
  //       : DEFAULT_CATEGORY;

  //   if (categoryName === ":categoryName" || !categoryName) {

  //     navigate(`/categories/${DEFAULT_CATEGORY}`);
  //     return;
  //   }
  //   dispatch(resetRecipes());
  //   dispatch(getRecipesByCategory({category, page: currentPage}));
  // }, [dispatch, categoryName, currentPage, navigate, t,currentLanguage]);
  useEffect(() => {
    console.log("🌍 Język zmieniony, wymuszam rerender...");
    setForceUpdate((prev) => prev + 1);
  }, [currentLanguage]);
  useEffect(() => {
    console.log("🔥 useEffect został wywołany");
    if (!categoryName) return;

    console.log("🗑️ Resetowanie przepisów przed pobraniem nowych...");
    dispatch(resetRecipes());

    // 🔹 Opóźnienie pobrania przepisów, aby uniknąć podwójnego renderowania
    setTimeout(() => {
      console.log(
        `📥 Pobieranie przepisów dla: ${categoryName} w języku ${currentLanguage}`
      );
      dispatch(
        getRecipesByCategory({category: categoryName, page: currentPage})
      );
      console.log("recipe", recipes);
    }, 200); // Opóźnienie 200ms dla płynnego odświeżania
  }, [dispatch, categoryName, currentPage, currentLanguage,forceUpdate]);

  if (isLoading) {
    return (
      <div className={styles.loaderContainer}>
        <ClimbingBoxLoader color="#8BAA36" />
      </div>
    );
  }

  // if (!recipes || recipes.length === 0) {
  //   return <p>Brak przepisów w danej kategori.</p>;
  // }

  return (
    <>
      <ul className={styles.recipesList}>
        {recipes &&
          recipes.map((recipe: IRecipe) => (
            <li key={recipe._id} className={styles.recipesListItem}>
              <NavLink to={`/recipe/${recipe._id}`}>
                <CardRecipe title={recipe.title} preview={recipe.preview} />
              </NavLink>
            </li>
          ))}
        {!recipes ||
          (recipes.length === 0 && (
            <li>
              <p>Brak</p>
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
