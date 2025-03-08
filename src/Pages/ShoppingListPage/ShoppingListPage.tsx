import React from "react";
import Header from "../../components/Header/Header";
import MainTitle from "../../components/MainTitle/PageTitle";
import IngredientsShoppingList from "../../components/IngredientsShoppingList/IngredientsShoppingList";
import styles from "./ShoppingListPage.module.css";
import { useTranslation } from "react-i18next";

const ShoppingListPage: React.FC = () => {
  const {t}=useTranslation();
  return (
    <>
      <Header />
      <div className={styles.shoppingListPage}>
        <MainTitle title={t("shopping_list")} />
        <IngredientsShoppingList/>
      </div>
    </>
  );
};

export default ShoppingListPage;
