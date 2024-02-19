import React from "react";
import css from "./MainPage.module.css";
import Search from "../../components/Search/Search";
import ChooseYourBreakfast from "../../components/ChooseYourBreakfast/ChooseYourBreakfast";
import Media from "react-media";
import PreviewsCategories from "../../components/PreviewCategories/PreviewsCategories";

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
              <div className={`${css.container} ${css.flex}`}>
                <h1 className={css.title}>
                  <span className={css.titleInnerColor}>So</span>Yummy
                </h1>
                <p className={css.description}>
                  "What to cook?" is not only a recipe app, it is, in fact, your
                  cookbook. You can add your own recipes to save them for the
                  future.
                </p>
                <ChooseYourBreakfast />
                <Search />
                <PreviewsCategories/>
              </div>
            </main>
          )}
          {matches.medium && (
            <main className={css.background}>
              <div className={`${css.container} ${css.flex}`}>
                <div>
                  <h1 className={css.title}>
                    <span className={css.titleInnerColor}>So</span>Yummy
                  </h1>
                  <p className={css.description}>
                    "What to cook?" is not only a recipe app, it is, in fact,
                    your cookbook. You can add your own recipes to save them for
                    the future.
                  </p>

                  <Search />
                </div>
                <ChooseYourBreakfast />
                <PreviewsCategories/>
              </div>
            </main>
          )}
          {matches.large && (
            <main className={css.background}>
              <div className={`${css.container} ${css.flex}`}>
                <div>
                  <h1 className={css.title}>
                    <span className={css.titleInnerColor}>So</span>Yummy
                  </h1>
                  <p className={css.description}>
                    "What to cook?" is not only a recipe app, it is, in fact,
                    your cookbook. You can add your own recipes to save them for
                    the future.
                  </p>

                  <Search />
                </div>
                <ChooseYourBreakfast />
              </div>
            </main>
          )}
        </>
      )}
    </Media>
  );
};

export default MainPage;
