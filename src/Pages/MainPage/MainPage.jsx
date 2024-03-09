import React from "react";
import css from "./MainPage.module.css";
import Search from "../../components/Search/Search";
import ChooseYourBreakfast from "../../components/ChooseYourBreakfast/ChooseYourBreakfast";
import Media from "react-media";
import PreviewsCategories from "../../components/PreviewCategories/PreviewsCategories";
import Header from "../../components/Header/Header";
import Button from "../../components/Button/Button";

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
            <>
              <Header />
              <main className={css.background}>
                <div className={`${css.container} ${css.mainPageBox}`}>
                  <h1 className={css.appTitle}>
                    <span className={css.titleInnerColor}>So</span>Yummy
                  </h1>
                  <p className={css.appDescription}>
                    "What to cook?" is not only a recipe app, it is, in fact,
                    your cookbook. You can add your own recipes to save them for
                    the future.
                  </p>
                  <ChooseYourBreakfast />
                  <Search />
                </div>
              </main>
              <div className={`${css.container} ${css.sectionBox}`}>
                <PreviewsCategories />
                <Button text={"Other categories"} />
              </div>
            </>
          )}
          {matches.medium && (
            <>
              <main className={css.background}>
                <Header />
                <div className={`${css.container} ${css.mainPageBox}`}>
                  <div className={css.flexMed}>
                    <div>
                      <h1 className={css.appTitle}>
                        <span className={css.titleInnerColor}>So</span>Yummy
                      </h1>
                      <p className={css.appDescription}>
                        "What to cook?" is not only a recipe app, it is, in
                        fact, your cookbook. You can add your own recipes to
                        save them for the future.
                      </p>

                      <Search />
                    </div>
                    <ChooseYourBreakfast />
                  </div>
                </div>
              </main>
              <div className={`${css.container} ${css.sectionBox}`}>
                <PreviewsCategories />
                <Button text={"Other categories"} />
              </div>
            </>
          )}
          {matches.large && (
            <>
              <main className={css.background}>
                <Header />
                <div className={`${css.container} ${css.mainPageBox}`}>
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
              </main>
              <div className={`${css.container} ${css.mainPageBox}`}>
                
                <PreviewsCategories />
                <Button text={"Other categories"} />
              </div>
            </>
          )}
        </>
      )}
    </Media>
  );
};

export default MainPage;
