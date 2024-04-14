import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ColorRing } from "react-loader-spinner";
import css from "./Loader.module.css";
import icon from "../../assets/icons/sprite.svg";
export const Loader = () => {
    return (_jsxs("div", { className: css["loader"], children: [_jsx("svg", { className: css["loader-icon"], width: "18", height: "18", children: _jsx("use", { href: icon + `#icon-logoTablet` }) }), _jsx(ColorRing, { visible: true, height: "160", width: "160", ariaLabel: "blocks-loading", wrapperStyle: {}, wrapperClass: "blocks-wrapper", colors: ["#24CCA7", "#4a56e2", "#24CCA7", "#4a56e2", "#24CCA7"] })] }));
};
