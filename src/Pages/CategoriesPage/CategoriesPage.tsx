import {FC, Suspense, useEffect, useMemo} from "react";
import {Outlet, useNavigate, useParams} from "react-router-dom";
import Header from "../../components/Header/Header";
import MainTitle from "../../components/MainTitle/PageTitle";
import CategoriesNav from "../../components/CategoriesNav/CategoriesNav";
import styles from "./CategoriesPage.module.css";
import {useTranslation} from "react-i18next";
import {Helmet} from "react-helmet-async";

const CategoriesPage: FC = () => {
  const {t, i18n} = useTranslation();
  const {categoryName} = useParams();
  const navigate = useNavigate();
  const currentLanguage = i18n.language;
  const category = currentLanguage === "pl" ? "Śniadanie" : "Breakfast";

  useEffect(() => {
    if (!categoryName) {
      navigate(`${category}`, {replace: true});
    }
  }, [categoryName, navigate, category]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <>
      <Helmet>
        <title>{t("titles.categories")}</title>
      </Helmet>
      <main className={styles.categoriesPage}>
        <Header />
        <div className={`${styles.container} ${styles.flex}`}>
          <MainTitle title={t("categories")} />
          <CategoriesNav />
          <Suspense>
            <Outlet />
          </Suspense>
        </div>
      </main>
    </>
  );
};

export default CategoriesPage;
