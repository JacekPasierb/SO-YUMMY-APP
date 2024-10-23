import { Checkbox } from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import { Ingredient } from "../RecipeInngredientsList/RecipeInngredientsList";
import styles from "./CardIngredient.module.css";
import axios from "axios";

interface CardIngredientProps {
  ingredient: Ingredient;
  recipeId?:string;
}

const CardIngredient: React.FC<CardIngredientProps> = ({ ingredient , recipeId}) => {
  const [isChecked, setIsChecked] = useState(false);

  const checkIfIngredientInList = async () => {
    try {
      console.log("dd1");
      const response = await axios.get(`/api/shopping-list/${recipeId}`);
      console.log("dd2");
      const { items } = response.data;
console.log("dd",items);

      // Sprawdzamy, czy składnik jest już na liście zakupów
      const ingredientExists = items.some((item: any) => item.ingredientId === ingredient._id);
      setIsChecked(ingredientExists);
    } catch (error) {
      console.error("Błąd sprawdzania listy zakupów:", error);
    }
  };

  // Pobieramy dane po załadowaniu komponentu
  useEffect(() => {
    checkIfIngredientInList();
  }, []);

console.log("rrrr",recipeId);

  const handleCheckboxChange = async () => {
    if (isChecked) {
      // Jeśli checkbox był zaznaczony, usuń składnik z listy zakupów
      try {
        await axios.delete("/api/shopping-list/remove", {
          data: { ingredientId: ingredient._id, recipeId } // Przekazanie obu parametrów
        });
        setIsChecked(false); // Zaktualizuj stan checkboxa na odznaczony
      } catch (error) {
        console.error("Błąd usuwania składnika:", error);
      }
    } else {
      // Jeśli checkbox był odznaczony, dodaj składnik do listy zakupów
      try {
        console.log("1");
        
        await axios.post("/api/shopping-list/add", {
          ingredientId: ingredient._id,
          thb:ingredient.thb,
          name: ingredient.ttl,
          measure: ingredient.measure,
          recipeId
        });
        console.log("2");
        
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
