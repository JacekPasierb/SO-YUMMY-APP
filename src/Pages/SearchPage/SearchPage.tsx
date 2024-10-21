import React, { useEffect, useMemo, useState } from "react";
import Header from "../../components/Header/Header";
import MainTitle from "../../components/MainTitle/PageTitle";
import styles from "./SearchPage.module.css";
import Search from "../../components/SearchForm/SearchForm";
import SearchBar from "../../components/SearchBar/SearchBar";
import MyRecipesList from "../../components/MyRecipesList/MyRecipesList";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { getRecipes } from "../../redux/recipes/operations";
import {
  Navigate,
  NavLink,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import {
  selectIsLoading,
  selectRecipesByCategory,
  selectTotalRecipes,
} from "../../redux/recipes/selectors";
import BasicPagination from "../../components/Pagination/BasicPagination";
import { getPageFromQueryString } from "../../helpers/getPageFromQueryString";
import CardRecipe from "../../components/CardRecipe/CardRecipe";
import { IRecipe } from "../../types/recipesTypes";
import { useMediaQuery } from "@react-hook/media-query";
import { getEmptySearchImage } from "../../helpers/helpers";



const SearchPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSearchType = useMemo(
    () => (searchParams.get("ingredient") ? "ingredient" : "query"),
    [searchParams]
  );
  const initialSearchValue = useMemo(
    () => searchParams.get(initialSearchType) || "",
    [searchParams, initialSearchType]
  );

  const [searchType, setSearchType] = useState(initialSearchType);
  const [searchValue, setSearchValue] = useState(initialSearchValue);

  const recipes = useSelector(selectRecipesByCategory);
  const totalRecipes = useSelector(selectTotalRecipes);
  const isLoading = useSelector(selectIsLoading);
  const currentPage = getPageFromQueryString();
  const navigate = useNavigate();
  
  const isMobile = useMediaQuery("(max-width:768px)");
  const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 1200px)");
  const isDesktop = useMediaQuery("(min-width:1200px)");
  const limit = isDesktop ? 12 : 6;

  const emptySearchImage = useMemo(() => {
    return getEmptySearchImage(isMobile, isTablet, isDesktop);
  }, [isMobile, isTablet, isDesktop]);


  const handlePageChange = (page: number) => {
    const newParams = {
      ...Object.fromEntries(searchParams.entries()),
      page: page.toString(),
    };
    navigate(`?${new URLSearchParams(newParams)}`);
    window.scrollTo(0, 0);
  };
  // Funkcja obsługująca aktualizację typu wyszukiwania
  const handleSearchTypeChange = (type: string) => {
    setSearchType(type);
    // const paramKey = type === "query" ? "query" : "ingredient";
    // setSearchParams({ [paramKey]: searchParams.get(paramKey) || "" });
  };

  const handleSearchSubmit = (value: string) => {
    const paramKey = searchType === "query" ? "query" : "ingredient";
    setSearchParams({ [paramKey]: value });
    // dispatch(getRecipes({ type: searchType, value: value }));
  };

  useEffect(() => {
    const paramKey = searchType === "query" ? "query" : "ingredient";
    const value = searchParams.get(paramKey) || "";

    if (value) {
      dispatch(
        getRecipes({ type: searchType, value, page: currentPage, limit })
      );
    }
  }, [searchParams, dispatch, searchType, currentPage, limit]);

  return (
    <>
      <Header />
      <div className={styles.searchPage__container}>
        <MainTitle title="Search" />
        <SearchBar
          onTypeChange={handleSearchTypeChange}
          selectedType={searchType}
          onSearchSubmit={handleSearchSubmit}
          searchValue={searchValue}
        />
        {searchParams.get(searchType) !== null && recipes.length !== 0 && (
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
        {!isLoading &&
          searchParams.get(searchType) !== null &&
          recipes.length === 0 && (
            <div className={styles.noResults}>
              <img src={emptySearchImage} alt="No results found" className={styles.noResultsImage}/>
              <p className={styles.noResultsText}>Try looking for something else..</p>
            </div>
          )}
      </div>
    </>
  );
};

export default SearchPage;
