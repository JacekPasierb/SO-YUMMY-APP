import css from "./FavoritesPage.module.css";

import React, { useEffect, useState } from "react";

import Header from "../../components/Header/Header";
import MainTitle from "../../components/MainTitle/MainTitle";
import MyRecipesList from "../../components/MyRecipesList/MyRecipesList";

import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import {
  selectFavoriteRecipes,
  selectIsError,
  selectIsLoading,
} from "../../redux/favoriteRecipes/selectors";
import { AppDispatch, useAppDispatch } from "../../redux/store";
import { getFavoriteRecipes } from "../../redux/favoriteRecipes/operations";
import { ClimbingBoxLoader } from "react-spinners";

const FavoritesPage = () => {
  const dispatch: AppDispatch = useAppDispatch();
  const favoriteRecipes = useSelector(selectFavoriteRecipes);
  const isLoading = useSelector(selectIsLoading);
  const isError = useSelector(selectIsError);

  useEffect(() => {
    dispatch(getFavoriteRecipes());
  }, [dispatch]);

  return (
    <>
      <Header />
      <main className={css.background}>
        <div className={`${css.container} ${css.flex}`}>
          <MainTitle title={"Favorites"} />

          {isLoading ? (
            <div className={css.boxLoader}>
              <ClimbingBoxLoader />
            </div>
          ) : (
            favoriteRecipes && <MyRecipesList recipes={favoriteRecipes} />
          )}
        </div>
      </main>
    </>
  );
};

export default FavoritesPage;
