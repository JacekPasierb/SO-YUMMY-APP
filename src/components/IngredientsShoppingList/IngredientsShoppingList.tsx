import React, {lazy, useEffect, useState} from "react";
import {nanoid} from "nanoid";
import axios from "axios";
import styles from "./IngredientsShoppingList.module.css";
import {toast} from "react-toastify";
import {Loader} from "../Loader/Loader";
import {ClimbingBoxLoader} from "react-spinners";
import {useTranslation} from "react-i18next";
const CardIngredientShoppingList = lazy(
  () => import("../CardIngredientShoppingList/CardIngredientShoppingList")
);

export interface Ingredient {
  ingredientId: string;
  name: string;
  desc: string;
  thb: string;
  measure: string;
  recipeId: string;
}

const IngredientsShoppingList: React.FC = () => {
  const [shoppingList, setShoppingList] = useState<Ingredient[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const {t} = useTranslation();
  const fetchShoppingList = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await axios.get<{items: Ingredient[]}>(
        "/api/shopping-list"
      );

      setShoppingList(response.data.items);
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to fetch shopping list";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchShoppingList();
  }, []);

  if (isLoading) {
    return <ClimbingBoxLoader />;
  }

  if (error) {
    return <div className={styles.shoppingList__error}>{error}</div>;
  }

  return (
    <div className={styles.shoppingList__box}>
      <div className={styles.shoppingList__header}>
        <h2 className={styles.shoppingList__title}>{t("product")}</h2>
        <div className={styles.shoppingList__flexWrapper}>
          <h3 className={styles.shoppingList__title}>{t("number")}</h3>
          <h3 className={styles.shoppingList__title}>{t("remove")}</h3>
        </div>
      </div>

      {shoppingList.length === 0 ? (
        <p className={styles.shoppingList__empty}>{t("EmptyList")}</p>
      ) : (
        <ul className={styles.shoppingList}>
          {shoppingList.map((ingredient) => (
            <li
              key={`${ingredient.ingredientId}-${nanoid()}`}
              className={styles.ingredientsList__item}
            >
              <CardIngredientShoppingList
                ingredient={ingredient}
                refreshList={fetchShoppingList}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default IngredientsShoppingList;
