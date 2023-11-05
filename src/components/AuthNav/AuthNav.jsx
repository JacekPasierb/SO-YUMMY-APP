import React from "react";
import { Link } from "react-router-dom";
import css from "./AuthNav.module.css";

const AuthNav = () => {
  return (
    <>
      <nav className={css.navigation}>
        <Link
          className={`${css.link} ${css.linkRegister} ${css.linkText}`}
          to="/register"
        >
          Registration
        </Link>
        <Link
          className={`${css.link}  ${css.linkSignin} ${css.linkText}`}
          to="/signin"
        >
          Sign in
        </Link>
      </nav>
    </>
  );
};

export default AuthNav;
