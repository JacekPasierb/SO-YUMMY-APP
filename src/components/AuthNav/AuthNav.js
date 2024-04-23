import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import css from "./AuthNav.module.css";
import { Link } from "react-router-dom";
const AuthNav = () => {
    return (_jsx(_Fragment, { children: _jsxs("nav", { className: css.navigation, children: [_jsx(Link, { className: `${css.link} ${css.linkRegister} ${css.linkText}`, to: "/register", children: "Registration" }), _jsx(Link, { className: `${css.link}  ${css.linkSignin} ${css.linkText}`, to: "/signin", children: "Sign in" })] }) }));
};
export default AuthNav;
