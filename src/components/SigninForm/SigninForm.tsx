import React, {useCallback, useMemo} from "react";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {useMediaQuery} from "@react-hook/media-query";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";

import {AppDispatch} from "src/redux/store";
import {logIn, resendVerificationEmail} from "../../redux/auth/operations";
import {selectError} from "../../redux/auth/selectors";
import {validate} from "./SigninFormValidations";
import {getLogoSrc} from "../../helpers/helpers";

import styles from "./SigninForm.module.css";
import icons from "../../assets/icons/sprite.svg";

interface SigninFormValues {
  email: string;
  password: string;
}

const SigninForm: React.FC = () => {
  const isTablet = useMediaQuery("(min-width: 768px)");
  const isDesktop = useMediaQuery("(min-width: 1200px)");
  const isRetina = Math.floor(window.devicePixelRatio) > 1;

  const logoSrc = useMemo(
    () => getLogoSrc({isDesktop, isTablet, isRetina}),
    [isDesktop, isTablet, isRetina]
  );

  const dispatch: AppDispatch = useDispatch();
  const error = useSelector(selectError);
  const navigate = useNavigate();

  const handleSubmit = useCallback(
    async (values: SigninFormValues, {resetForm}: {resetForm: () => void}) => {
      try {
        const result = await dispatch(logIn(values));

        if (logIn.fulfilled.match(result)) {
          resetForm();
          navigate("/");
        }
      } catch (error) {
        toast.error("Sign in failed. Please try again.");
      }
    },
    [dispatch, navigate]
  );

  const handleResendVerification = useCallback(
    async (email: string | undefined) => {
      try {
        await dispatch(resendVerificationEmail(email as string));
        toast.success("Verification email sent successfully!");
      } catch (error) {
        toast.error("Failed to send verification email.");
      }
    },
    [dispatch]
  );

  const renderField = (
    name: string,
    type: string,
    placeholder: string,
    iconId: string
  ) => (
    <div className={`${styles.inputWrapper}`}>
      <svg className={styles.icon}>
        <use href={`${icons}#icon-${iconId}`} />
      </svg>
      <Field
        type={type}
        name={name}
        placeholder={placeholder}
        className={styles.input}
        autoComplete={type === "password" ? "current-password" : "off"}
      />
      <ErrorMessage
        name={name}
        component="div"
        className={styles.errorMessage}
      />
    </div>
  );

  return (
    <Formik
      initialValues={{email: "", password: ""}}
      validate={validate}
      onSubmit={handleSubmit}
    >
      {({values, errors, touched}) => (
        <Form className={styles.formRegister} autoComplete="off">
          <img
            width="285px"
            height="250px"
            src={logoSrc}
            className={styles.logo}
            alt="Logo"
          />
          <h2 className={styles.title}>Sign In</h2>

          <div className={styles.inputGroup}>
            {renderField("email", "email", "Email", "mail-01")}
            {renderField("password", "password", "Password", "lock-02")}
          </div>

          {error === "Email not verified" && (
            <button
              type="button"
              className={styles.resendButton}
              onClick={() => handleResendVerification(values.email)}
            >
              Resend verification email
            </button>
          )}

          <button
            type="submit"
            className={styles.submitButton}
            aria-label="Sign in"
          >
            Sign in
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default SigninForm;
