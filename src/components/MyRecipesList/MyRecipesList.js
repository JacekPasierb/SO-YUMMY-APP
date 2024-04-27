import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import css from "./MyRecipesList.module.css";
import CardOwnRecipe from "../CardOwnRecipe/CardOwnRecipe";
const MyRecipesList = ({ ownRecipes }) => {
    return (_jsx(_Fragment, { children: ownRecipes && (_jsx("ul", { className: css.myRecipesList, children: ownRecipes.map((ownRecipe) => {
                return (_jsx("li", { children: _jsx(CardOwnRecipe, { ownRecipe: ownRecipe }) }, ownRecipe._id));
            }) })) }));
};
export default MyRecipesList;
