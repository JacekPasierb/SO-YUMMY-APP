import React from "react";
import SearchForm from "../SearchForm/SearchForm";
import SearchTypeSelector from "../SearchTypeSelector/SearchTypeSelector";

interface SearchTypeSelectorProps {
  onTypeChange: (type: string) => void;
  selectedType: string;
  onSearchSubmit: (value: string) => void;
  searchValue: string;
}

const SearchBar: React.FC<SearchTypeSelectorProps> = ({
  onTypeChange,
  selectedType, onSearchSubmit,
  searchValue,
}) => {
  return (
    <>
      <SearchForm onSearchSubmit={onSearchSubmit} searchValue={searchValue}/>
      <SearchTypeSelector
        onTypeChange={onTypeChange}
        selectedType={selectedType}
      />
    </>
  );
};

export default SearchBar;
