import React from "react";
import logo from "../../images/logo.png";
import AuthNav from "../../components/AuthNav/AuthNav";
import styles from "./WelcomePage.module.css";
import sprite from "../../assets/icons/sprite.svg";
import { useTranslation } from "react-i18next";

const WelcomePage: React.FC = () => {
  const { t } = useTranslation(); 
  return (
    <div className={styles.welcomePage}>
      <div className={styles.welcomePage__container}>
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
  );
};

export default WelcomePage;
