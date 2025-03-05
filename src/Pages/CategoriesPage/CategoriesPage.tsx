import { FC, Suspense, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "../../components/Header/Header";
import MainTitle from "../../components/MainTitle/PageTitle";
import CategoriesNav from "../../components/CategoriesNav/CategoriesNav";
import styles from "./CategoriesPage.module.css";
import { AppDispatch } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { getCategoriesList } from "../../redux/recipes/operations";
import { selectCategoriesList } from "../../redux/recipes/selectors";
import { useTranslation } from "react-i18next";

const CategoriesPage:FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const categoriesList = useSelector(selectCategoriesList);
const {t}=useTranslation();
  useEffect(() => {
   window.scrollTo({ 
      top: 0, 
      behavior: 'smooth' 
    });
  }, []);

  useEffect(() => {
    dispatch(getCategoriesList());
  }, [dispatch]);

  return (
    <main className={styles.categoriesPage}>
      <Header />
      <div className={`${styles.container} ${styles.flex}`}>
        <MainTitle title={t("Categories")} />
        <CategoriesNav categoriesList={categoriesList}/>
        <Suspense>
          <Outlet />
        </Suspense>
      </div>
    </main>
  );
};

export default CategoriesPage;
