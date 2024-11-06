import React from "react";
import Header from "../../components/Header/Header";
import MainTitle from "../../components/MainTitle/PageTitle";
import sprite from "../../assets/icons/sprite.svg";
import styles from "./NotFoundPage.module.css";

const NotFoundPage: React.FC = () => {
  return (
    <>
      <Header />
      <div className={styles.notFound__container}>
        <MainTitle title="" />
        <div
          className={styles.notFound__illustration}
          role="img"
          aria-label="Page not found illustration"
        >
          <svg className={styles.notFound__icon}>
            <use href={`${sprite}#icon-not-found`} />
          </svg>
        </div>
        <div className={styles.notFound__message}>
          <p className={styles.notFound__title}>We are sorry,</p>
          <p className={styles.notFound__text}>
            but the page you were looking for can’t be found.
          </p>
        </div>
      </div>
    </>
  );
};

export default NotFoundPage;
