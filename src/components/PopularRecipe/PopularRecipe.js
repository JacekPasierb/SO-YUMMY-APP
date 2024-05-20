import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import css from "./PopularRecipe.module.css";
import { fetchPopularRecipe } from "../../API/recipesAPI";
import CardPopularRecipe from "../CardPopularRecipe/CardPopularRecipe";
import { NavLink } from "react-router-dom";
import { useMediaQuery } from "@react-hook/media-query";
import { ClimbingBoxLoader } from "react-spinners";
const PopularRecipe = () => {
    const [popularRecipes, setPopularRecipes] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 1200px)");
    const isDesctop = useMediaQuery("(min-width:1200px)");
    useEffect(() => {
        let count;
        if (isDesctop) {
            count = 4;
        }
        else if (isTablet) {
            count = 2;
        }
        else {
            count = 4;
        }
        const getPopularRecipe = async () => {
            try {
                setIsLoading(true);
                const data = await fetchPopularRecipe(count);
                setPopularRecipes(data.popularRecipes);
            }
            catch (error) {
                console.error(`Error: ${error.message}`);
                setError(error.message);
            }
            finally {
                setIsLoading(false);
            }
        };
        getPopularRecipe();
    }, [isDesctop, isTablet]);
    return (_jsxs("div", { className: css.boxPopularRecipes, children: [_jsx("h2", { className: css.title, children: "Popular Recipes" }), isLoading && (_jsx("div", { className: css.boxLoader, children: _jsx(ClimbingBoxLoader, {}) })), error && _jsxs("p", { children: ["Error: ", error] }), popularRecipes.length === 0 ? (_jsx("p", { children: "Brak popularnych przepis\u00F3w w danym momencie" })) : (_jsx("ul", { className: css.popularRecipesList, children: popularRecipes.map((recipe) => (_jsx("li", { children: _jsx(NavLink, { to: `/recipe/${recipe._id}`, children: _jsx(CardPopularRecipe, { recipe: recipe }) }) }, recipe._id))) }))] }));
};
export default PopularRecipe;
