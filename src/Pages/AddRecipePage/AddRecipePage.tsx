import React from "react";
import Header from "../../components/Header/Header.jsx";
import css from "./AddRecipePage.module.css";
import MainTitle from "../../components/MainTitle/MainTitle.jsx";
import AddRecipeForm from "../../components/AddRecipeForm/AddRecipeForm.jsx";
import FollowUs from "../../components/FollowUs/FollowUs.jsx";
import PopularRecipe from "../../components/PopularRecipe/PopularRecipe.jsx";

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
