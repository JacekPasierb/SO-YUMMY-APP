import styles from "./AuthForm.module.css";
import React, {  lazy } from "react";
import { Link } from "react-router-dom";

const SigninForm = lazy(() => import("../SigninForm/SigninForm"));
const RegisterForm = lazy(() => import("../RegisterForm/RegisterForm"));

interface AuthFormProps {
  formType: "register" | "signin";
}

const AuthForm: React.FC<AuthFormProps> = ({ formType }) => {
  return (
    <>
      {formType === "register" && (
        <>
          <RegisterForm />

          <Link className={styles.authForm__link} to="/signin">
            Sign in
          </Link>
        </>
      )}
      {formType === "signin" && (
        <>
          <SigninForm />

          <Link className={styles.authForm__link} to="/register">
            Registration
          </Link>
        </>
      )}
    </>
  );
};

export default AuthForm;
