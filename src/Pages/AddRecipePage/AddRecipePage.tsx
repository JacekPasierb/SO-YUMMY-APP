import css from "./AddRecipePage.module.css";

import React from "react";

import Header from "../../components/Header/Header";
import MainTitle from "../../components/MainTitle/PageTitle";
import AddRecipeForm from "../../components/AddRecipeForm/AddRecipeForm";
import PopularRecipe from "../../components/PopularRecipe/PopularRecipe";
import { useMediaQuery } from "@react-hook/media-query";
import FollowUs from "../../components/Footer/FollowUs/FollowUs";
import SubTitle from "../../components/SubTitle/SubTitle";
// import FollowUs from "../../components/FollowUs/FollowUs";

const AddRecipePage = () => {
  const isDesctop = useMediaQuery("(min-width:1200px)");
  return (
    <>
      <main className={css.background}>
        <Header />
        <div className={`${css.container} ${css.flex}`}>
          <MainTitle title={"Add recipe"} />
          <div className={css.flexPage}>
            {isDesctop ? (
              <>
                <AddRecipeForm />
                <div className={css.margin}>
                  <SubTitle title={"Follow Us"} /> <FollowUs />{" "}
                  <PopularRecipe />
                </div>
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
