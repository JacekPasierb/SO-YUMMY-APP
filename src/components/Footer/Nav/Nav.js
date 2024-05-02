import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from "react-router-dom";
import css from "./Nav.module.css";
const Nav = () => {
    return (_jsx("nav", { className: css.navigationMain, children: _jsxs("ul", { className: css.navigationList, children: [_jsx("li", { className: css.navigationListItem, children: _jsx(Link, { to: "/search", className: css.link, children: "Ingredients" }) }), _jsx("li", { className: css.navigationListItem, children: _jsx(Link, { to: "/add", className: css.link, children: "AddRecipes" }) }), _jsx("li", { className: css.navigationListItem, children: _jsx(Link, { to: "/ownRecipes", className: css.link, children: "MyRecipes" }) }), _jsx("li", { className: css.navigationListItem, children: _jsx(Link, { to: "/favorite", className: css.link, children: "Favorite" }) }), _jsx("li", { className: css.navigationListItem, children: _jsx(Link, { to: "/shopping-list", className: css.link, children: "Shopping List" }) })] }) }));
};
export default Nav;
