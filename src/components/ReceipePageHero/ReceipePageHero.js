import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import css from "./ReceipePageHero.module.css";
import sprite from "../../assets/icons/sprite.svg";
import MainPageTitle from "../MainPageTitle/MainPageTitle";
const ReceipePageHero = ({ recipe }) => {
    const { title, description, time } = recipe;
    return (_jsxs("div", { className: css.receipeHeroBox, children: [_jsx(MainPageTitle, { title: title }), _jsx("p", { className: css.recipeDescription, children: description }), _jsx("button", { type: "button", className: css.btn, children: _jsx("span", { className: css.textBtn, children: "Add to favotite recipes" }) }), time && (_jsxs("div", { className: css.timeBox, children: [_jsx("svg", { className: css.iconClock, children: _jsx("use", { href: sprite + `#icon-clock` }) }), _jsxs("p", { className: css.timeText, children: [time, " min"] })] }))] }));
};
export default ReceipePageHero;
