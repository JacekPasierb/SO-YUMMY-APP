import { Suspense, useEffect } from "react";
import css from "./CategoriesPage.module.css";
import { Outlet } from "react-router";
import CategoriesNav from "../../components/CategoriesNav/CategoriesNav";

const CategoriesPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <main className={css.background}>
      <div className={`${css.container} ${css.flex}`}>
        <CategoriesNav />
        <Suspense>
          <Outlet />
        </Suspense>
      </div>
    </main>
  );
};

export default CategoriesPage;
