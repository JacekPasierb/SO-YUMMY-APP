import React from "react";
import Header from "../../components/Header/Header";
import MainTitle from "../../components/MainTitle/PageTitle";
import IngredientsShoppingList from "../../components/IngredientsShoppingList/IngredientsShoppingList";
import styles from "./ShoppingListPage.module.css";
import {useTranslation} from "react-i18next";
import {Helmet} from "react-helmet-async";

const ShoppingListPage: React.FC = () => {
  const {t} = useTranslation();
  return (
    <>
      <Helmet>
        <title>{t("titles.shoppingList")}</title>
      </Helmet>
      <Header />
      <div className={styles.shoppingListPage}>
        <MainTitle title={t("shopping_list")} />
        <IngredientsShoppingList />
      </div>
    </>
  );
};

export default ShoppingListPage;
