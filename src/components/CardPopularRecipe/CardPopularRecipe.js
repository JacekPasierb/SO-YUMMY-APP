import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import css from "./CardPopularRecipe.module.css";
const CardPopularRecipe = ({ recipe }) => {
    const { preview, title, description } = recipe;
    return (_jsxs("div", { className: css.cardBox, children: [_jsx("img", { src: preview, width: "104", height: "85", className: css.recipeImg, alt: "recipe photo" }), _jsxs("div", { className: css.recipeInfo, children: [_jsx("h2", { className: css.titleRecipe, children: title }), _jsx("p", { className: css.recipeDescription, children: description })] })] }));
};
export default CardPopularRecipe;
