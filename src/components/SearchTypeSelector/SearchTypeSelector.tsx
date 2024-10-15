import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import React from "react";

interface SearchTypeSelectorProps {
  onTypeChange: (type: string) => void;
  selectedType: string;
}

const SearchTypeSelector:React.FC <SearchTypeSelectorProps>= ({onTypeChange, selectedType}) => {
  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    onTypeChange(event.target.value);
  };

  return (
    <div style={{display:"flex", flexDirection:"row", gap:"15px"}}>
      <p>Search by:</p>
      <Select  id="search-type" value={selectedType} onChange={handleSelectChange}>
        <MenuItem value={"query"}>Title</MenuItem>
        <MenuItem value={"ingredient"}>Ingredients</MenuItem>
      </Select>
    </div>
  );
};

export default SearchTypeSelector;
