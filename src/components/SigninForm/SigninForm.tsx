import React, { useState } from "react";
import { ErrorMessage, Field, Form, Formik, FormikValues } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "@react-hook/media-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { AppDispatch } from "src/redux/store";
import { logIn, resendVerificationEmail } from "../../redux/auth/operations";
import { selectError } from "../../redux/auth/selectors";
import { validate } from "./SigninFormValidations";

// Importing images and icons
import styles from "./SigninForm.module.css";
import icons from "../../assets/icons/sprite.svg";
import errorIcon from "../../images/Errorlogo.png";
import successIcon from "../../images/Successlogo.png";
import logo from "../../images/logos";

const SigninForm = () => {
  const [emailForResend, setEmailForResend] = useState<string | null>(null);
  const isTablet = useMediaQuery("(min-width: 768px)");
  const isDesktop = useMediaQuery("(min-width: 1200px)");
  const isRetina = window.devicePixelRatio > 1;

  // Ustalanie źródła logo na podstawie warunków
  const logoSrc = isDesktop
    ? isRetina
      ? logo.desktop2x
      : logo.desktop1x
    : isTablet
    ? isRetina
      ? logo.tablet2x
      : logo.tablet1x
    : isRetina
    ? logo.mobile2x
    : logo.mobile1x;

  const dispatch: AppDispatch = useDispatch();
  const error = useSelector(selectError);
  const navigate = useNavigate();

  const handleSubmit = async (
    values: FormikValues,
    { resetForm }: { resetForm: () => void }
  ) => {
    try {
      setEmailForResend(values.email);
      const result = await dispatch(
        logIn({
          email: values.email,
          password: values.password,
        })
      );
      if (logIn.fulfilled.match(result)) {
        resetForm();
        navigate("/");
      } else if (error) {
        toast.error(error);
      }
    } catch (err: any) {
      console.error("Error logging in:", err.message);
      toast.error("Something went wrong during sign in, please try again.");
    }
  };
  const handleResendVerificationEmail = async () => {
    if (emailForResend) {
      try {
        await dispatch(resendVerificationEmail(emailForResend));
        toast.success("Verification email has been sent!");
      } catch (err: any) {
        console.error("Error resending verification email:", err.message);
        toast.error(
          "Failed to resend the verification email, please try again."
        );
      }
    }
  };

  return (
    <div>
      <Formik
        initialValues={{ email: "", password: "" }}
        validate={validate}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, setFieldTouched }) => (
          <Form className={styles.formRegister} autoComplete="off">
            <img src={logoSrc} className={styles.logo} alt="Logo" />
            <h2 className={styles.title}>Sign In</h2>
            <div className={styles.inputGroup}>
              <div
                className={`${styles.inputWrapper} ${
                  touched.email && errors.email ? styles.inputError : ""
                }`}
              >
                <svg
                  className={`${styles.icon} ${
                    touched.email && errors.email ? styles.iconError : ""
                  }`}
                >
                  <use href={icons + `#icon-mail-01`}></use>
                </svg>
                <Field
                  type="email"
                  name="email"
                  placeholder="Email"
                  className={styles.input}
                  onBlur={() => setFieldTouched("email", true)}
                  autoComplete="off"
                />
                {touched.email && errors.email && (
                  <img
                    src={errorIcon}
                    alt="Error"
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
                  className={styles.errorMessage}
                />
              </div>

              <div
                className={`${styles.inputWrapper} ${
                  touched.password && errors.password ? styles.inputError : ""
                }`}
              >
                <svg
                  className={`${styles.icon} ${
                    touched.password && errors.password ? styles.iconError : ""
                  }`}
                >
                  <use href={icons + `#icon-lock-02`}></use>
                </svg>
                <Field
                  type="password"
                  name="password"
                  placeholder="Password"
                  autoComplete="current-password"
                  className={styles.input}
                  onBlur={() => setFieldTouched("password", true)}
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
                  className={styles.errorMessage}
                />
              </div>
            </div>
            {error === "Konto nie zweryfikowane" && (
              <p className={styles.verificationText}>
                Didn't receive the email?
                <button
                  type="button"
                  className={styles.resendButton}
                  onClick={handleResendVerificationEmail}
                >
                  Resend
                </button>
              </p>
            )}
            <button type="submit" className={styles.submitButton}>
              Sign up
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SigninForm;
