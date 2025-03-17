import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  NavLink,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { useMediaQuery } from "@react-hook/media-query";
import { AppDispatch } from "../../redux/store";
import { getRecipes } from "../../redux/recipes/operations";
import {
  selectIsLoading,
  selectRecipesByCategory,
  selectTotalRecipes,
} from "../../redux/recipes/selectors";
import {
  getEmptySearchImage,
  getPageFromQueryString,
} from "../../helpers/helpers";
import { IRecipe } from "../../types/recipesTypes";
import Header from "../../components/Header/Header";
import MainTitle from "../../components/MainTitle/PageTitle";
import SearchBar from "../../components/SearchBar/SearchBar";
import CardRecipe from "../../components/CardRecipe/CardRecipe";
import BasicPagination from "../../components/Pagination/BasicPagination";
import styles from "./SearchPage.module.css";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";

const SearchPage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const { search } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
const {t}=useTranslation();
  const initialSearchType = searchParams.get("ingredient")
    ? "ingredient"
    : "query";
  const initialSearchValue = searchParams.get(initialSearchType) || "";

  const [searchType, setSearchType] = useState(initialSearchType);
  const [searchValue, setSearchValue] = useState(initialSearchValue);

  const recipes = useSelector(selectRecipesByCategory);
  const totalRecipes = useSelector(selectTotalRecipes);
  const isLoading = useSelector(selectIsLoading);
  const currentPage = getPageFromQueryString(search);

  const isMobile = useMediaQuery("(max-width:768px)");
  const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 1200px)");
  const isDesktop = useMediaQuery("(min-width:1200px)");
  const isRetina = window.devicePixelRatio > 1;
  const limit = isDesktop ? 12 : 6;

  const emptySearchImage = useMemo(() => {
    return getEmptySearchImage({ isDesktop, isTablet, isMobile, isRetina });
  }, [isDesktop, isTablet, isMobile, isRetina]);

  const handlePageChange = (page: number) => {
    const newParams = {
      ...Object.fromEntries(searchParams.entries()),
      page: page.toString(),
    };
    navigate(`?${new URLSearchParams(newParams)}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSearchTypeChange = (type: string) => {
    setSearchType(type);
  };

  const handleSearchSubmit = (value: string) => {
    const paramKey = searchType === "query" ? "query" : "ingredient";
    setSearchParams({ [paramKey]: value });
  };

  useEffect(() => {
    const typeFromUrl = searchParams.get("type");
    if (typeFromUrl === "ingredient") {
      setSearchType("ingredient");
    }
  }, [searchParams]);

  useEffect(() => {
    const paramKey = searchType === "query" ? "query" : "ingredient";
    const value = searchParams.get(paramKey) || "";

    if (value) {
      dispatch(
        getRecipes({ type: searchType, value, page: currentPage, limit })
      );
    }
  }, [searchParams, dispatch, searchType, currentPage, limit]);

  const hasSearchResults = searchParams.get(searchType) !== null;
  const hasRecipes = recipes.length > 0;

  return (
    <>
      <Helmet>
        <title>{t("titles.search")}</title>
      </Helmet>
      <Header />
      <div className={styles.searchPage__container}>
        <MainTitle title={t("search_button")}/>
        <SearchBar
          onTypeChange={handleSearchTypeChange}
          selectedType={searchType}
          onSearchSubmit={handleSearchSubmit}
          searchValue={searchValue}
        />
        {hasSearchResults && hasRecipes && (
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
              count={Math.ceil(totalRecipes / limit)}
              page={currentPage}
              onPageChange={handlePageChange}
            />
          </>
        )}
        {!isLoading && hasSearchResults && !hasRecipes && (
          <div className={styles.noResults}>
            <img
              src={emptySearchImage}
              alt="No results found"
              className={styles.noResults__image}
            />
            <p className={styles.noResults__text}>
              Try looking for something else..
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default SearchPage;
