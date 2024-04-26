import css from "./MainRecipesPage.module.css";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  OwnRecipesRequest,
  getOwnRecipes,
} from "../../redux/recipes/operations";
import {
  selectOwnRecipes,
  selectTotalOwnRecipes,
} from "../../redux/recipes/selectors";

import { AppDispatch } from "../../redux/store";
import Header from "../../components/Header/Header";
import { useAuth } from "../../hooks/useAuth";
import MyRecipesList from "../../components/MyRecipesList/MyRecipesList";
import { getPageFromQueryString } from "../../helpers/getPageFromQueryString";
import BasicPagination from "../../components/Pagination/BasicPagination";
import { useNavigate } from "react-router";
import MainTitle from "../../components/MainTitle/MainTitle";

const MyRecipesPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const { user } = useAuth();
  const userId = user?.id;
  const currentPage = getPageFromQueryString();
  const totalOwnRecipes = useSelector(selectTotalOwnRecipes);
  const navigate = useNavigate();

  useEffect(() => {
    if (userId) {
      const request: OwnRecipesRequest = { userId, page: currentPage };
      dispatch(getOwnRecipes(request));
    }
  }, [dispatch, userId, currentPage]);


  const handlePageChange = (page: number) => {
    navigate(`?page=${page}`);
    window.scrollTo(0, 0);
  };
  return (
    <main className={css.background}>
      <Header />
      <div className={`${css.container} ${css.flex}`}>
        <MainTitle title={"My recipes"} />
        <MyRecipesList />
        <BasicPagination
          count={Math.ceil(totalOwnRecipes / 4)}
          page={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </main>
  );
};

export default MyRecipesPage;
