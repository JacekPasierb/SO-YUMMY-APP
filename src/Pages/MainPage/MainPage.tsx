import css from "./MainPage.module.css";

import React, { FC } from "react";
import Media from "react-media";

import Header from "../../components/Header/Header";
import Search from "../../components/Search/Search";
import ChooseYourBreakfast from "../../components/ChooseYourBreakfast/ChooseYourBreakfast";
import PreviewsCategories from "../../components/PreviewCategories/PreviewsCategories";
import ButtonOtherCategories from "../../components/ButtonOtherCategories/ButtonOtherCategories";
import AppTitle from "../../components/AppTitle/AppTitle";
import AppDescription from "../../components/AppDescription/AppDescription";

const MainPage: FC = () => {
  return (
    <Media
      queries={{
        small: "(max-width: 768px)",
        medium: "(min-width: 768px) and (max-width: 1200px)",
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
                  <AppTitle />
                  <AppDescription />
                  <ChooseYourBreakfast />
                  <Search />
                </div>
              </main>
              <div className={`${css.container} ${css.sectionBox}`}>
                <PreviewsCategories />
                <ButtonOtherCategories text={"Other categories"} />
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
                      <AppTitle />
                      <AppDescription />
                      <Search />
                    </div>
                    <ChooseYourBreakfast />
                  </div>
                </div>
              </main>
              <div className={`${css.container} ${css.sectionBox}`}>
                <PreviewsCategories />
                <ButtonOtherCategories text={"Other categories"} />
              </div>
            </>
          )}
          {matches.large && (
            <>
              <main className={css.background}>
                <Header />
                <div className={`${css.container} ${css.mainPageBox}`}>
                  <div className={css.flexMed}>
                    <div>
                      <AppTitle />
                      <AppDescription />
                      <Search />
                    </div>
                    <ChooseYourBreakfast />
                  </div>
                </div>
              </main>
              <div className={`${css.container} ${css.mainPageBox}`}>
                <PreviewsCategories />
                <ButtonOtherCategories text={"Other categories"} />
              </div>
            </>
          )}
        </>
      )}
    </Media>
  );
};

export default MainPage;
