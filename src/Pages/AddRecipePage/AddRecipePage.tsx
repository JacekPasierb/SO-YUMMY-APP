import React from "react";
import Header from "../../components/Header/Header";
import css from "./AddRecipePage.module.css";
import MainTitle from "../../components/MainTitle/MainTitle";
import AddRecipeForm from "../../components/AddRecipeForm/AddRecipeForm";
import FollowUs from "../../components/FollowUs/FollowUs";
import PopularRecipe from "../../components/PopularRecipe/PopularRecipe";

const AddRecipePage = () => {
  return (
    <>
      <main className={css.background}>
        <Header />
        <div className={`${css.container} ${css.flex}`}>
          <MainTitle title={"Add recipe"} />
          <AddRecipeForm />
          <PopularRecipe />
        </div>
      </main>
    </>
  );
};

export default AddRecipePage;
