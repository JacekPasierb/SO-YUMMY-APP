import React, { FC } from "react";
import Media from "react-media";
import Header from "../../components/Header/Header";
import Search from "../../components/Search/Search";
import ChooseYourBreakfast from "../../components/ChooseYourBreakfast/ChooseYourBreakfast";
import PreviewsCategories from "../../components/PreviewCategories/PreviewsCategories";
import ButtonOtherCategories from "../../components/ButtonOtherCategories/ButtonOtherCategories";
import AppTitle from "../../components/AppTitle/AppTitle";
import AppDescription from "../../components/AppDescription/AppDescription";

// Importing CSS module
import styles from "./MainPage.module.css";

// Typing for media queries results
interface MediaQueries {
  small: boolean;
  medium: boolean;
  large: boolean;
}

const MainPage: FC = () => {
  const renderContent = (matches: MediaQueries) => (
    <>
      <Header />
      <main className={styles.background}>
        <div className={`${styles.container} ${styles.mainPageBox} `}>
          {/* For medium and large screens, apply flex layout */}
          <div className={matches.small ? "" : styles.flexLayout}>
            <div>
              <AppTitle />
              <AppDescription />
              <Search />
            </div>
            {/* On small screens, render ChooseYourBreakfast within this div */}
            {!matches.small && <ChooseYourBreakfast />}
          </div>
          {/* On larger screens, render ChooseYourBreakfast outside of the flex container */}
          {matches.small && <ChooseYourBreakfast />}
        </div>
      </main>
      {/* Adjust container classes based on screen size */}
      <div
        className={`${styles.container} ${
          matches.large ? styles.mainPageBox : styles.sectionBox
        }`}
      >
        <PreviewsCategories />
        <ButtonOtherCategories text="Other categories" />
      </div>
    </>
  );

  return (
    <Media
      queries={{
        small: "(max-width: 768px)",
        medium: "(min-width: 769px) and (max-width: 1200px)",
        large: "(min-width: 1200px)",
      }}
    >
      {(matches) => renderContent(matches)}
    </Media>
  );
};

export default MainPage;
