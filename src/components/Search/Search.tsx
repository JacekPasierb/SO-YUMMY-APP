import React from "react";
import styles from "./Search.module.css";

const Search = React.memo(() => {
  return (
    <div className={styles.search}>
      <input
        type="text"
        id="search-input"
        placeholder="Beef"
        className={styles.search__input}
        aria-label="Search for recipes"
      />
      <button type="button" className={styles.search__btn}>
        Search
      </button>
    </div>
  );
});

export default Search;
