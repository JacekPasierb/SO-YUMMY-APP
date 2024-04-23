import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import css from "./AuthForm.module.css";
import { Suspense, lazy } from "react";
import { Link, useLocation } from "react-router-dom";
const SigninForm = lazy(() => import("../SigninForm/SigninForm"));
const RegisterForm = lazy(() => import("../RegisterForm/RegisterForm"));
const AuthForm = () => {
    const location = useLocation();
    const { pathname } = location;
    return (_jsxs(_Fragment, { children: [pathname === "/register" && (_jsxs(_Fragment, { children: [_jsx(Suspense, { fallback: _jsx("div", { children: "Loading..." }), children: _jsx(RegisterForm, {}) }), _jsx(Link, { className: css.linkForm, to: "/signin", children: "Sign in" })] })), pathname === "/signin" && (_jsxs(_Fragment, { children: [_jsx(Suspense, { fallback: _jsx("div", { children: "Loading..." }), children: _jsx(SigninForm, {}) }), _jsx(Link, { className: css.linkForm, to: "/register", children: "Registration" })] }))] }));
};
export default AuthForm;
