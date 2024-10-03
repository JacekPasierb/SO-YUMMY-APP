import css from "./ThemeToggler.module.css";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field } from "formik";
import { useAuth } from "../../../hooks/useAuth";
import { changeTheme, refreshUser } from "../../../redux/auth/operations";
import { AppDispatch } from "../../../redux/store";
import { selectTheme } from "../../../redux/auth/selectors";

const ThemeToggler = () => {
  const dispatch: AppDispatch = useDispatch();

  const isDarkThemeFromStore = useSelector(selectTheme);
  const [isDarkTheme, setIsDarkTheme] = useState(isDarkThemeFromStore);

  useEffect(() => {
    setIsDarkTheme(isDarkThemeFromStore);
  }, [isDarkThemeFromStore]);
  
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newTheme = event.target.checked; // Ustaw nowy temat na podstawie checkboxa
     dispatch(changeTheme(newTheme) );
  };

  
  return (
    
      <label className={css.switch}>
        <input
          type="checkbox"
          name="theme"
          checked={isDarkTheme}
          onChange={handleChange}
          className={css.switchInput}
        />
        <span className={css.switchSlider}></span>
      </label>
    
  );
};

export default ThemeToggler;
