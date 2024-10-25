import React, { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import styles from "./IngredientsShoppingList.module.css";
import axios from "axios";
import CardIngredient from "../CardIngredient/CardIngredient";

import CardIngredientShoppingList from "../CardIngredientShoppingList/CardIngredientShoppingList";

export interface Ingredient {
    ingredientId: string;
    name: string;
    desc: string;
    thb: string;
    measure: string;
    recipeId:string;
  }

const IngredientsShoppingList = () => {
  const [shoppingList, setShoppingList] = useState<Ingredient[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchShoppingList = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/api/shopping-list");
        const { items } = response.data;
        setShoppingList(items);
      } catch (error) {
        console.error("Błąd pobierania listy zakupów:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchShoppingList();
  }, []);

  return (
    <div className={` ${styles.shoppingList__box}`}>
      <div className={styles.shoppingList__header}>
        <p className={styles.shoppingList__title}>Product</p>
        <div className={styles.shoppingList__flexWrapper}>
          <p className={styles.shoppingList__title}>Number</p>
          <p className={styles.shoppingList__title}>Remove</p>
        </div>
      </div>
      <ul className={styles.shoppingList}>
        {shoppingList.map((ingredient) => (
        <li key={`${ingredient.ingredientId}-${nanoid()}`} className={styles.ingredientsList__item}>
          <CardIngredientShoppingList ingredient={ingredient}   refreshList={fetchShoppingList}/>
        </li>
      ))}
      </ul>
    </div>
  );
};

export default IngredientsShoppingList;
