import { jsx as _jsx } from "react/jsx-runtime";
import css from "./ButtonOtherCategories.module.css";
import { NavLink } from "react-router-dom";
const ButtonOtherCategories = ({ text }) => {
    return (_jsx(NavLink, { to: `/categories/:categoryName`, className: css.btn, children: text }));
};
export default ButtonOtherCategories;
