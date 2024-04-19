import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import css from "./ThemeToggler.module.css";
import { useDispatch, useSelector } from "react-redux";
import { selectTheme } from "../../../redux/global/globalSelectors";
import { setTheme } from "../../../redux/global/globalSlice";

const ThemeToggler = () => {
  const dispatch = useDispatch();
  const theme = useSelector(selectTheme);

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleChange = () => {
    if (theme === "light") {
      dispatch(setTheme("dark"));
      // localStorage.setItem("theme", "dark");
    } else {
      dispatch(setTheme("light"));
      // localStorage.setItem("theme", "light");
    }
  };
  useEffect(() => {
    const saveTheme = localStorage.getItem("theme") || "light";
    dispatch(setTheme(saveTheme));
  }, []);
  return (
    <Formik initialValues={{ theme: theme }} onSubmit={() => {}}>
      <Form>
        <label className={css.switch}>
          <Field
            type="checkbox"
            name="theme"
            value={theme}
            checked={theme === "dark"}
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
