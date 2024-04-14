import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import css from "./FollowUs.module.css";
import { Link } from "react-router-dom";
import sprite from "../../../assets/icons/sprite.svg";
const FollowUs = () => {
    return (_jsxs("ul", { className: css.listSocial, children: [_jsx("li", { children: _jsx(Link, { to: "#", children: _jsx("svg", { className: css.iconSocial, children: _jsx("use", { href: sprite + `#icon-fb` }) }) }) }), _jsx("li", { children: _jsx(Link, { to: "#", children: _jsx("svg", { className: css.iconSocial, children: _jsx("use", { href: sprite + `#icon-yb` }) }) }) }), _jsx("li", { children: _jsx(Link, { to: "#", children: _jsx("svg", { className: css.iconSocial, children: _jsx("use", { href: sprite + `#icon-twitter` }) }) }) }), _jsx("li", { children: _jsx(Link, { to: "#", children: _jsx("svg", { className: css.iconSocial, children: _jsx("use", { href: sprite + `#icon-insta` }) }) }) })] }));
};
export default FollowUs;
