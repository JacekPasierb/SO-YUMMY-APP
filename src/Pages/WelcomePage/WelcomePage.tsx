import css from "./WelcomePage.module.css";
import logo from "../../images/logo.png";

import React, { FC } from "react";

import AuthNav from "../../components/AuthNav/AuthNav";

const WelcomePage: FC = () => {
  return (
    <div className={css.background}>
      <div className={css.boxContainer}>
        <img src={logo} alt="logo" className={css.iconLogo} />

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
