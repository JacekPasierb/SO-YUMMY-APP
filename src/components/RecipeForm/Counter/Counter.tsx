import React, {FC} from "react";
import {nanoid} from "@reduxjs/toolkit";
import sprite from "../../../assets/icons/sprite.svg";

import styles from "./Counter.module.css";

import {Ingredient, IngredientCreate} from "../../../types/ingredientsTypes";
import { getUnitOptions } from "../../../data/UnitOptions";
import { useTranslation } from "react-i18next";

type Props = {
  ingredients: IngredientCreate[];
  updateField: (field: "ingredients", value: IngredientCreate[]) => void;
};

const Counter: FC<Props> = ({ingredients, updateField}) => {
  const {t} = useTranslation();
  const unitOptions = getUnitOptions(t);
  const dec = () => {
    if (ingredients.length > 0) {
      updateField("ingredients", ingredients.slice(0, -1));
    }
  };

  const inc = () => {
    updateField("ingredients", [
      ...ingredients,
      {
        id: nanoid(),
        name: "",
        amount: 0,
        unit: unitOptions[0].value,
      },
    ]);
  };

  return (
    <div
      className={styles.counter}
      role="group"
      aria-label="Ingredient counter"
    >
      <button
        type="button"
        onClick={() => dec()}
        aria-label="Remove ingredient"
        disabled={ingredients.length === 0}
        className={styles.recipeIngredients__btn}
      >
        <svg className={styles.iconMinus} aria-hidden="true">
          <use href={`${sprite}#icon-Minus`} />
        </svg>
      </button>
      <span
        className={styles.recipeIngredients__counterFont}
        aria-live="polite"
      >
        {ingredients.length}
      </span>
      <button
        type="button"
        onClick={() => inc()}
        aria-label="Add ingredient"
        className={styles.recipeIngredients__btn}
      >
        <svg className={styles.icon} aria-hidden="true">
          <use href={`${sprite}#icon-Plus`} />
        </svg>
      </button>
    </div>
  );
};

export default Counter;
