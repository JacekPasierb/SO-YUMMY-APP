import css from "./ThemeToggler.module.css";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectTheme } from "../../../redux/global/globalSelectors";
import { setTheme } from "../../../redux/global/globalSlice";
import { Formik, Form, Field } from "formik";
import { useAuth } from "../../../hooks/useAuth";
import { changeTheme } from "../../../redux/auth/operations";

const ThemeToggler = () => {
  const dispatch = useDispatch();

  const { user } = useAuth();
  const isDarkTheme = user.isDarkTheme;

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const newTheme = event.target.checked; // Ustaw nowy temat na podstawie checkboxa
    await dispatch(changeTheme(newTheme) as any);
  };

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
