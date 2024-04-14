import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { NavLink } from "react-router-dom";
import css from "./NavigationMobile.module.css";
import sprite from "../../../assets/icons/sprite.svg";
const NavigationMobile = ({ onClose }) => {
    return (_jsxs("nav", { className: css.navigation, children: [_jsx(NavLink, { to: "/categories/:categoryName", className: css.link, children: _jsx("span", { className: css.navText, onClick: onClose, children: "Categories" }) }), _jsx(NavLink, { to: "/add", className: css.link, children: _jsx("span", { className: css.navText, onClick: onClose, children: "Add Recipes" }) }), _jsx(NavLink, { to: "/my", className: css.link, children: _jsx("span", { className: css.navText, onClick: onClose, children: "My Recipes" }) }), _jsx(NavLink, { to: "/favorite", className: css.link, children: _jsx("span", { className: css.navText, onClick: onClose, children: "Favorites" }) }), _jsx(NavLink, { to: "/shopping-list", className: css.link, children: _jsx("span", { className: css.navText, onClick: onClose, children: "Shopping List" }) }), _jsxs(NavLink, { to: "/search ", className: css.link, children: [_jsx("svg", { className: css.iconSearch, children: _jsx("use", { href: sprite + `#icon-search` }) }), _jsx("span", { className: css.navText, onClick: onClose, children: "Shearch" })] })] }));
};
export default NavigationMobile;
