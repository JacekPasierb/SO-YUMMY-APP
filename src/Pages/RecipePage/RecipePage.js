import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import css from "./RecipePage.module.css";
import { lazy, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReceipePageHero from "../../components/ReceipePageHero/ReceipePageHero";
import Header from "../../components/Header/Header";
import { fetchRecipeById } from "../../API/recipesAPI";
import { toast } from "react-toastify";
const RecipeInngredientsList = lazy(() => import("../../components/RecipeInngredientsList/RecipeInngredientsList"));
const RecipePreparation = lazy(() => import("../../components/RecipePreparation/RecipePreparation"));
const RecipePage = () => {
    const { recipeId } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [recipe, setRecipe] = useState(null);
    useEffect(() => {
        const getRecipeById = async (id) => {
            try {
                setIsLoading(true);
                const { data } = await fetchRecipeById(id);
                setRecipe(data.result);
            }
            catch (error) {
                setError(error.message);
                toast.error("Something went wrong. Plese try again...");
            }
            finally {
                setIsLoading(false);
            }
        };
        if (recipeId !== undefined) {
            getRecipeById(recipeId);
        }
    }, [recipeId]);
    return (_jsxs(_Fragment, { children: [isLoading ? (_jsx("p", { children: "Loading recipe..." })) : (recipe && (_jsxs("main", { children: [_jsxs("section", { className: css.receipePage, children: [_jsx(Header, {}), _jsx("div", { className: css.container, children: _jsx(ReceipePageHero, { recipe: recipe }) })] }), _jsx(RecipeInngredientsList, { ingredients: recipe.ingredients }), _jsx(RecipePreparation, { img: recipe.preview, instructions: recipe.instructions })] }))), error && _jsx("p", { children: "Something went wrong.. try again" })] }));
};
export default RecipePage;
