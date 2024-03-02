import React from "react";
import css from "./MainPage.module.css";
import Search from "../../components/Search/Search";
import ChooseYourBreakfast from "../../components/ChooseYourBreakfast/ChooseYourBreakfast";
import Media from "react-media";
import PreviewsCategories from "../../components/PreviewCategories/PreviewsCategories";
import Header from "../../components/Header/Header";

const MainPage = () => {
  return (
    <Media
      queries={{
        small: "(max-width: 767px)",
        medium: "(min-width: 768px) and (max-width: 1199px)",
        large: "(min-width: 1200px)",
      }}
    >
      {(matches) => (
        <>
          {matches.small && (
            <main className={css.background}>
              <Header />
              <div className={`${css.container} ${css.mainPageBox}`}>
                <h1 className={css.appTitle}>
                  <span className={css.titleInnerColor}>So</span>Yummy
                </h1>
                <p className={css.appDescription}>
                  "What to cook?" is not only a recipe app, it is, in fact, your
                  cookbook. You can add your own recipes to save them for the
                  future.
                </p>
                <ChooseYourBreakfast />
                <Search />
                <PreviewsCategories />
              </div>
            </main>
          )}
          {matches.medium && (
            <main className={css.background}>
              <Header />
              <div className={`${css.container} ${css.mainPageBox}`}>
                <div className={css.flexMed}>
                  <div>
                    <h1 className={css.appTitle}>
                      <span className={css.titleInnerColor}>So</span>Yummy
                    </h1>
                    <p className={css.appDescription}>
                      "What to cook?" is not only a recipe app, it is, in fact,
                      your cookbook. You can add your own recipes to save them
                      for the future.
                    </p>

                    <Search />
                  </div>
                  <ChooseYourBreakfast />
                </div>
                <PreviewsCategories />
              </div>
            </main>
          )}
          {matches.large && (
            <main className={css.background}>
              <Header />
              <div className={`${css.container} ${css.mainPageBox}`}>
                <div>
                  <h1 className={css.appTitle}>
                    <span className={css.titleInnerColor}>So</span>Yummy
                  </h1>
                  <p className={css.appDescription}>
                    "What to cook?" is not only a recipe app, it is, in fact,
                    your cookbook. You can add your own recipes to save them for
                    the future.
                  </p>

                  <Search />
                </div>
                <ChooseYourBreakfast />
                <PreviewsCategories />
              </div>
            </main>
          )}
        </>
      )}
    </Media>
  );
};

export default MainPage;
