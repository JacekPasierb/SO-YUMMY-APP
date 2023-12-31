import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { validate } from "./RegisterFormValidations";
import css from "./RegisterForm.module.css";
import icons from "../../assets/icons/sprite.svg";

import errorIcon from "../../images/Errorlogo.png";
import successIcon from "../../images/Successlogo.png";
import axios from "axios";

const RegisterForm = () => {
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      // Wykorzystaj Axios do wysłania danych na backend
      const response = await axios.post(
        "https://so-yummy-app-backend.vercel.app/api/users/register",
        values
      );

      if (response.status === 201) {
        return setSubmitStatus("success");
      } else {
        
        return setSubmitStatus("error");
      }
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setSubmitting(false);
    }
  };
  return (
    
      <Formik
        initialValues={{ name: "", email: "", password: "" }}
        validate={validate}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, setFieldTouched, setFieldValue }) => (
          <Form className={css.formRegister} autoComplete="off">
            <h2 className={css.titleRegister}>Registration</h2>
            <div className={css.boxInput}>
              <div
                className={`${css.inputWithIcon} ${
                  touched.name && errors.name ? css.errorInputWithIcon : ""
                }`}
              >
                <svg
                  className={`${css.inputIcon} ${
                    touched.name && errors.name ? css.errorInputIcon : ""
                  }`}
                >
                  <use href={icons + `#icon-user-01`}></use>
                </svg>
                <Field
                  type="name"
                  name="name"
                  placeholder="Name"
                  className={css.inputRegister}
                  onBlur={() => setFieldTouched("name", true)}
                />
                {touched.name && errors.name && (
                  <img
                    src={errorIcon}
                    alt="Error Icon"
                    className={css.additionalErrorIcon}
                  />
                )}
                {touched.name && !errors.name && (
                  <img
                    src={successIcon}
                    alt="Success Icon"
                    className={css.additionalSuccessIcon}
                  />
                )}
                <ErrorMessage
                  name="name"
                  component="div"
                  className={css.inputError}
                />
              </div>

              <div
                className={`${css.inputWithIcon} ${
                  touched.email && errors.email ? css.errorInputWithIcon : ""
                }`}
              >
                <svg
                  className={`${css.inputIcon} ${
                    touched.email && errors.email ? css.errorInputIcon : ""
                  }`}
                >
                  <use href={icons + `#icon-mail-01`}></use>
                </svg>
                <Field
                  type="email"
                  name="email"
                  placeholder="Email"
                  className={css.inputRegister}
                  onBlur={() => setFieldTouched("email", true)}
                />{" "}
                {touched.email && errors.email && (
                  <img
                    src={errorIcon}
                    alt="Error Icon"
                    className={css.additionalErrorIcon}
                  />
                )}
                {touched.email && !errors.email && (
                  <img
                    src={successIcon}
                    alt="Success Icon"
                    className={css.additionalSuccessIcon}
                  />
                )}
                <ErrorMessage
                  name="email"
                  component="div"
                  className={css.inputError}
                />
              </div>

              <div
                className={`${css.inputWithIcon} ${
                  touched.password && errors.password
                    ? css.errorInputWithIcon
                    : ""
                }`}
              >
                <svg
                  className={`${css.inputIcon} ${
                    touched.password && errors.password
                      ? css.errorInputIcon
                      : ""
                  }`}
                >
                  <use href={icons + `#icon-lock-02`}></use>
                </svg>
                <Field
                  type="password"
                  name="password"
                  placeholder="Password"
                  className={css.inputRegister}
                  onBlur={() => setFieldTouched("password", true)}
                />
                {touched.password && errors.password && (
                  <img
                    src={errorIcon}
                    alt="Error Icon"
                    className={css.additionalErrorIcon}
                  />
                )}
                {touched.password && !errors.password && (
                  <img
                    src={successIcon}
                    alt="Success Icon"
                    className={css.additionalSuccessIcon}
                  />
                )}
                <ErrorMessage
                  name="password"
                  component="div"
                  className={css.inputError}
                />
              </div>
            </div>
            {submitStatus === "success" && (
              <div className={css.successMessage}>Registration successful!</div>
            )}

            {submitStatus === "error" && (
              <div className={css.errorMessage}>
                Registration failed. Please try again.
              </div>
            )}
            <button type="submit" className={css.btnRegister}>
              Sign up
            </button>
          </Form>
        )}
      </Formik>
    
  );
};

export default RegisterForm;
