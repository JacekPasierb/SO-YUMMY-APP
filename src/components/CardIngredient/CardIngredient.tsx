import React, { useEffect, useState, useCallback } from "react";
import { Checkbox } from "@mui/material";
import axios from "axios";
import styles from "./CardIngredient.module.css";

interface Ingredient {
  _id: string;
  thb: string;
  ttl: string;
  measure: string;
}

interface CardIngredientProps {
  ingredient: Ingredient;
  recipeId?: string;
}

const CardIngredient: React.FC<CardIngredientProps> = ({ ingredient, recipeId }) => {
  const [isChecked, setIsChecked] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleApiError = useCallback((error: unknown, action: string) => {
    console.error(`Błąd podczas ${action} składnika:`, error);
  }, []);

  const checkIfIngredientInList = useCallback(async () => {
    try {
      const response = await axios.get("/api/shopping-list");
      const { items } = response.data;
      const ingredientExists = items.some((item: { ingredientId: string }) => item.ingredientId === ingredient._id);
      setIsChecked(ingredientExists);
    } catch (error) {
      handleApiError(error, "sprawdzania listy zakupów");
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
          data: { ingredientId: ingredient._id, recipeId },
        });
      } else {
        await axios.post("/api/shopping-list/add", {
          ingredientId: ingredient._id,
          thb: ingredient.thb,
          name: ingredient.ttl,
          measure: ingredient.measure,
          recipeId,
        });
      }
      setIsChecked(!isChecked);
    } catch (error) {
      handleApiError(error, isChecked ? "usuwania" : "dodawania");
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
          alt={ingredient.ttl}
          className={styles.ingredientCard__image}
        />
        <p className={styles.ingredientCard__name}>{ingredient.ttl}</p>
      </div>
      <div className={styles.ingredientCard__details}>
        <div className={styles.ingredientCard__measureBox}>
          <p className={styles.ingredientCard__measureText}>{ingredient.measure}</p>
        </div>
        <Checkbox
          checked={isChecked}
          onChange={handleCheckboxChange}
          sx={{
            color: "#7E7E7E",
            "&.Mui-checked": {
              color: "transparent",
              stroke: "#7E7E7E",
            },
            ".MuiSvgIcon-fontSizeMedium": {
              width: "18px",
              height: "18px",
            },
            "@media (min-width: 768px)": {
              ".MuiSvgIcon-fontSizeMedium": {
                width: "35px",
                height: "35px",
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default CardIngredient;
