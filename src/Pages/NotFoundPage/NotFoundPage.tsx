import React from "react";
import Header from "../../components/Header/Header";
import MainTitle from "../../components/MainTitle/PageTitle";
import sprite from "../../assets/icons/sprite.svg";
import styles from "./NotFoundPage.module.css";

const NotFoundPage:React.FC = () => {
  return (
    <>
      <Header />
      <div className={styles.notFoundPage}>
        <MainTitle title="" />
        <div
          className={styles.notFoundPage__iconWrapper}
          role="img"
          aria-label="Not found illustration"
        >
          <svg className={styles.notFoundPage__icon}>
            <use href={`${sprite}#icon-not-found`}></use>
          </svg>
        </div>
        <div className={styles.notFoundPage__messageWrapper}>
          <p className={styles.notFoundPage__message}>We are sorry,</p>
          <p className={styles.notFoundPage__subMessage}>
            but the page you were looking for can’t be found.
          </p>
        </div>
      </div>
    </>
  );
};

export default NotFoundPage;
