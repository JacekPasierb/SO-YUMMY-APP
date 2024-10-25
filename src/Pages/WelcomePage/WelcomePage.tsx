import React from "react";
import styles from "./WelcomePage.module.css";
import logo from "../../images/logo.png";
import AuthNav from "../../components/AuthNav/AuthNav";

const WelcomePage: React.FC = () => {
  return (
    <div className={styles.welcomePage}>
      <div className={styles.welcomePage__container}>
        <img src={logo} alt="logo" className={styles.welcomePage__logo} />
        <div className={styles.welcomePage__section}>
          <div className={styles.welcomePage__text}>
            <h1 className={styles.welcomePage__title}>Welcome to the app!</h1>
            <p className={styles.welcomePage__description}>
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
