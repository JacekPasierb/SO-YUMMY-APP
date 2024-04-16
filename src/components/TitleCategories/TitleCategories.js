import { jsx as _jsx } from "react/jsx-runtime";
import css from "./TitleCategories.module.css";
const TitleCategories = ({ categories }) => {
    return (_jsx("h2", { className: css.titleCategories, children: categories.charAt(0).toUpperCase() + categories.slice(1) }));
};
export default TitleCategories;
