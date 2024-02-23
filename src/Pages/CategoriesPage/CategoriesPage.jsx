import { Suspense } from "react";
import css from "./CategoriesPage.module.css";
import { Outlet } from "react-router";
import CategoriesNav from "../../components/CategoriesNav/CategoriesNav";

const CategoriesPage = () => {
  return (
    <>
      <div className={`${css.container} `}>
        <CategoriesNav />
        <Suspense>
          <Outlet />
        </Suspense>
      </div>
    </>
  );
};

export default CategoriesPage;
