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
              backgroundColor: "red", // Tło rozwijanego menu
              "& .MuiMenuItem-root": {
                padding: "10px", // Padding dla opcji
              },
              "& .MuiMenuItem-root:hover": {
                backgroundColor: "green", // Kolor tła na hover
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
