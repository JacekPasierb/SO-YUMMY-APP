import css from "./ThemeToggler.module.css";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field } from "formik";
import { useAuth } from "../../../hooks/useAuth";
import { changeTheme, refreshUser } from "../../../redux/auth/operations";
import { AppDispatch } from "../../../redux/store";
import { selectTheme } from "../../../redux/auth/selectors";

const ThemeToggler = () => {
  const dispatch: AppDispatch = useDispatch();

  const isDarkTheme = useSelector(selectTheme);

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const newTheme = event.target.checked; // Ustaw nowy temat na podstawie checkboxa
    await dispatch(changeTheme(newTheme) as any);

  };

  useEffect(() => {
    document.body.className = isDarkTheme ? "dark-theme" : "";
  }, [isDarkTheme]);
  return (
    <Formik initialValues={{ theme: isDarkTheme }} onSubmit={() => {}}>
      <Form>
        <label className={css.switch}>
          <Field
            type="checkbox"
            name="theme"
            checked={isDarkTheme}
            onChange={handleChange}
            className={css.switchInput}
          />
          <span className={css.switchSlider}></span>
        </label>
      </Form>
    </Formik>
  );
};

export default ThemeToggler;
