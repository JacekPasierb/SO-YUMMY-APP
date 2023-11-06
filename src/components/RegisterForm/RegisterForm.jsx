import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import { validate } from "./RegisterFormValidations";
import css from "./RegisterForm.module.css";
import icons from "../../assets/icons/sprite.svg";

const RegisterForm = () => {
  return (
    <div>
      <Formik
        initialValues={{ name: "", email: "", password: "" }}
        validate={validate}
      >
        <Form className={css.formRegister} autoComplete="off">
          <h2 className={css.titleRegister}>Registration</h2>
          <div className={css.boxInput}>
            <div className={css.inputWithIcon}>
              <svg className={css.inputIcon}>
                <use href={icons + `#icon-user-01`}></use>
              </svg>
              <Field
                type="name"
                name="name"
                placeholder="Name"
                className={css.inputRegister}
              ></Field>
            </div>

            <ErrorMessage name="name" component="div" />
            <div className={css.inputWithIcon}>
              <svg className={css.inputIcon}>
                <use href={icons + `#icon-mail-01`}></use>
              </svg>
              <Field
                type="email"
                name="email"
                placeholder="Email"
                className={css.inputRegister}
              />
            </div>
            <ErrorMessage name="email" component="div" />
            <div className={css.inputWithIcon}>
              <svg className={css.inputIcon}>
                <use href={icons + `#icon-lock-02`}></use>
              </svg>
              <Field
                type="password"
                name="password"
                placeholder="Password"
                className={css.inputRegister}
              />
            </div>
            <ErrorMessage name="password" component="div" />
          </div>

          <button type="submit" className={css.btnRegister}>
            Sign up
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default RegisterForm;
