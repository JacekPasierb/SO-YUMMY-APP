import React, { useEffect, useState } from "react";
import css from "./UnitInput.module.css";
import Select from "react-select";
import { selectUnit } from "../RecipeIngredientsFields/selectStyles";

const UnitInput = ({ ingredients, setIngredients, index }) => {
  const options = [
    { label: "tbs", value: "tbs" },
    { label: "tsp", value: "tsp" },
    { label: "kg", value: "kg" },
    { label: "g", value: "g" },
  ];
  const [unit, setUnit] = useState("tbs");
  const [numUnit, setNumUnit] = useState(0);

  const handleUnit = (selectedOption) => {
    setUnit(selectedOption.value);
  };
  const handleNumUnit = ({ currentTarget }) => {
    const num = currentTarget.value;
    setNumUnit(num);
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
       
        onChange={(selectedOption) => handleUnit(selectedOption)}
      />
    </div>
  );
};

export default UnitInput;
