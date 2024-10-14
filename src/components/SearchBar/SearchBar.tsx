import React from "react";
import SearchForm from "../SearchForm/SearchForm";
import SearchTypeSelector from "../SearchTypeSelector/SearchTypeSelector";

const SearchBar = () => {
  return (
    <>
      <SearchForm />
      <SearchTypeSelector />
    </>
  );
};

export default SearchBar;
