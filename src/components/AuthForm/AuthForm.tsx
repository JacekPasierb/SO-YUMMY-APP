import css from "./AuthForm.module.css";

import React, { FC, Suspense, lazy } from "react";
import { Link, useLocation } from "react-router-dom";

const SigninForm = lazy(() => import("../SigninForm/SigninForm"));
const RegisterForm = lazy(() => import("../RegisterForm/RegisterForm"));

const AuthForm: FC = () => {
  const location = useLocation();
  const { pathname } = location;

  return (
    <>
      {pathname === "/register" && (
        <>
          <Suspense fallback={<div>Loading...</div>}>
            <RegisterForm />
          </Suspense>
          <Link className={css.linkForm} to="/signin">
            Sign in
          </Link>
        </>
      )}
      {pathname === "/signin" && (
        <>
          <Suspense fallback={<div>Loading...</div>}>
            <SigninForm />
          </Suspense>
          <Link className={css.linkForm} to="/register">
            Registration
          </Link>
        </>
      )}
    </>
  );
};

export default AuthForm;
