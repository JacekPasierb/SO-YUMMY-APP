import React from "react";
import css from "./UnitInput.module.css";
import Select from "react-select";
import { selectUnit } from "../RecipeIngredientsFields/selectStyles";

const UnitInput = () => {
  const options = [
    { label: "tbs", value: "tbs" },
    { label: "tsp", value: "tsp" },
    { label: "kg", value: "kg" },
    { label: "g", value: "g" },
  ];
  return (
    <div className={css.unitBox}>
      <input
        type="number"
        min="0"
        max="999"
        className={`${css.inputNum} ${css.noSpinButtons}`}
      />
      <Select
        name="unitOpt"
        options={options}
        styles={selectUnit}
        isSearchable={false}
        defaultValue={[options[0]]}
      />
    </div>
  );
};

export default UnitInput;
