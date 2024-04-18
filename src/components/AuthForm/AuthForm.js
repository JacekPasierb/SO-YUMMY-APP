import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import SigninForm from "../SigninForm/SigninForm";
import RegisterForm from "../RegisterForm/RegisterForm";
import css from "./AuthForm.module.css";
import { Link, useLocation } from "react-router-dom";
const AuthForm = () => {
    const location = useLocation();
    const { pathname } = location;
    return (_jsxs(_Fragment, { children: [pathname === "/register" && (_jsxs(_Fragment, { children: [_jsx(RegisterForm, {}), " ", _jsx(Link, { className: css.linkForm, to: "/signin", children: "Sign in" })] })), pathname === "/signin" && (_jsxs(_Fragment, { children: [_jsx(SigninForm, {}), _jsx(Link, { className: css.linkForm, to: "/register", children: "Registration" })] }))] }));
};
export default AuthForm;
