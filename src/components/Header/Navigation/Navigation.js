import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import css from "./Navigation.module.css";
import sprite from "../../../assets/icons/sprite.svg";
import { NavLink } from "react-router-dom";
const Navigation = () => {
    return (_jsxs("nav", { className: css.navigation, children: [_jsx(NavLink, { to: "/categories/:categoryName", className: css.link, children: _jsx("span", { className: css.navText, children: "Categories" }) }), _jsx(NavLink, { to: "/add", className: css.link, children: _jsx("span", { className: css.navText, children: "Add Recipes" }) }), _jsx(NavLink, { to: "/my", className: css.link, children: _jsx("span", { className: css.navText, children: "My Recipes" }) }), _jsx(NavLink, { to: "/favorite", className: css.link, children: _jsx("span", { className: css.navText, children: "Favorites" }) }), _jsx(NavLink, { to: "/shopping-list", className: css.link, children: _jsx("span", { className: css.navText, children: "Shopping List" }) }), _jsx(NavLink, { to: "/search ", className: css.link, children: _jsx("svg", { className: css.iconSearch, children: _jsx("use", { href: sprite + `#icon-search` }) }) })] }));
};
export default Navigation;
