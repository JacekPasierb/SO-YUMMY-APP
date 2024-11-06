import React from "react";
import Header from "../../components/Header/Header";
import MainTitle from "../../components/MainTitle/PageTitle";
import IngredientsShoppingList from "../../components/IngredientsShoppingList/IngredientsShoppingList";
import styles from "./ShoppingListPage.module.css";

const ShoppingListPage: React.FC = () => {
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
