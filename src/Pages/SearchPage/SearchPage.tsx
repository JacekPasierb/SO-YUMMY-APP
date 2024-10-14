import React from "react";
import Header from "../../components/Header/Header";
import MainTitle from "../../components/MainTitle/PageTitle";
import styles from "./SearchPage.module.css";
import Search from "../../components/Search/Search";

const SearchPage = () => {
  return (
    <>
      <Header />
      <div className={styles.searchPage__container}>
        <MainTitle title="Search" />
        <Search/>
      </div>
    </>
  );
};

export default SearchPage;
