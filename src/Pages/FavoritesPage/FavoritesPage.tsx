import React, { useEffect } from "react";
import styles from "./FavoritesPage.module.css";

import Header from "../../components/Header/Header";
import MainTitle from "../../components/MainTitle/PageTitle";
import MyRecipesList from "../../components/MyRecipesList/MyRecipesList";
import BasicPagination from "../../components/Pagination/BasicPagination";

import { useSelector } from "react-redux";
import { AppDispatch, useAppDispatch } from "../../redux/store";
import { getFavoriteRecipes } from "../../redux/favoriteRecipes/operations";
import { useNavigate } from "react-router";
import { getPageFromQueryString } from "../../helpers/getPageFromQueryString";
import {
  selectFavoriteRecipes,
  selectIsLoading,
  selectTotalFavoritesRecipes,
} from "../../redux/favoriteRecipes/selectors";
import "react-loading-skeleton/dist/skeleton.css";

const FavoritesPage = () => {
  const dispatch: AppDispatch = useAppDispatch();
  const favoriteRecipes = useSelector(selectFavoriteRecipes);
  const totalFavoriteRecipes = useSelector(selectTotalFavoritesRecipes);
  const isLoading = useSelector(selectIsLoading);
  const currentPage = getPageFromQueryString();
  const navigate = useNavigate();

  const handlePageChange = (page: number) => {
    navigate(`?page=${page}`);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    dispatch(getFavoriteRecipes({ page: currentPage }));
  }, [dispatch, currentPage]);

  return (
    <>
      <Header />
      <main className={styles.favoritesPage}>
        <div className={styles.favoritesPage__container}>
          <MainTitle title={"Favorites"} />
          <MyRecipesList recipes={favoriteRecipes} isLoading={isLoading} />
          {favoriteRecipes.length !== 0 && 
          <BasicPagination
            count={Math.ceil(totalFavoriteRecipes / 4)}
            page={currentPage}
            onPageChange={handlePageChange}
          />}
        </div>
      </main>
    </>
  );
};

export default FavoritesPage;
