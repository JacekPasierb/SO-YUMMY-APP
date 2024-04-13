import React, { useEffect } from "react";
import { useParams } from "react-router";
import ReceipePageHero from "../../components/ReceipePageHero/ReceipePageHero";
import css from "./RecipePage.module.css";
import Header from "../../components/Header/Header";
import RecipeInngredientsList from "../../components/RecipeInngredientsList/RecipeInngredientsList";
import RecipePreparation from "../../components/RecipePreparation/RecipePreparation";
import { useDispatch, useSelector } from "react-redux";
import { selectIsLoading, selectRecipeById, } from "../../redux/recipes/selectors";
import { getRecipeById } from "../../redux/recipes/operations";
const RecipePage = () => {
    const { recipeId } = useParams();
    const dispatch = useDispatch();
    const recipe = useSelector(selectRecipeById);
    const isLoading = useSelector(selectIsLoading);
    useEffect(() => {
        dispatch(getRecipeById(recipeId));
    }, [dispatch, recipeId]);
    const { ingredients, thumb, instructions, preview } = recipe;
    return (React.createElement(React.Fragment, null, isLoading ? (React.createElement("p", null, "Loading recipe...")) : (recipe && (React.createElement("main", null,
        React.createElement("section", { className: css.receipePage },
            React.createElement(Header, null),
            React.createElement("div", { className: css.container },
                React.createElement(ReceipePageHero, { recipe: recipe }))),
        React.createElement(RecipeInngredientsList, { ingredients: ingredients }),
        React.createElement(RecipePreparation, { img: preview, instructions: instructions }))))));
};
export default RecipePage;
