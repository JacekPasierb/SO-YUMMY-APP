import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import css from "./CardOwnRecipe.module.css";
const CardOwnRecipe = ({ ownRecipe }) => {
    console.log("pp", ownRecipe);
    return (_jsxs("div", { className: css.cardBox, children: [_jsx("img", { src: ownRecipe.preview, width: "124", height: "124", alt: "recipe photo" }), _jsxs("div", { children: [_jsx("h2", { children: ownRecipe.title }), _jsx("p", { children: ownRecipe.description }), _jsxs("div", { className: css.row, children: [_jsxs("p", { children: [ownRecipe.time, " min"] }), " ", _jsx("button", { children: "See recipes" })] })] })] }));
};
export default CardOwnRecipe;
