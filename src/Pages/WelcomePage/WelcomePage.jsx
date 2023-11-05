import React from "react";
import AuthNav from "../../components/AuthNav/AuthNav";
import sprite from "../../assets/icons/sprite.svg";
import css from "./WelcomePage.module.css";

const WelcomePage = () => {
     const screenWidth = window.innerWidth;
  return (
    <div className={css.background}>
      <div className={css.boxContainer}>
        {screenWidth <= 768 ? (
          <svg className={css.iconLogo}>
            <use href={sprite + `#icon-logo`}></use>
          </svg>
        ) : (
          <svg className={css.iconLogo}>
            <use href={sprite + `#icon-logoTablet`}></use>
          </svg>
        )}
        <div className={css.boxSection}>
          <div className={css.boxText}>
            <h1 className={css.title}>Welcome to the app!</h1>
            <p className={css.description}>
              This app offers more than just a collection of recipes - it is
              designed to be your very own digital cookbook. You can easily save
              and retrieve your own recipes at any time.
            </p>
          </div>
          <AuthNav />
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
