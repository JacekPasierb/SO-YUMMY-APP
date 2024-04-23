import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import css from "./SharedLayout.module.css";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
import Copyrights from "../Copyrights/Copyrights";
const SharedLayout = () => {
    return (_jsxs("div", { className: css.bg, children: [_jsx(Suspense, { fallback: _jsx("div", { children: "Loading..." }), children: _jsx(Outlet, {}) }), _jsx(Footer, {}), _jsx(Copyrights, {})] }));
};
export default SharedLayout;
