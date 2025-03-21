import React, {useEffect} from "react";
import {useSelector} from "react-redux";
import {useLocation, useNavigate} from "react-router";
import {AppDispatch, useAppDispatch} from "../../redux/store";
import {getFavoriteRecipes} from "../../redux/favoriteRecipes/operations";
import {
  selectFavoriteRecipes,
  selectIsLoading,
  selectTotalFavoritesRecipes,
} from "../../redux/favoriteRecipes/selectors";
import {getPageFromQueryString} from "../../helpers/helpers";
import Header from "../../components/Header/Header";
import MainTitle from "../../components/MainTitle/PageTitle";
import MyRecipesList from "../../components/MyRecipesList/MyRecipesList";
import BasicPagination from "../../components/Pagination/BasicPagination";
import styles from "./FavoritesPage.module.css";
import "react-loading-skeleton/dist/skeleton.css";
import {useTranslation} from "react-i18next";
import {Helmet} from "react-helmet-async";

const FavoritesPage: React.FC = () => {
  const dispatch: AppDispatch = useAppDispatch();
  const navigate = useNavigate();
  const {search} = useLocation();
  const {t} = useTranslation();
  const favoriteRecipes = useSelector(selectFavoriteRecipes) || [];
  const totalFavoriteRecipes = useSelector(selectTotalFavoritesRecipes);
  const isLoading = useSelector(selectIsLoading);
  const currentPage = getPageFromQueryString(search);

  const ITEMS_PER_PAGE = 4;

  useEffect(() => {
    dispatch(getFavoriteRecipes({page: currentPage}));
  }, [dispatch, currentPage]);

  const handlePageChange = (page: number) => {
    navigate(`?page=${page}`);
    window.scrollTo({top: 0, behavior: "smooth"});
  };

  return (
    <>
      <Helmet>
        <title>{t("titles.favorites")}</title>
      </Helmet>
      <Header />
      <main className={styles.favoritesPage}>
        <div className={styles.favoritesPage__container}>
          <MainTitle title={t("favorites")} />
          <MyRecipesList recipes={favoriteRecipes} isLoading={isLoading} />
          {favoriteRecipes.length !== 0 && (
            <BasicPagination
              count={Math.ceil(totalFavoriteRecipes / ITEMS_PER_PAGE)}
              page={currentPage}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      </main>
    </>
  );
};

export default FavoritesPage;
