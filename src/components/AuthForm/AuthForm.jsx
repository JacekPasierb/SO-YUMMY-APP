import React from "react";
import { useLocation } from "react-router";
import SigninForm from "../SigninForm/SigninForm";
import RegisterForm from "../RegisterForm/RegisterForm";
import css from "./AuthForm.module.css";
import { Link } from "react-router-dom";

const AuthForm = () => {
  const location = useLocation();
  const { pathname } = location;

  return (
    <div className={css.background}>
      {pathname === "/register" && (
        <>
          <RegisterForm /> <Link to="/signin">Sign in</Link>
        </>
      )}
      {pathname === "/signin" && (
        <>
          <SigninForm />
          <Link to="/register">Registration</Link>
        </>
      )}
    </div>
  );
};

export default AuthForm;
