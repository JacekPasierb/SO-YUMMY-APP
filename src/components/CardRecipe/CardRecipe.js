import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import css from "./CardRecipe.module.css";
const CardRecipe = ({ dish }) => {
    return (_jsxs("div", { className: css.cardRecipe, children: [_jsx("img", { src: dish.preview, className: css.recipeIMG }), _jsx("div", { className: css.titleBox, children: _jsx("h3", { className: css.title, children: dish.title }) })] }));
};
export default CardRecipe;
