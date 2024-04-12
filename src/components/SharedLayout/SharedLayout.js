import React from "react";
import { Outlet } from "react-router";
import Footer from "../Footer/Footer";
import css from "./SharedLayout.module.css";
import Copyrights from "../Copyrights/Copyrights";
const SharedLayout = () => {
    return (React.createElement("div", { className: css.bg },
        React.createElement(Outlet, null),
        React.createElement(Footer, null),
        React.createElement(Copyrights, null)));
};
export default SharedLayout;
