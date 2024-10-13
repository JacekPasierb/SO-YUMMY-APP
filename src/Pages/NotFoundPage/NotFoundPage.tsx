import React from "react";
import Header from "../../components/Header/Header";
import MainTitle from "../../components/MainTitle/PageTitle";
import sprite from "../../assets/icons/sprite.svg";

const NotFoundPage = () => {
  return (
    <>
      <Header />
      <MainTitle title="" />
      <svg>
        <use href={`${sprite}#icon-not-found`}></use>
      </svg>
    </>
  );
};

export default NotFoundPage;
