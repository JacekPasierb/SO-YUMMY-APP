import React from "react";
import Header from "../../components/Header/Header";
import MainTitle from "../../components/MainTitle/PageTitle";
import styles from "./ShoppingListPage.module.css";

const ShoppingListPage = () => {
  return (
    <>
      <Header />
      <div className={styles.shoppingListPage}>
        <MainTitle title="Shopping list" />
      </div>
    </>
  );
};

export default ShoppingListPage;
