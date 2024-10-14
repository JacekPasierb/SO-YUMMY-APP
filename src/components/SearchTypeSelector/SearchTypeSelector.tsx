import { MenuItem, Select } from "@mui/material";
import React from "react";

const SearchTypeSelector = () => {
  return (
    <div>
      <p>Search by:</p>
      <Select>
        <MenuItem value={10}>Title</MenuItem>
        <MenuItem value={20}>Ingredients</MenuItem>
      </Select>{" "}
    </div>
  );
};

export default SearchTypeSelector;
