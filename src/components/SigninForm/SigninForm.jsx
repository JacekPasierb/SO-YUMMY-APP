import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { validate } from "./SigninFormValidations";
import css from "./SigninForm.module.css";
import icons from "../../assets/icons/sprite.svg";

import errorIcon from "../../images/Errorlogo.png";
import successIcon from "../../images/Successlogo.png";
import axios from "axios";

const SigninForm = () => {
   const [submitStatus, setSubmitStatus] = useState(null);
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      // Wykorzystaj Axios do wysłania danych na backend
      const response = await axios.post(
        "https://so-yummy-app-backend.vercel.app/api/users/signin",
        values
      );

      if (response.status === 200) {
        setSubmitStatus("success");
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <div>
      <Formik
        initialValues={{ email: "", password: "" }}
        validate={validate}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, setFieldTouched, setFieldValue }) => (
          <Form className={css.formRegister} autoComplete="off">
            <h2 className={css.titleRegister}>Sign In</h2>
            <div className={css.boxInput}>
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
                />
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
              <div className={css.successMessage}>Login successful!</div>
            )}

            {submitStatus === "error" && (
              <div className={css.errorMessage}>
                Login failed. Please try again.
              </div>
            )}
            <button type="submit" className={css.btnRegister}>
              Sign up
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SigninForm;
