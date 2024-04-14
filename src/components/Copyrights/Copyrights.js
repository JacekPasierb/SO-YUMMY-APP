import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import css from "./Copyrights.module.css";
const Copyrights = () => {
    return (_jsx("div", { className: css.copyrightsBox, children: _jsx("div", { className: css.container, children: _jsxs("div", { className: css.textBox, children: [_jsx("span", { className: `${css.text} ${css.textMedium}`, children: "\u00A9 2023 All Rights Reserved." }), _jsx("span", { className: css.text, children: "Terms of Service" })] }) }) }));
};
export default Copyrights;
