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
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        gap: "15px",
        justifyContent: "center",
      }}
    >
      <p className={styles.text}>Search by:</p>
      <Select
        id="search-type"
        value={selectedType}
        onChange={handleSelectChange}
        sx={{
          backgroundColor: "rgba(217, 217, 217, 1)", // Tło Select
          width: "200px",
          borderRadius: "6px",
          padding: "10px 10px 10px 10px", // Padding wewnętrzny
          ".css-qiwgdb.MuiSelect-select": {
            padding: 0,
          },
          "& .css-igs3ac": {
            border: "none",
          },
       
          "& .MuiSelect-icon": {
            color: "rgba(139, 170, 54, 1)", // Kolor ikony strzałki
          },
        }}
        MenuProps={{
          PaperProps: {
            sx: {
              backgroundColor: "var(--color-bg-selectMenu)", // Tło rozwijanego menu
              width: "200px",
              "& .MuiMenuItem-root": {
                padding: "10px", // Padding dla opcji
              },
              "& .MuiMenuItem-root:hover": {
                backgroundColor: "var(--color-bg-selected)", // Kolor tła na hover
              },
              "& .MuiMenuItem-root.Mui-selected": {
                backgroundColor: "var(--color-bg-selected)", // Tło wybranej opcji
              },
              "& .MuiMenuItem-root.Mui-selected:hover": {
                backgroundColor: "var(--color-bg-selected)", // Tło podczas hover na wybranej opcji
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
