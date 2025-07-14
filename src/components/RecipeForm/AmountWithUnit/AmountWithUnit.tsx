import React from "react";
import styles from "./AmountWithUnit.module.css";
import Select from "react-select";
import {selectUnit} from "../../RecipeIngredientsFields/selectStyles";
import {Option} from "../../../types/ingredientsTypes";

const MAX_VALUE = 999;
const MIN_VALUE = 0;

type Props = {
  amount: string | number;
  unit: string;
  options: Option[];
  onAmountChange: (value: string) => void;
  onUnitChange: (value: string) => void;
};

const AmountWithUnit: React.FC<Props> = ({
  amount,
  unit,
  options,
  onAmountChange,
  onUnitChange,
}) => {
  return (
    <div className={styles.unitInput__container}>
      <input
        type="number"
        value={amount}
        onChange={(e) => {
          const value = e.target.value;
          if (value.length <= 3) {
            onAmountChange(value);
          }
        }}
        className={`${styles.unitInput__number} ${styles.unitInput__noSpin}`}
        min={MIN_VALUE}
        max={MAX_VALUE}
        maxLength={3}
      />
      <Select
        value={options.find((o) => o.value === unit)}
        styles={selectUnit}
        options={options}
        onChange={(selected) => onUnitChange(selected ? selected.value : "")}
        isSearchable={false}
        className={styles.manual}
        inputId="unit-select"
      />
    </div>
  );
};

export default AmountWithUnit;
