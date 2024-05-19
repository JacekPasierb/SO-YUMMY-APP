import css from "./MainRecipesPage.module.css";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  OwnRecipesRequest,
  getOwnRecipes,
} from "../../redux/ownRecipes/operations";
import {
  selectIsLoading,
  selectOwnRecipes,
  selectTotalOwnRecipes,
} from "../../redux/ownRecipes/selectors";

import { AppDispatch } from "../../redux/store";
import Header from "../../components/Header/Header";
import MyRecipesList from "../../components/MyRecipesList/MyRecipesList";
import { getPageFromQueryString } from "../../helpers/getPageFromQueryString";
import BasicPagination from "../../components/Pagination/BasicPagination";
import { useNavigate } from "react-router";
import MainTitle from "../../components/MainTitle/MainTitle";
import { selectUser } from "../../redux/auth/selectors";
import { Loader } from "../../components/Loader/Loader";


const MyRecipesPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const user = useSelector(selectUser);

  const currentPage = getPageFromQueryString();
  const ownRecipes = useSelector(selectOwnRecipes);
  const totalOwnRecipes = useSelector(selectTotalOwnRecipes);
  const isLoading = useSelector(selectIsLoading);
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.userId) {
      const userId = user.userId;
      const request: OwnRecipesRequest = { userId, page: currentPage };

      dispatch(getOwnRecipes(request));
    }
  }, [dispatch, currentPage]);

  const handlePageChange = (page: number) => {
    navigate(`?page=${page}`);
    window.scrollTo(0, 0);
  };
  return (
    <main className={css.background}>
      <Header />
      <div className={`${css.container} ${css.flex}`}>
        <MainTitle title={"My recipes"} />
        {isLoading ? (
          <Loader/>
        ) : (
          <>
          <MyRecipesList recipes={ownRecipes} />
          <BasicPagination
          count={Math.ceil(totalOwnRecipes / 4)}
          page={currentPage}
          onPageChange={handlePageChange}
        /></>
        )}
        
        
      </div>
    </main>
  );
};

export default MyRecipesPage;
