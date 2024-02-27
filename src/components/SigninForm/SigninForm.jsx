import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { validate } from "./SigninFormValidations";
import css from "./SigninForm.module.css";
import icons from "../../assets/icons/sprite.svg";

import errorIcon from "../../images/Errorlogo.png";
import successIcon from "../../images/Successlogo.png";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { logIn } from "../../redux/auth/operations";
import { selectError } from "../../redux/auth/selectors";
import { toast } from "react-toastify";

const SigninForm = () => {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.auth.error);
  const navigate = useNavigate();
  const handleSubmit = async (values, { resetForm }) => {
    try {
      const result = await dispatch(logIn(values));

      if (logIn.fulfilled.match(result)) {
        resetForm();
        navigate("/");
        toast.success("Logged in success !")
      }
    } catch (err) {
      console.error(err.message);
      dispatch(selectError("Login failed ⚠"));
      toast.error("Failed to log in")
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
