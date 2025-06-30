import React, {useState, useCallback} from "react";
import styles from "./SearchForm.module.css";
import {useTranslation} from "react-i18next";

interface SearchFormProps {
  onSearchSubmit: (value: string) => void;
  searchValue?: string;
}

const SearchForm: React.FC<SearchFormProps> = ({
  onSearchSubmit,
  searchValue = "",
}) => {
  const [inputValue, setInputValue] = useState(searchValue);
  const {t} = useTranslation();
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);
    },
    []
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (inputValue.trim()) {
        onSearchSubmit(inputValue.trim());
      }
    },
    [inputValue, onSearchSubmit]
  );

  return (
    <form className={styles.search} onSubmit={handleSubmit} role="search">
      <input
        type="search"
        id="recipe-search"
        name="recipe-search"
        placeholder={t("search_placeholder")}
        className={styles.search__input}
        aria-label="Search for recipes"
        value={inputValue}
        onChange={handleInputChange}
        autoComplete="off"
      />
      <button
        type="submit"
        className={styles.search__btn}
        disabled={!inputValue.trim()}
        aria-label="Search"
        data-empty-message={t("emptyFieldMessage")}
      >
        {t("search_button")}
      </button>
    </form>
  );
};

export default React.memo(SearchForm);
