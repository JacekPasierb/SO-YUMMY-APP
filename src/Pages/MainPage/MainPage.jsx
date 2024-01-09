import React from "react";
import css from "./MainPage.module.css";
import Search from "../../components/Search/Search";
import ChooseYourBreakfast from "../../components/ChooseYourBreakfast/ChooseYourBreakfast";

const MainPage = () => {
  return (
    <main>
      <div className={`${css.container} ${css.flex}`}>
        <h1 className={css.title}>
          <span className={css.titleInnerColor}>So</span>Yummy
        </h1>
        <p className={css.description}>
          "What to cook?" is not only a recipe app, it is, in fact, your
          cookbook. You can add your own recipes to save them for the future.
        </p>
        <ChooseYourBreakfast/>
        <Search/>
      </div>
    </main>
  );
};

export default MainPage;
