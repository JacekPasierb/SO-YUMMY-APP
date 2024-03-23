import React from "react";
import css from "./UnitInput.module.css";
import Select from "react-select";

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
        className={`${css.inputNum} ${css.noSpinButtons}`}
      />
      <Select name="unitOpt" options={options} className={css.selectUnit}/>
       
      
    </div>
  );
};

export default UnitInput;
