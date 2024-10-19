import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import React from "react";
import styles from "./SearchTypeSelector.module.css";

interface SearchTypeSelectorProps {
  onTypeChange: (type: string) => void;
  selectedType: string;
}

const SearchTypeSelector: React.FC<SearchTypeSelectorProps> = ({
  onTypeChange,
  selectedType,
}) => {
  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    onTypeChange(event.target.value);
  };

  return (
    <div className={styles.searchTypeSelector}>
      <p className={styles.searchTypeSelector__label}>Search by:</p>
      <Select
        id="search-type"
        value={selectedType}
        onChange={handleSelectChange}
        sx={{
          backgroundColor: "rgba(217, 217, 217, 1)",
          width: "200px",
          borderRadius: "6px",
          padding: "10px 10px 10px 10px",
          ".css-qiwgdb.MuiSelect-select": {
            padding: 0,
          },
          "& .css-igs3ac": {
            border: "none",
          },

          "& .MuiSelect-icon": {
            color: "rgba(139, 170, 54, 1)",
          },
        }}
        MenuProps={{
          PaperProps: {
            sx: {
              backgroundColor: "var(--color-bg-selectMenu)",
              width: "200px",
              "& .MuiMenuItem-root": {
                padding: "10px",
              },
              "& .MuiMenuItem-root:hover": {
                backgroundColor: "var(--color-bg-selected)",
              },
              "& .MuiMenuItem-root.Mui-selected": {
                backgroundColor: "var(--color-bg-selected)",
              },
              "& .MuiMenuItem-root.Mui-selected:hover": {
                backgroundColor: "var(--color-bg-selected)",
              },
            },
          },
        }}
      >
        <MenuItem value={"query"}>Title</MenuItem>
        <MenuItem value={"ingredient"}>Ingredients</MenuItem>
      </Select>
    </div>
  );
};

export default SearchTypeSelector;
