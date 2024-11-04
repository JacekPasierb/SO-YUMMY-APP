import React, { FC, useEffect, useState } from "react";
import Select, { SingleValue } from "react-select";
import { selectUnit } from "../RecipeIngredientsFields/selectStyles";
import { Option, UnitInputProps } from "../../types/ingredientsTypes";
import styles from "./UnitInput.module.css";

const UNIT_OPTIONS: Option[] = [
  { label: "tbs", value: "tbs" },
  { label: "tsp", value: "tsp" },
  { label: "kg", value: "kg" },
  { label: "g", value: "g" },
];

const MAX_VALUE = 999;
const MIN_VALUE = 0;

const UnitInput: FC<UnitInputProps> = ({
  ingredients,
  setIngredients,
  index,
}) => {
  const [unit, setUnit] = useState<string>(UNIT_OPTIONS[0].value);
  const [numUnit, setNumUnit] = useState<number>(0);

  const handleUnit = (selectedOption: SingleValue<Option>) => {
    if (selectedOption) {
      setUnit(selectedOption.value);
    }
  };

  const handleNumUnit = (event: React.ChangeEvent<HTMLInputElement>) => {
    const num = parseFloat(event.currentTarget.value);

    if (!isNaN(num)) {
      if (num > MAX_VALUE) {
        setNumUnit(MAX_VALUE);
      } else if (num < MIN_VALUE) {
        setNumUnit(MIN_VALUE);
      } else {
        setNumUnit(num);
      }
    } else {
      setNumUnit(MIN_VALUE);
    }
  };

  useEffect(() => {
    setIngredients((prevIngredients) => {
      const updatedIngredients = [...prevIngredients];
      updatedIngredients[index] = {
        ...updatedIngredients[index],
        selectedUnit: `${numUnit} ${unit}`,
      };
      return updatedIngredients;
    });
  }, [unit, numUnit, setIngredients, index]);

  return (
    <div className={styles.unitInput__container}>
      <input
        type="number"
        min={MIN_VALUE}
        max={MAX_VALUE}
        value={numUnit}
        className={`${styles.unitInput__number} ${styles.unitInput__noSpin}`}
        onChange={handleNumUnit}
      />
      <Select
        name="unitOpt"
        options={UNIT_OPTIONS}
        styles={selectUnit}
        isSearchable={false}
        defaultValue={UNIT_OPTIONS[0]}
        onChange={(selectedOption) =>
          handleUnit(selectedOption as SingleValue<Option>)
        }
      />
    </div>
  );
};

export default UnitInput;
