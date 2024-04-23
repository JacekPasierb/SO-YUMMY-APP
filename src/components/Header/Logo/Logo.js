import { jsx as _jsx } from "react/jsx-runtime";
import css from "./Logo.module.css";
import logo from "../../../images/logo.png";
import { Link } from "react-router-dom";
const Logo = () => {
    return (_jsx(Link, { to: "/", className: css.link, children: _jsx("img", { src: logo, alt: "logo", width: "40", height: "40", className: css.iconLogo }) }));
};
export default Logo;
