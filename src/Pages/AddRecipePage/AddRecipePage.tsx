import React, { lazy } from "react";
import { useMediaQuery } from "@react-hook/media-query";
import Header from "../../components/Header/Header";
import MainTitle from "../../components/MainTitle/PageTitle";
import SubTitle from "../../components/SubTitle/SubTitle";
import AddRecipeForm from "../../components/AddRecipeForm/AddRecipeForm";
import styles from "./AddRecipePage.module.css";
import { useTranslation } from "react-i18next";


const PopularRecipe = lazy(
  () => import("../../components/PopularRecipe/PopularRecipe")
);
const FollowUs = lazy(
  () => import("../../components/Footer/FollowUs/FollowUs")
);

const AddRecipePage: React.FC = () => {
  const isDesktop = useMediaQuery("(min-width:1200px)");
const {t}=useTranslation();
  const Sidebar = () => (
    <aside className={styles.addRecipePage__sidebar}>
      <SubTitle title={t("followUs")} />
      <FollowUs />
      <PopularRecipe />
    </aside>
  );
  return (
    <main className={styles.addRecipePage}>
      <Header />
      <div className={`${styles.addRecipePage__container} ${styles.flex}`}>
        <MainTitle title={t("add_recipe")} />
        <div className={styles.addRecipePage__content}>
          <AddRecipeForm />
          {isDesktop && <Sidebar />}
          {!isDesktop && <PopularRecipe />}
        </div>
      </div>
    </main>
  );
};

export default AddRecipePage;
