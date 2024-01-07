import React from "react";
import css from "./SubscribeForm.module.css";
import { ErrorMessage, Field, Form, Formik } from "formik";
import sprite from "../../../assets/icons/sprite.svg";

const validateEmail = (value) => {
  let error;
  if (!value) {
    error = "Wprowadź adres e-mail.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    error = "Nieprawidłowy adres e-mail.";
  }
  return error;
};

const onSubmit = (values, { setSubmitting }) => {
  // Tutaj możesz dodać kod do wysyłania wiadomości e-mail lub innych działań
  console.log("Wysyłam e-mail:", values.email);
  setSubmitting(false);
};

const SubscribeForm = () => {
  return (
    <Formik initialValues={{ email: "" }} onSubmit={onSubmit}>
      {({ isSubmitting, isValid }) => (
        <Form>
          <div>
            <label>
              <div className={css.inputBox}>
                <svg className={css.iconEmail}>
                  <use href={sprite + `#icon-emai`}></use>
                </svg>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email adreess"
                  validate={validateEmail}
                  className={css.inputEmail}
                />
              </div>
              <ErrorMessage name="email" component="div" />
            </label>
          </div>

          <div>
            <button
              type="submit"
              disabled={isSubmitting || !isValid}
              className={css.btnSubscribe}
            >
              Subscribe
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default SubscribeForm;
