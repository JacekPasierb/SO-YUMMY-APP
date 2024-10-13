import React from "react";
import Header from "../../components/Header/Header";
import MainTitle from "../../components/MainTitle/PageTitle";
import sprite from "../../assets/icons/sprite.svg";
import styles from "./NotFoundPage.module.css";

const NotFoundPage = () => {
  return (
    <>
      <Header />
      <div className={styles.container}>
        <MainTitle title="" />
        <svg className={styles.icon}>
          <use href={`${sprite}#icon-not-found`}></use>
        </svg>
      </div>
    </>
  );
};

export default NotFoundPage;
