import React, { useEffect } from "react";
import Header from "../../components/Header/Header";
import MainTitle from "../../components/MainTitle/PageTitle";
import styles from "./SearchPage.module.css";
import Search from "../../components/SearchForm/SearchForm";
import SearchBar from "../../components/SearchBar/SearchBar";
import MyRecipesList from "../../components/MyRecipesList/MyRecipesList";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { getRecipes } from "../../redux/recipes/operations";

const SearchPage = () => {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(getRecipes());
  }, [dispatch]);
  return (
    <>
      <Header />
      <div className={styles.searchPage__container}>
        <MainTitle title="Search" />
        <SearchBar />
      </div>
    </>
  );
};

export default SearchPage;
