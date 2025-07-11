import React, {FC} from "react";
import styles from "./IngredientsList.module.css";
import useRecipeForm from "../../../hooks/useRecipeForm";
import Select from "react-select";
import {useTranslation} from "react-i18next";
import {selectIngredient} from "../../RecipeIngredientsFields/selectStyles";
import {IngredientCreate} from "../../../types/ingredientsTypes";
import AmountWithUnit from "../AmountWithUnit/AmountWithUnit";
import sprite from "../../../assets/icons/sprite.svg";
import {getUnitOptions} from "../../../data/UnitOptions";

type Props = {
  ingredients: IngredientCreate[];
  updateField: (field: "ingredients", value: IngredientCreate[]) => void;
};

const IngredientsList: FC<Props> = ({ingredients, updateField}) => {
  const {ingredientsAll} = useRecipeForm();

  const {t, i18n} = useTranslation();
  const currentLanguage = i18n.language;
  const unitOptions = getUnitOptions(t);

  const options = ingredientsAll.map((item) => ({
    id: item._id,
    value: currentLanguage === "pl-PL" ? item.ttlPl : item.ttl,
    label: currentLanguage === "pl-PL" ? item.ttlPl : item.ttl,
  }));

  const handleSelectChange = (index: number, value: string) => {
    const updated = [...ingredients];
    updated[index].name = value;
    updateField("ingredients", updated);
  };

  const handleAmountChange = (index: number, value: string) => {
    const updated = [...ingredients];
    updated[index].amount = Number(value);
    updateField("ingredients", updated);
  };

  const handleUnitChange = (index: number, value: string) => {
    const updated = [...ingredients];
    updated[index].unit = value;
    updateField("ingredients", updated);
  };

  const removeIngredient = (fieldId: string) => {
    const updated = ingredients.filter(
      (ingredient) => ingredient.id !== fieldId
    );
    updateField("ingredients", updated);
  };

  return (
    <div>
      {ingredients.length > 0 && (
        <ul
          className={styles.recipeIngredients__list}
          aria-label="Ingredients list"
        >
          {ingredients.map((item, index) => (
            <li key={item.id} className={styles.recipeIngredients__item}>
              <Select
                options={options}
                value={options.find((opt) => opt.value === item.name)}
                onChange={(selected) =>
                  handleSelectChange(index, selected?.value || "")
                }
                placeholder={t("selectIngredient")}
                styles={selectIngredient}
                isSearchable
                className={styles.recipeIngredients__select}
              />

              <div className={styles.container}>
                <AmountWithUnit
                  amount={item.amount}
                  unit={item.unit}
                  onAmountChange={(val) => handleAmountChange(index, val)}
                  onUnitChange={(val) => handleUnitChange(index, val)}
                  options={unitOptions}
                />
              </div>
              <button
                type="button"
                className={styles.recipeIngredients__btnX}
                onClick={() => removeIngredient(item.id)}
                aria-label={`Remove ingredient ${index + 1}`}
              >
                <svg className={styles.iconX} aria-hidden="true">
                  <use href={`${sprite}#icon-X`} />
                </svg>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default IngredientsList;
