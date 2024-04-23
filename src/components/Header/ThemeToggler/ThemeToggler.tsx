import css from "./ThemeToggler.module.css";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectTheme } from "../../../redux/global/globalSelectors";
import { setTheme } from "../../../redux/global/globalSlice";
import { Formik, Form, Field } from "formik";

const ThemeToggler = () => {
  const dispatch = useDispatch();
  const theme = useSelector(selectTheme);

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleChange = () => {
    if (theme === "light") {
      dispatch(setTheme("dark"));
    } else {
      dispatch(setTheme("light"));
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
