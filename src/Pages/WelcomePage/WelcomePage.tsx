import React from "react";
import logo from "../../images/logo.png";
import AuthNav from "../../components/AuthNav/AuthNav";
import styles from "./WelcomePage.module.css";
import sprite from "../../assets/icons/sprite.svg";
import {useTranslation} from "react-i18next";
import LanguageSwitcher from "../../components/LanguageSwitcher/LanguageSwitcher";
import { Helmet } from "react-helmet-async";

const WelcomePage: React.FC = () => {
  const { t, i18n } = useTranslation();

  return (
    <>
 
      <div className={styles.welcomePage}>
        <div className={styles.welcomePage__container}>
          <div style={{position: "absolute", top: "0", left: "0"}}>
            <LanguageSwitcher />
          </div>
          <svg width="54px" height="54px" className={styles.welcomePage__logo}>
            <use href={`${sprite}#icon-logo`}></use>
          </svg>

          <div className={styles.welcomePage__section}>
            <div className={styles.welcomePage__text}>
              <h1 className={styles.welcomePage__title}>{t("welcomeTitle")}</h1>
              <p className={styles.welcomePage__description}>
                {t("welcomeDescription")}
              </p>
            </div>
            <AuthNav />
          </div>
        </div>
      </div>
    </>
  );
};

export default WelcomePage;
