import { jsx as _jsx } from "react/jsx-runtime";
import css from "./MainPageTitle.module.css";
const MainPageTitle = ({ title }) => {
    return _jsx("h2", { className: css.mainPageTitle, children: title });
};
export default MainPageTitle;
