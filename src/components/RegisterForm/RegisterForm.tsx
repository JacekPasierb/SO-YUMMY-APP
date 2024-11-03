import { ErrorMessage, Field, Form, Formik, FormikValues } from "formik";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { useMediaQuery } from "@react-hook/media-query";
import { toast } from "react-toastify";

import { validate } from "./RegisterFormValidations";
import { register } from "../../redux/auth/operations";
import { AppDispatch } from "src/redux/store";
import { getResponsiveLogo } from "../../helpers/helpers";

import icons from "../../assets/icons/sprite.svg";
import errorIcon from "../../images/Errorlogo.png";
import successIcon from "../../images/Successlogo.png";
import styles from "./RegisterForm.module.css";

interface FormValues {
  name: string;
  email: string;
  password: string;
}

const RegisterForm: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const isTablet = useMediaQuery("(min-width: 768px)");
  const isDesctop = useMediaQuery("(min-width: 1200px)");
  const isRetina = window.devicePixelRatio > 1;
  const logoSrc = getResponsiveLogo(isDesctop, isTablet, isRetina);

  const initialValues: FormValues = {
    name: "",
    email: "",
    password: "",
  };

  const handleSubmit = async (
    values: FormValues,
    { resetForm }: { resetForm: () => void }
  ) => {
    try {
      const result = await dispatch(register(values));

      if (register.fulfilled.match(result)) {
        toast.info("Verification link sent to email. Check your mail.");
        resetForm();
        navigate("/signin"); 
      } else {
        toast.error("Registration failed.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
  };
  return (
    <Formik
      initialValues={{ name: "", email: "", password: "" }}
      validate={validate}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, setFieldTouched, setFieldValue }) => (
        <Form className={styles.formRegister} autoComplete="off">
          <img src={logoSrc} className={styles.imggg} />
          <h2 className={styles.titleRegister}>Registration</h2>
          <div className={styles.boxInput}>
            <div
              className={`${styles.inputWithIcon} ${
                touched.name && errors.name ? styles.errorInputWithIcon : ""
              }`}
            >
              <svg
                className={`${styles.inputIcon} ${
                  touched.name && errors.name ? styles.errorInputIcon : ""
                }`}
              >
                <use href={icons + `#icon-user-01`}></use>
              </svg>
              <Field
                type="name"
                name="name"
                placeholder="Name"
                className={styles.inputRegister}
                onBlur={() => setFieldTouched("name", true)}
              />
              {touched.name && errors.name && (
                <img
                  src={errorIcon}
                  alt="Error Icon"
                  className={styles.additionalErrorIcon}
                />
              )}
              {touched.name && !errors.name && (
                <img
                  src={successIcon}
                  alt="Success Icon"
                  className={styles.additionalSuccessIcon}
                />
              )}
              <ErrorMessage
                name="name"
                component="div"
                className={styles.inputError}
              />
            </div>

            <div
              className={`${styles.inputWithIcon} ${
                touched.email && errors.email ? styles.errorInputWithIcon : ""
              }`}
            >
              <svg
                className={`${styles.inputIcon} ${
                  touched.email && errors.email ? styles.errorInputIcon : ""
                }`}
              >
                <use href={icons + `#icon-mail-01`}></use>
              </svg>
              <Field
                type="email"
                name="email"
                placeholder="Email"
                className={styles.inputRegister}
                onBlur={() => setFieldTouched("email", true)}
                autocomplete="username"
              />{" "}
              {touched.email && errors.email && (
                <img
                  src={errorIcon}
                  alt="Error Icon"
                  className={styles.additionalErrorIcon}
                />
              )}
              {touched.email && !errors.email && (
                <img
                  src={successIcon}
                  alt="Success Icon"
                  className={styles.additionalSuccessIcon}
                />
              )}
              <ErrorMessage
                name="email"
                component="div"
                className={styles.inputError}
              />
            </div>

            <div
              className={`${styles.inputWithIcon} ${
                touched.password && errors.password
                  ? styles.errorInputWithIcon
                  : ""
              }`}
            >
              <svg
                className={`${styles.inputIcon} ${
                  touched.password && errors.password
                    ? styles.errorInputIcon
                    : ""
                }`}
              >
                <use href={icons + `#icon-lock-02`}></use>
              </svg>
              <Field
                type="password"
                name="password"
                placeholder="Password"
                className={styles.inputRegister}
                onBlur={() => setFieldTouched("password", true)}
                autocomplete="current-password"
              />
              {touched.password && errors.password && (
                <img
                  src={errorIcon}
                  alt="Error Icon"
                  className={styles.additionalErrorIcon}
                />
              )}
              {touched.password && !errors.password && (
                <img
                  src={successIcon}
                  alt="Success Icon"
                  className={styles.additionalSuccessIcon}
                />
              )}
              <ErrorMessage
                name="password"
                component="div"
                className={styles.inputError}
              />
            </div>
          </div>

          <button type="submit" className={styles.btnRegister}>
            Sign up
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default RegisterForm;
