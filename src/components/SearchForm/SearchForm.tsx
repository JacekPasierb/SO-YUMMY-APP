import React, { useState } from "react";
import styles from "./SearchForm.module.css";

interface SearchFormProps {
  onSearchSubmit: (value: string) => void;
  searchValue: string;
}

const SearchForm: React.FC<SearchFormProps> = React.memo(
  ({ onSearchSubmit, searchValue }) => {
    const [inputValue, setInputValue] = useState(searchValue || "");

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      onSearchSubmit(inputValue);
    };
    return (
      <form className={styles.search} onSubmit={handleSubmit}>
        <input
          type="text"
          id="search-input"
          placeholder="Beef"
          className={styles.search__input}
          aria-label="Search for recipes"
          value={inputValue}
          onChange={handleInputChange}
        />
        <button
          type="submit"
          className={styles.search__btn}
          disabled={!inputValue?.trim()}
        >
          Search
        </button>
      </form>
    );
  }
);

export default SearchForm;
