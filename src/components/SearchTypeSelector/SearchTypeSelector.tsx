import React, { memo } from "react";
import { MenuItem, Select, SelectChangeEvent, styled } from "@mui/material";
import styles from "./SearchTypeSelector.module.css";
import { useTranslation } from "react-i18next";

interface SearchTypeSelectorProps {
  onTypeChange: (type: string) => void;
  selectedType: string;
}

const StyledSelect = styled(Select)({
  backgroundColor: "rgba(217, 217, 217, 1)",
  width: "200px",
  borderRadius: "6px",
  padding: "10px",
  "& .MuiSelect-select": {
    padding: 0,
  },
  "& .MuiOutlinedInput-notchedOutline": {
    border: "none",
  },
  "& .MuiSelect-icon": {
    color: "rgba(139, 170, 54, 1)",
  },
});

const menuProps = {
  PaperProps: {
    sx: {
      backgroundColor: "var(--color-bg-selectMenu)",
      width: "200px",
      "& .MuiMenuItem-root": {
        padding: "10px",
      },
      "& .MuiMenuItem-root:hover, & .MuiMenuItem-root.Mui-selected, & .MuiMenuItem-root.Mui-selected:hover":
        {
          backgroundColor: "var(--color-bg-selected)",
        },
    },
  },
};

const SearchTypeSelector: React.FC<SearchTypeSelectorProps> = ({
  onTypeChange,
  selectedType,
}) => {
  const {t}=useTranslation();
  const handleSelectChange = (
    event: SelectChangeEvent<unknown>,
    child: React.ReactNode
  ) => {
    onTypeChange(event.target.value as string);
  };

  return (
    <div className={styles.searchTypeSelector}>
      <label htmlFor="search-type" className={styles.searchTypeSelector__label}>
      {t("searchBy")}
      </label>
      <StyledSelect
        id="search-type"
        value={selectedType}
        onChange={handleSelectChange}
        MenuProps={menuProps}
        aria-label={t("selectSearchType")}
      >
        <MenuItem value="query">{t("title")}</MenuItem>
        <MenuItem value="ingredient">{t("ingredients")}</MenuItem>
      </StyledSelect>
    </div>
  );
};

export default memo(SearchTypeSelector);
