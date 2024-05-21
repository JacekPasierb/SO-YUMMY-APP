import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import css from "./CategoriesPage.module.css";
import { Suspense, useEffect } from "react";
import { Outlet } from "react-router-dom";
import CategoriesNav from "../../components/CategoriesNav/CategoriesNav";
import Header from "../../components/Header/Header";
import MainTitle from "../../components/MainTitle/PageTitle";
const CategoriesPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (_jsxs("main", { className: css.background, children: [_jsx(Header, {}), _jsxs("div", { className: `${css.container} ${css.flex}`, children: [_jsx(MainTitle, { title: "Categories" }), _jsx(CategoriesNav, {}), _jsx(Suspense, { children: _jsx(Outlet, {}) })] })] }));
};
export default CategoriesPage;
