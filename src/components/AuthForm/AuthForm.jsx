import React from "react";
import { useLocation } from "react-router";
import SigninForm from "../SigninForm/SigninForm";
import RegisterForm from "../RegisterForm/RegisterForm";
import css from "./AuthForm.module.css";
import { Link } from "react-router-dom";
import a from "../../images/backgroundRegister.png";

const AuthForm = () => {
  const location = useLocation();
  const { pathname } = location;

  return (
    <>
      {pathname === "/register" && (
        <>
          <RegisterForm />{" "}
          <Link className={css.linkForm} to="/signin">
            Sign in
          </Link>
        </>
      )}
      {pathname === "/signin" && (
        <>
          <SigninForm />
          <Link className={css.linkForm} to="/register">
            Registration
          </Link>
        </>
      )}
    </>
  );
};

export default AuthForm;
