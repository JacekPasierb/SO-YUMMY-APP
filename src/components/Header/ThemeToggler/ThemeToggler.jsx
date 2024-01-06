import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import css from "./ThemeToggler.module.css";

const ThemeToggler = () => {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme || "light";
  });

  useEffect(() => {
    
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleChange = () => {
     const newTheme = theme === "light" ? "dark" : "light";
     setTheme(newTheme);
  
     localStorage.setItem("theme", newTheme);
  };
  useEffect(() => {
    
    const saveTheme = localStorage.getItem("theme") || "light";

    setTheme(saveTheme);
  }, []);
  return (
    <Formik initialValues={theme}>
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
