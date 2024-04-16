import React, { FC, useEffect, useState } from "react";
import css from "./UnitInput.module.css";
import Select from "react-select";
import { selectUnit } from "../RecipeIngredientsFields/selectStyles";
import { Ing } from "../AddRecipeForm/AddRecipeForm";

interface UnitInputProps {
  ingredients: Ing[];
  setIngredients: React.Dispatch<React.SetStateAction<Ing[]>>;
  index: number;
}

interface Option {
  label: string;
  value: string;
}

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

  const handleUnit = (selectedOption: Option) => {
    setUnit(selectedOption.value);
  };
  const handleNumUnit = (event: React.ChangeEvent<HTMLInputElement>) => {
    const num = event.currentTarget.value;
    setNumUnit(parseInt(num, 10));
  };

  useEffect(() => {
    const updateFields = [...ingredients];
    updateFields[index].selectedUnit = `${numUnit} ${unit}`;
    setIngredients(updateFields);
  }, [unit, numUnit]);

  return (
    <div className={css.unitBox}>
      <input
        type="number"
        min="0"
        max="999"
        value={numUnit}
        className={`${css.inputNum} ${css.noSpinButtons}`}
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
