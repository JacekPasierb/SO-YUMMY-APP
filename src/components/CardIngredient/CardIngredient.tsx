import React, {useEffect, useState, useCallback} from "react";
import {Checkbox} from "@mui/material";
import axios from "axios";
import styles from "./CardIngredient.module.css";
import {useTranslation} from "react-i18next";

interface Ingredient {
  _id: string;
  thb: string;
  ttl: string;
  ttlPl?: string;
  measure: string;
}

interface CardIngredientProps {
  ingredient: Ingredient;
  recipeId?: string;
}

const CardIngredient: React.FC<CardIngredientProps> = ({
  ingredient,
  recipeId,
}) => {
  const [isChecked, setIsChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const {i18n} = useTranslation();
  const currentLanguage = i18n.language;
  const ingredientName =
    currentLanguage === "pl"
      ? ingredient.ttlPl || ingredient.ttl
      : ingredient.ttl;

  const handleApiError = useCallback((error: unknown, action: string) => {
    console.error(`Error while ${action} ingredient:`, error);
  }, []);

  const checkIfIngredientInList = useCallback(async () => {
    try {
      const response = await axios.get("/api/shopping-list");
      const {items} = response.data;
      const ingredientExists = items.some(
        (item: {ingredientId: string}) => item.ingredientId === ingredient._id
      );
      setIsChecked(ingredientExists);
    } catch (error) {
      handleApiError(error, "checking shopping list");
    }
  }, [ingredient._id, handleApiError]);

  useEffect(() => {
    checkIfIngredientInList();
  }, [checkIfIngredientInList]);

  const handleCheckboxChange = async () => {
    if (loading) return;
    setLoading(true);

    try {
      if (isChecked) {
        await axios.delete("/api/shopping-list/remove", {
          data: {ingredientId: ingredient._id, recipeId},
        });
      } else {
        await axios.post("/api/shopping-list/add", {
          ingredientId: ingredient._id,
          thb: ingredient.thb,
          name: ingredientName,
          measure: ingredient.measure,
          recipeId,
        });
      }
      setIsChecked(!isChecked);
    } catch (error) {
      handleApiError(error, isChecked ? "removing" : "adding");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.ingredientCard}>
      <div className={styles.ingredientCard__details}>
        <img
          src={ingredient.thb}
          width="65"
          height="65"
          alt={ingredientName}
          className={styles.ingredientCard__image}
          loading="lazy"
        />
        <p className={styles.ingredientCard__name}>{ingredientName}</p>
      </div>
      <div className={styles.ingredientCard__actions}>
        <div className={styles.ingredientCard__measureBox}>
          <p className={styles.ingredientCard__measureText}>
            {ingredient.measure}
          </p>
        </div>
        <Checkbox
          checked={isChecked}
          onChange={handleCheckboxChange}
          disabled={loading}
          aria-label={`Add ${ingredientName} to shopping list`}
          sx={{
            color: "#7E7E7E",
            padding: {xs: "4px", md: "8px"},
            "&.Mui-checked": {
              color: "transparent",
              stroke: "#7E7E7E",
            },
            "& .MuiSvgIcon-root": {
              width: {xs: "18px", md: "35px"},
              height: {xs: "18px", md: "35px"},
            },
          }}
        />
      </div>
    </div>
  );
};

export default CardIngredient;
