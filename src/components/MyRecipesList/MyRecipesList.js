import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { useSelector } from "react-redux";
import { selectIsLoading, selectOwnRecipes, } from "../../redux/recipes/selectors";
import CardOwnRecipe from "../CardOwnRecipe/CardOwnRecipe";
const MyRecipesList = () => {
    const ownRecipes = useSelector(selectOwnRecipes);
    const isLoading = useSelector(selectIsLoading);
    console.log("prep", ownRecipes);
    return (_jsx(_Fragment, { children: isLoading ? (_jsx("p", { children: "Loading recipes..." })) : (ownRecipes && (_jsx("ul", { children: ownRecipes.map((ownRecipe) => {
                return (_jsx("li", { children: _jsx(CardOwnRecipe, { ownRecipe: ownRecipe }) }, ownRecipe._id));
            }) }))) }));
};
export default MyRecipesList;
