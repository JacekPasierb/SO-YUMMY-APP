import styles from "./AddRecipePage.module.css";
import React from "react";
import Header from "../../components/Header/Header";
import MainTitle from "../../components/MainTitle/PageTitle";
import AddRecipeForm from "../../components/AddRecipeForm/AddRecipeForm";
import PopularRecipe from "../../components/PopularRecipe/PopularRecipe";
import { useMediaQuery } from "@react-hook/media-query";
import FollowUs from "../../components/Footer/FollowUs/FollowUs";
import SubTitle from "../../components/SubTitle/SubTitle";

const AddRecipePage = () => {
  const isDesktop = useMediaQuery("(min-width:1200px)");
  return (
    <>
      <main className={styles.addRecipePage}>
        <Header />
        <div className={`${styles.addRecipePage__container} ${styles.flex}`}>
          <MainTitle title={"Add recipe"} />
          <div className={styles.addRecipePage__content}>
            {isDesktop ? (
              <>
                <AddRecipeForm />
                <aside className={styles.addRecipePage__sidebar}>
                  <SubTitle title={"Follow Us"} /> <FollowUs />
                  <PopularRecipe />
                </aside>
              </>
            ) : (
              <>
                <AddRecipeForm /> <PopularRecipe />
              </>
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default AddRecipePage;
