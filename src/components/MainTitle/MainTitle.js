import { jsx as _jsx } from "react/jsx-runtime";
import css from "./MainTitle.module.css";
const MainTitle = ({ title }) => {
    return (_jsx("div", { className: css.bgTitle, children: _jsx("h2", { className: css.mainTitle, children: title }) }));
};
export default MainTitle;
