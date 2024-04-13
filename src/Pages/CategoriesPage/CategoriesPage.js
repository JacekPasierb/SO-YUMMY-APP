import { Suspense, useEffect } from "react";
import css from "./CategoriesPage.module.css";
import { Outlet } from "react-router";
import CategoriesNav from "../../components/CategoriesNav/CategoriesNav";
import Header from "../../components/Header/Header";
import MainTitle from "../../components/MainTitle/MainTitle";
const CategoriesPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (React.createElement("main", { className: css.background },
        React.createElement(Header, null),
        React.createElement("div", { className: `${css.container} ${css.flex}` },
            React.createElement(MainTitle, { title: "Categories" }),
            React.createElement(CategoriesNav, null),
            React.createElement(Suspense, null,
                React.createElement(Outlet, null)))));
};
export default CategoriesPage;
