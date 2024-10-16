import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import MainTitle from "../../components/MainTitle/PageTitle";
import styles from "./SearchPage.module.css";
import Search from "../../components/SearchForm/SearchForm";
import SearchBar from "../../components/SearchBar/SearchBar";
import MyRecipesList from "../../components/MyRecipesList/MyRecipesList";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { getRecipes } from "../../redux/recipes/operations";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import {
  selectIsLoading,
  selectRecipesByCategory,
  selectTotalRecipes,
} from "../../redux/recipes/selectors";
import BasicPagination from "../../components/Pagination/BasicPagination";
import { getPageFromQueryString } from "../../helpers/getPageFromQueryString";

const SearchPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSearchType = searchParams.get("ingredient")
    ? "ingredient"
    : "query";
  const initialSearchValue = searchParams.get(initialSearchType) || "";

  const [searchType, setSearchType] = useState(initialSearchType);
  const [searchValue, setSearchValue] = useState(initialSearchValue);

  const recipes = useSelector(selectRecipesByCategory);
  const totalRecipes = useSelector(selectTotalRecipes);
  const isLoading = useSelector(selectIsLoading);
  const currentPage = getPageFromQueryString();
  const navigate = useNavigate();
  const handlePageChange = (page: number) => {
    const newParams = { ...Object.fromEntries(searchParams.entries()), page: page.toString() };
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
      dispatch(getRecipes({ type: searchType, value, page: currentPage }));
    }
  }, [searchParams, dispatch, searchType]);

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
            <MyRecipesList recipes={recipes} isLoading={isLoading} />
            <BasicPagination
              count={Math.ceil(totalRecipes / 6)}
              page={currentPage}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </div>
    </>
  );
};

export default SearchPage;
