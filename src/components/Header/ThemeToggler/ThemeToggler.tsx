import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeTheme } from "../../../redux/auth/operations";
import { AppDispatch } from "../../../redux/store";
import { selectTheme } from "../../../redux/auth/selectors";
import styles from "./ThemeToggler.module.css";

const ThemeToggler: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isDarkTheme = useSelector(selectTheme);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(changeTheme(event.target.checked));
  };

  return (
    <div className={styles.themeToggler}>
      <label 
        htmlFor="theme-toggle"
        className={styles.themeToggler__label}
      >
        <span className={styles.themeToggler__text}>
          {isDarkTheme ? 'Dark' : 'Light'} theme
        </span>
        <input
          id="theme-toggle"
          type="checkbox"
          name="theme"
          checked={isDarkTheme}
          onChange={handleChange}
          className={styles.themeToggler__input}
          aria-label={`Switch to ${isDarkTheme ? 'light' : 'dark'} theme`}
        />
        <span 
          className={styles.themeToggler__slider}
          aria-hidden="true"
        ></span>
      </label>
    </div>
  );
};

export default ThemeToggler;
