import { MenuItem, Select } from "@mui/material";
import React from "react";

const SearchTypeSelector = () => {
  return (
    <div>
      <p>Search by:</p>
      <Select defaultValue={"Title"}>
        <MenuItem value={"Title"}>Title</MenuItem>
        <MenuItem value={"Ingredients"}>Ingredients</MenuItem>
      </Select>
    </div>
  );
};

export default SearchTypeSelector;
