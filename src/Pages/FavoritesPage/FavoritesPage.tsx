import css from "./FavoritesPage.module.css";

import React, { useEffect, useState } from "react";

import Header from "../../components/Header/Header";
import MainTitle from "../../components/MainTitle/PageTitle";
import MyRecipesList from "../../components/MyRecipesList/MyRecipesList";

import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import {
  selectFavoriteRecipes,
  selectIsError,
  selectIsLoading,
  selectTotalFavoritesRecipes,
} from "../../redux/favoriteRecipes/selectors";
import { AppDispatch, useAppDispatch } from "../../redux/store";
import { getFavoriteRecipes } from "../../redux/favoriteRecipes/operations";
import { ClimbingBoxLoader } from "react-spinners";
import BasicPagination from "../../components/Pagination/BasicPagination";
import { useNavigate } from "react-router";
import { getPageFromQueryString } from "../../helpers/getPageFromQueryString";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';

// Komponent Skeleton dla ulubionych przepisów
const FavoritesSkeleton = () => (
  <div className={css.skeletonList}>
    <Skeleton height={120} width={"100%"} count={4} style={{ marginBottom: '20px' }} />
  </div>
);
const FavoritesPage = () => {
  const dispatch: AppDispatch = useAppDispatch();
  const favoriteRecipes = useSelector(selectFavoriteRecipes);
  const totalFavoriteRecipes = useSelector(selectTotalFavoritesRecipes);
  const isLoading = useSelector(selectIsLoading);
  const isError = useSelector(selectIsError);
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
      <main className={css.background}>
        <div className={`${css.container} ${css.flex}`}>
          <MainTitle title={"Favorites"} />

          {isLoading ? (
            <FavoritesSkeleton />
          ) : (
            favoriteRecipes && (
              <>
                <MyRecipesList recipes={favoriteRecipes} />
                <BasicPagination
                  count={Math.ceil(totalFavoriteRecipes / 4)}
                  page={currentPage}
                  onPageChange={handlePageChange}
                />
              </>
            )
          )}
        </div>
      </main>
    </>
  );
};

export default FavoritesPage;
