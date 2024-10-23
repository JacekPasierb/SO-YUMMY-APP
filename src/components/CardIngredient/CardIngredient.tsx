import { Checkbox } from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import { Ingredient } from "../RecipeInngredientsList/RecipeInngredientsList";
import styles from "./CardIngredient.module.css";
import axios from "axios";

interface CardIngredientProps {
  ingredient: Ingredient;
  recipeId?: string;
}

const CardIngredient: React.FC<CardIngredientProps> = ({
  ingredient,
  recipeId,
}) => {
  const [isChecked, setIsChecked] = useState(false);

  const checkIfIngredientInList = async () => {
    try {
      const response = await axios.get(`/api/shopping-list`);
      const { items } = response.data;

      const ingredientExists = items.some(
        (item: any) => item.ingredientId === ingredient._id
      );

      setIsChecked(ingredientExists);
    } catch (error) {
      console.error("Błąd sprawdzania listy zakupów:", error);
    }
  };

  useEffect(() => {
    checkIfIngredientInList();
  }, []);

  const handleCheckboxChange = async () => {
    if (isChecked) {
      try {
        await axios.delete("/api/shopping-list/remove", {
          data: { ingredientId: ingredient._id, recipeId },
        });
        setIsChecked(false);
      } catch (error) {
        console.error("Błąd usuwania składnika:", error);
      }
    } else {
      try {
        await axios.post("/api/shopping-list/add", {
          ingredientId: ingredient._id,
          thb: ingredient.thb,
          name: ingredient.ttl,
          measure: ingredient.measure,
          recipeId,
        });

        setIsChecked(true); // Zaktualizuj stan checkboxa na zaznaczony
      } catch (error) {
        console.error("Błąd dodawania składnika:", error);
      }
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
          <p className={styles.ingredientCard__measureText}>
            {ingredient.measure}
          </p>
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
