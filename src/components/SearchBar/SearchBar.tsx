import React from "react";
import SearchForm from "../SearchForm/SearchForm";
import SearchTypeSelector from "../SearchTypeSelector/SearchTypeSelector";

interface SearchTypeSelectorProps {
  onTypeChange: (type: string) => void;
  selectedType: string;
}

const SearchBar: React.FC<SearchTypeSelectorProps> = ({
  onTypeChange,
  selectedType,
}) => {
  return (
    <>
      <SearchForm />
      <SearchTypeSelector
        onTypeChange={onTypeChange}
        selectedType={selectedType}
      />
    </>
  );
};

export default SearchBar;
