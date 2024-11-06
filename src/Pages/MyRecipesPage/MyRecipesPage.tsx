import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { AppDispatch } from "../../redux/store";
import { getOwnRecipes } from "../../redux/ownRecipes/operations";
import {
  selectIsLoading,
  selectOwnRecipes,
  selectTotalOwnRecipes,
} from "../../redux/ownRecipes/selectors";
import { selectUser } from "../../redux/auth/selectors";
import { getPageFromQueryString } from "../../helpers/helpers";
import Header from "../../components/Header/Header";
import MainTitle from "../../components/MainTitle/PageTitle";
import MyRecipesList from "../../components/MyRecipesList/MyRecipesList";
import BasicPagination from "../../components/Pagination/BasicPagination";
import styles from "./MainRecipesPage.module.css";

const ITEMS_PER_PAGE = 4;

const MyRecipesPage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const { search } = useLocation();

  const user = useSelector(selectUser);
  const ownRecipes = useSelector(selectOwnRecipes);
  const totalOwnRecipes = useSelector(selectTotalOwnRecipes);
  const isLoading = useSelector(selectIsLoading);
  const currentPage = getPageFromQueryString(search);

  useEffect(() => {
    if (user?.userId) {
      dispatch(
        getOwnRecipes({
          userId: user.userId,
          page: currentPage,
        })
      );
    }
  }, [dispatch, currentPage, user.userId]);

  const handlePageChange = (page: number) => {
    navigate(`?page=${page}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className={styles.myRecipesPage}>
      <Header />
      <div className={styles.myRecipesPage__container}>
        <MainTitle title={"My recipes"} />

        <MyRecipesList recipes={ownRecipes} isLoading={isLoading} />
        {ownRecipes.length > 0 && (
          <BasicPagination
            count={Math.ceil(totalOwnRecipes / ITEMS_PER_PAGE)}
            page={currentPage}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </main>
  );
};

export default MyRecipesPage;
