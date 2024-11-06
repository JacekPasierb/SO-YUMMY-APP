import { FC, Suspense, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "../../components/Header/Header";
import MainTitle from "../../components/MainTitle/PageTitle";
import CategoriesNav from "../../components/CategoriesNav/CategoriesNav";
import styles from "./CategoriesPage.module.css";

const CategoriesPage:FC = () => {

  useEffect(() => {
   window.scrollTo({ 
      top: 0, 
      behavior: 'smooth' 
    });
  }, []);

  return (
    <main className={styles.categoriesPage}>
      <Header />
      <div className={`${styles.container} ${styles.flex}`}>
        <MainTitle title={"Categories"} />
        <CategoriesNav />
        <Suspense>
          <Outlet />
        </Suspense>
      </div>
    </main>
  );
};

export default CategoriesPage;
