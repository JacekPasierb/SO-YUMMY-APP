import React from "react";
import { Link } from "react-router-dom";
import css from "./AuthNav.module.css";
const AuthNav = () => {
    return (React.createElement(React.Fragment, null,
        React.createElement("nav", { className: css.navigation },
            React.createElement(Link, { className: `${css.link} ${css.linkRegister} ${css.linkText}`, to: "/register" }, "Registration"),
            React.createElement(Link, { className: `${css.link}  ${css.linkSignin} ${css.linkText}`, to: "/signin" }, "Sign in"))));
};
export default AuthNav;
