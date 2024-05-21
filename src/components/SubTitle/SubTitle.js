import { jsx as _jsx } from "react/jsx-runtime";
import css from "./SubTitle.module.css";
const SubTitle = ({ title }) => {
    return _jsx("h2", { className: css.title, children: title });
};
export default SubTitle;
