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

  const initialSearchType = searchParams.get("query") ? "query" : "ingredient";
  const initialSearchValue = searchParams.get(initialSearchType) || "";
  
  const [searchType, setSearchType] = useState(initialSearchType);
  const [searchValue, setSearchValue] = useState(initialSearchValue);

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
    // dispatch(getRecipes({ type: searchType, value: value }));
  };

  useEffect(() => {
    const paramKey = searchType === "query" ? "query" : "ingredient";
    const value = searchParams.get(paramKey) || "";
    console.log("val",value);
    
    if (value ) {
      dispatch(getRecipes({ type: searchType, value }));
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
        {searchValue !== "" && recipes.length !== 0 && <MyRecipesList recipes={recipes} isLoading={isLoading} />}
      </div>
    </>
  );
};

export default SearchPage;
