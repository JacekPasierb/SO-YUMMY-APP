import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import css from "./MyRecipesList.module.css";
import CardOwnRecipe from "../CardOwnRecipe/CardOwnRecipe";
const MyRecipesList = ({ recipes }) => {
    return (_jsx(_Fragment, { children: recipes && (_jsx("ul", { className: css.myRecipesList, children: recipes.map((recipe) => {
                return (_jsx("li", { children: _jsx(CardOwnRecipe, { ownRecipe: recipe }) }, recipe._id));
            }) })) }));
};
export default MyRecipesList;
