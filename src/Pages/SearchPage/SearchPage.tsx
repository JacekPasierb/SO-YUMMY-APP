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
import { useSearchParams } from "react-router-dom";
import {
  selectIsLoading,
  selectRecipesByCategory,
} from "../../redux/recipes/selectors";

const SearchPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchType, setSearchType] = useState(
    searchParams.get("query") || ""
  );
  const [searchValue, setSearchValue] = useState(
    searchParams.get(searchType) || ""
  );
  const recipes = useSelector(selectRecipesByCategory);
  const isLoading = useSelector(selectIsLoading);
  // Funkcja obsługująca aktualizację typu wyszukiwania
  const handleSearchTypeChange = (type: string) => {
    setSearchType(type);
    // const paramKey = type === "query" ? "query" : "ingredient";
    // setSearchParams({ [paramKey]: searchParams.get(paramKey) || "" });
  };

  const handleSearchSubmit = (value: string) => {
    const paramKey = searchType === "query" ? "query" : "ingredient";
    setSearchParams({ [paramKey]: value });
    dispatch(getRecipes({ type: searchType, value: value }));
  };

  // useEffect(() => {
  //   dispatch(getRecipes({ type: "query", value: "" }));
  // }, [dispatch]);

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
        {recipes.length !== 0 && <MyRecipesList recipes={recipes} isLoading={isLoading} />}
      </div>
    </>
  );
};

export default SearchPage;
