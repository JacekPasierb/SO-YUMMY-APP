import css from "./AddRecipePage.module.css";

import React from "react";

import Header from "../../components/Header/Header";
import MainTitle from "../../components/MainTitle/MainTitle";
import AddRecipeForm from "../../components/AddRecipeForm/AddRecipeForm";
import PopularRecipe from "../../components/PopularRecipe/PopularRecipe";

const AddRecipePage = () => {
  return (
    <>
      <main className={css.background}>
        <Header />
        <div className={`${css.container} ${css.flex}`}>
          <MainTitle title={"Add recipe"} />
          <div className={css.flexPage}>
            <AddRecipeForm />
            <PopularRecipe />
          </div>
        </div>
      </main>
    </>
  );
};

export default AddRecipePage;
