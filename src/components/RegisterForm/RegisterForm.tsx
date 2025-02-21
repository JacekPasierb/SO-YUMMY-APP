import {ErrorMessage, Field, Form, Formik, FormikValues} from "formik";
import React, {useMemo, useState} from "react";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router";
import {useMediaQuery} from "@react-hook/media-query";
import {toast} from "react-toastify";

import {validate} from "./RegisterFormValidations";
import {register} from "../../redux/auth/operations";
import {AppDispatch} from "src/redux/store";

import icons from "../../assets/icons/sprite.svg";
import errorIcon from "../../images/Errorlogo.png";
import successIcon from "../../images/Successlogo.png";
import styles from "./RegisterForm.module.css";
import {getLogoSrc} from "../../helpers/helpers";

interface FormValues {
  name: string;
  email: string;
  password: string;
}

const RegisterForm: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const isTablet = useMediaQuery("(min-width: 768px)");
  const isDesktop = useMediaQuery("(min-width: 1200px)");
  const isRetina = Math.floor(window.devicePixelRatio) > 1;
  const logoSrc = useMemo(
    () => getLogoSrc({isDesktop, isTablet, isRetina}),
    [isDesktop, isTablet, isRetina]
  );

  const initialValues: FormValues = {
    name: "",
    email: "",
    password: "",
  };

  const handleSubmit = async (
    values: FormValues,
    {resetForm}: {resetForm: () => void}
  ) => {
    try {
      const result = await dispatch(register(values));

      if (register.fulfilled.match(result)) {
        toast.info("Verification link sent to email. Check your mail.");
        resetForm();
        navigate("/signin");
      }
    } catch (error) {
      const err = error as any;
      toast.error(err.message || "Registration failed.");
    }
  };

  const renderInputField = (
    name: keyof FormValues,
    type: string,
    placeholder: string,
    iconId: string,
    touched: any,
    errors: any
  ) => (
    <div
      className={`${styles.inputWithIcon} ${
        touched[name] && errors[name] ? styles.errorInputWithIcon : ""
      }`}
    >
      <svg
        className={`${styles.inputIcon} ${
          touched[name] && errors[name] ? styles.errorInputIcon : ""
        }`}
      >
        <use href={`${icons}#icon-${iconId}`} />
      </svg>

      <Field
        type={type}
        name={name}
        placeholder={placeholder}
        className={styles.inputRegister}
        autoComplete={
          name === "password"
            ? "current-password"
            : name === "email"
            ? "username"
            : "off"
        }
      />

      {touched[name] && (
        <img
          src={errors[name] ? errorIcon : successIcon}
          alt={`${errors[name] ? "Error" : "Success"} Icon`}
          className={
            errors[name]
              ? styles.additionalErrorIcon
              : styles.additionalSuccessIcon
          }
        />
      )}

      <ErrorMessage name={name} component="div" className={styles.inputError} />
    </div>
  );
  return (
    <Formik
      initialValues={initialValues}
      validate={validate}
      onSubmit={handleSubmit}
    >
      {({errors, touched}) => (
        <Form className={styles.formRegister} autoComplete="off">
          <img
            width="285px"
            height="250px"
            src={logoSrc}
            alt="Logo"
            className={styles.logo}
          />
          <h2 className={styles.titleRegister}>Registration</h2>
          <div className={styles.boxInput}>
            {renderInputField(
              "name",
              "text",
              "Name",
              "user-01",
              touched,
              errors
            )}
            {renderInputField(
              "email",
              "email",
              "Email",
              "mail-01",
              touched,
              errors
            )}
            {renderInputField(
              "password",
              "password",
              "Password",
              "lock-02",
              touched,
              errors
            )}
          </div>

          <button
            type="submit"
            className={styles.btnRegister}
            aria-label="Sign up"
          >
            Sign up
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default RegisterForm;
