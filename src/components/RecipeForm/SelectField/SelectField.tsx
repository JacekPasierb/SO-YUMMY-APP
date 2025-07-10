import { useTranslation } from "react-i18next";
import styles from "../RecipeData/RecipeData.module.css";

type Option = string | {label: string; value: string | number};

type SelectFieldProps = {
  label: string;
  value: string | number;
  onChange: (value: string) => void;
  options: Option[];
  className?: string;
  sizeOnFocus?: number;
};

export const SelectField = ({
  label,
  value,
  onChange,
  options,
  className = "",
  sizeOnFocus = 6,
}: SelectFieldProps) => {
  const handleFocus = (e: React.FocusEvent<HTMLSelectElement>) => {
    e.target.size = sizeOnFocus;
    e.target.style.overflowY = "auto";
  };

  const handleBlur = (e: React.FocusEvent<HTMLSelectElement>) => {
    e.target.size = 1;
    e.target.style.overflowY = "hidden";
  };

  const {t, i18n} = useTranslation();
  
  return (
    <div className={styles.selectWrapper}>
      <label>{label}</label>
      <select
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          e.target.size = 1;
          e.target.blur();
        }}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={className}
        size={4}
      >
        <option value="" disabled>
          {t("chooseCategory")} 
        </option>
        {options.map((option, idx) =>
          typeof option === "string" ? (
            <option key={option} value={option}>
              {option}
            </option>
          ) : (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          )
        )}
      </select>
    </div>
  );
};
