import React from "react";
import Header from "../../components/Header/Header";
import css from "./AddRecipePage.module.css";
import MainTitle from "../../components/MainTitle/MainTitle.jsx";

const AddRecipePage = () => {
  return (
    <>
      <Header />
      <main className={css.background}>
        <div className={`${css.container} ${css.flex}`}>
          <MainTitle title={"Add recipe"} />
        </div>
      </main>
    </>
  );
};

export default AddRecipePage;
