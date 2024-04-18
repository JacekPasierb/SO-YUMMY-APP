import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect } from "react";
import ReceipePageHero from "../../components/ReceipePageHero/ReceipePageHero";
import css from "./RecipePage.module.css";
import Header from "../../components/Header/Header";
import RecipeInngredientsList from "../../components/RecipeInngredientsList/RecipeInngredientsList";
import RecipePreparation from "../../components/RecipePreparation/RecipePreparation";
import { useDispatch, useSelector } from "react-redux";
import { selectIsLoading, selectRecipeById, } from "../../redux/recipes/selectors";
import { getRecipeById } from "../../redux/recipes/operations";
import { useParams } from "react-router-dom";
const RecipePage = () => {
    const { recipeId } = useParams();
    const dispatch = useDispatch();
    const recipe = useSelector(selectRecipeById);
    const isLoading = useSelector(selectIsLoading);
    useEffect(() => {
        if (recipeId !== undefined) {
            dispatch(getRecipeById({ id: recipeId }));
        }
    }, [dispatch, recipeId]);
    const { ingredients, thumb, instructions, preview } = recipe;
    return (_jsx(_Fragment, { children: isLoading ? (_jsx("p", { children: "Loading recipe..." })) : (recipe && (_jsxs("main", { children: [_jsxs("section", { className: css.receipePage, children: [_jsx(Header, {}), _jsx("div", { className: css.container, children: _jsx(ReceipePageHero, { recipe: recipe }) })] }), _jsx(RecipeInngredientsList, { ingredients: ingredients }), _jsx(RecipePreparation, { img: preview, instructions: instructions })] }))) }));
};
export default RecipePage;
