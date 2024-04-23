import css from "./Search.module.css";

import React from "react";

const Search = () => {
  return (
    <div className={css.inputSearch}>
      <input type="text" placeholder="Beef" className={css.input} />
      <button type="button" className={css.btn}>
        Search
      </button>
    </div>
  );
};

export default Search;
