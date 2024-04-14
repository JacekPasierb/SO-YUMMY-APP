import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Footer from "../Footer/Footer";
import css from "./SharedLayout.module.css";
import Copyrights from "../Copyrights/Copyrights";
import { Outlet } from "react-router-dom";
const SharedLayout = () => {
    return (_jsxs("div", { className: css.bg, children: [_jsx(Outlet, {}), _jsx(Footer, {}), _jsx(Copyrights, {})] }));
};
export default SharedLayout;
