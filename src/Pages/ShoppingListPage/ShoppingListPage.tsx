import React from "react";
import Header from "../../components/Header/Header";
import MainTitle from "../../components/MainTitle/PageTitle";
import styles from "./ShoppingListPage.module.css";
import IngredientsShoppingList from "../../components/IngredientsShoppingList/IngredientsShoppingList";

const ShoppingListPage = () => {
  return (
    <>
      <Header />
      <div className={styles.shoppingListPage}>
        <MainTitle title="Shopping list" />
        <IngredientsShoppingList/>
      </div>
    </>
  );
};

export default ShoppingListPage;
