import { Suspense, useEffect } from "react";
import css from "./CategoriesPage.module.css";

import CategoriesNav from "../../components/CategoriesNav/CategoriesNav";
import Header from "../../components/Header/Header";
import MainTitle from "../../components/MainTitle/MainTitle";
import { Outlet } from "react-router-dom";

const CategoriesPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <main className={css.background}>
      <Header />
      <div className={`${css.container} ${css.flex}`}>
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
