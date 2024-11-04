import React from "react";
import SearchForm from "../SearchForm/SearchForm";
import SearchTypeSelector from "../SearchTypeSelector/SearchTypeSelector";
import styles from "./SearchBar.module.css";

interface SearchBarProps {
  onTypeChange: (type: string) => void;
  selectedType: string;
  onSearchSubmit: (value: string) => void;
  searchValue: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  onTypeChange,
  selectedType,
  onSearchSubmit,
  searchValue,
}) => {
  return (
    <div className={styles.searchBar}>
      <SearchForm onSearchSubmit={onSearchSubmit} searchValue={searchValue} />
      <SearchTypeSelector
        onTypeChange={onTypeChange}
        selectedType={selectedType}
      />
    </div>
  );
};

export default SearchBar;
