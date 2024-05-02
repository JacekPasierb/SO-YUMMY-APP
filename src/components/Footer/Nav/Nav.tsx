import React from "react";
import { Link } from "react-router-dom";
import css from "./Nav.module.css";

const Nav = () => {
  return (
    <nav className={css.navigationMain}>
      <ul className={css.navigationList}>
        <li className={css.navigationListItem}>
          <Link to="/search" className={css.link}>
            Ingredients
          </Link>
        </li>
        <li className={css.navigationListItem}>
          <Link to="/add" className={css.link}>
            AddRecipes
          </Link>
        </li>
        <li className={css.navigationListItem}>
          <Link to="/ownRecipes" className={css.link}>
            MyRecipes
          </Link>
        </li>
        <li className={css.navigationListItem}>
          <Link to="/favorite" className={css.link}>
            Favorite
          </Link>
        </li>
        <li className={css.navigationListItem}>
          <Link to="/shopping-list" className={css.link}>
            Shopping List
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
