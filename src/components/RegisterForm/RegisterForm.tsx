import { ErrorMessage, Field, Form, Formik, FormikValues } from "formik";
import React, { useState } from "react";
import { validate } from "./RegisterFormValidations";
import css from "./RegisterForm.module.css";
import icons from "../../assets/icons/sprite.svg";

import errorIcon from "../../images/Errorlogo.png";
import successIcon from "../../images/Successlogo.png";
import axios from "axios";
import { useDispatch } from "react-redux";
import { register } from "../../redux/auth/operations";
import { toast } from "react-toastify";

import { useMediaQuery } from "@react-hook/media-query";
import logo1x from "../../images/LogoMobile1x.png";
import logo2x from "../../images/LogoMobile2x.png";
import logoTablet1x from "../../images/LogoTablet1x.png";
import logoTablet2x from "../../images/LogoTablet2x.png";
import logoDesktop1x from "../../images/LogoDesctop1x.png";
import logoDesktop2x from "../../images/LogoDesctop2x.png";
import { AppDispatch } from "src/redux/store";
import { useNavigate } from "react-router";
const RegisterForm = () => {
  const isTablet = useMediaQuery("(min-width: 768px)");
  const isDesctop = useMediaQuery("(min-width: 1200px)");
  const isRetina = window.devicePixelRatio > 1;
  let logoSrc;
  const navigate = useNavigate();
  if (isDesctop) {
    logoSrc = isRetina ? logoDesktop2x : logoDesktop1x;
  } else if (isTablet) {
    logoSrc = isRetina ? logoTablet2x : logoTablet1x;
  } else {
    // Default image for smaller screens
    logoSrc = isRetina ? logo2x : logo1x;
  }
  const dispatch: AppDispatch = useDispatch();

  const handleSubmit = async (
    values: FormikValues,
    { resetForm }: { resetForm: () => void }
  ) => {
    try {
      const result = await dispatch(
        register({
          name: values.name,
          email: values.email,
          password: values.password,
        })
      );
      if (register.fulfilled.match(result)) {
        toast.info("Verification link sent to email. Check your mail.");
        resetForm();
        await navigate("/signin"); // Redirect to login page
      } else {
        toast.error("Registration failed.");
      }
    } catch (err: any) {
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
        <Form className={css.formRegister} autoComplete="off">
          <img src={logoSrc} className={css.imggg} />
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
                autocomplete="username"
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
                  touched.password && errors.password ? css.errorInputIcon : ""
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
                autocomplete="current-password"
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
  );
};

export default RegisterForm;
