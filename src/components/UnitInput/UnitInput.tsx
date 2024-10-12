import React, { FC, useEffect, useState } from "react";
import styles from "./UnitInput.module.css";
import Select, { SingleValue } from "react-select";
import { selectUnit } from "../RecipeIngredientsFields/selectStyles";
import { Option, UnitInputProps } from "../../types/ingredientsTypes";

const UnitInput: FC<UnitInputProps> = ({
  ingredients,
  setIngredients,
  index,
}) => {
  const options: Option[] = [
    { label: "tbs", value: "tbs" },
    { label: "tsp", value: "tsp" },
    { label: "kg", value: "kg" },
    { label: "g", value: "g" },
  ];
  const [unit, setUnit] = useState<string>(options[0].value);
  const [numUnit, setNumUnit] = useState<number>(0);

  const handleUnit = (selectedOption: SingleValue<Option>) => {
    if (selectedOption) {
      setUnit(selectedOption.value);
    }
  };

  const handleNumUnit = (event: React.ChangeEvent<HTMLInputElement>) => {
    const num = parseFloat(event.currentTarget.value); // Zmieniamy na parseFloat, by obsługiwać liczby zmiennoprzecinkowe
  
    if (!isNaN(num)) {
      if (num > 999) {
        setNumUnit(999);
      } else if (num < 0) {
        setNumUnit(0);
      } else {
        setNumUnit(num);
      }
    } else {
      setNumUnit(0); 
    }
  };

  useEffect(() => {
    const updateFields = [...ingredients];
    updateFields[index].selectedUnit = `${numUnit} ${unit}`;
    setIngredients(updateFields);
  }, [unit, numUnit]);

  return (
    <div className={styles.unitBox}>
      <input
        type="number"
        min="0"
        max="999"
        value={numUnit}
        className={`${styles.inputNum} ${styles.noSpinButtons}`}
        onChange={handleNumUnit}
      />
      <Select
        name="unitOpt"
        options={options}
        styles={selectUnit}
        isSearchable={false}
        defaultValue={options[0]}
        onChange={(selectedOption) => {
          if (selectedOption !== null) {
            handleUnit(selectedOption);
          }
        }}
      />
    </div>
  );
};

export default UnitInput;
