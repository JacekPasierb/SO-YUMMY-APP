import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import css from "./CardOwnRecipe.module.css";
import sprite from "../../assets/icons/sprite.svg";
const CardOwnRecipe = ({ ownRecipe }) => {
    return (_jsxs("div", { className: css.cardBox, children: [_jsx("img", { src: ownRecipe.preview, width: "124", height: "124", className: css.recipeImg, alt: "recipe photo" }), _jsxs("div", { className: css.recipeInfo, children: [_jsxs("div", { className: css.rowFirst, children: [_jsx("h2", { className: css.titleRecipe, children: ownRecipe.title }), _jsx("svg", { className: css.iconDelete, children: _jsx("use", { href: sprite + `#icon-trash-01`, width: "14px", height: "14px" }) })] }), _jsx("p", { className: css.recipeDescription, children: ownRecipe.description }), _jsxs("div", { className: css.row, children: [_jsxs("p", { className: css.recipeTime, children: [ownRecipe.time, " min"] }), " ", _jsx("button", { className: `${css.recipeSeeBtn} ${css.txtBtn}`, children: "See recipes" })] })] })] }));
};
export default CardOwnRecipe;
