import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import css from "./ChooseYourBreakfast.module.css";
import recipesMobile from "../../images/recipesMobile1x.png";
import recipesTablet from "../../images/recipesTablet1x.png";
import recipesDesctop from "../../images/recipesDesctop1x.png";
import sprite from "../../assets/icons/sprite.svg";
import { useMediaQuery } from "@react-hook/media-query";
const ChooseYourBreakfast = () => {
    const isMobile = useMediaQuery("(max-width:767px)");
    const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 1200px)");
    const isDesctop = useMediaQuery("(min-width:1200px)");
    const recipes = () => {
        if (isMobile) {
            return recipesMobile;
        }
        else if (isTablet) {
            return recipesTablet;
        }
        else if (isDesctop) {
            return recipesDesctop;
        }
    };
    return (_jsxs("div", { className: css.box, children: [_jsx("img", { src: recipes(), alt: "picture dish", className: css.chooseBox }), _jsxs("div", { className: css.boxRecipes, children: [_jsxs("span", { className: css.fontRecipes, children: [_jsx("span", { className: css.fontRecipesInnerColor, children: "Delicious and healthy" }), "way to enjoy a variety of fresh ingredients in one satisfying meal"] }), _jsxs("button", { type: "button", className: css.btn, children: ["See recipes", " ", _jsx("svg", { className: css.icon, children: _jsx("use", { href: sprite + `#icon-arrow-narrow-right` }) })] })] })] }));
};
export default ChooseYourBreakfast;
