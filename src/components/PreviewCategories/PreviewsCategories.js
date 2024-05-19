import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import css from "./PreviewsCategories.module.css";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useMediaQuery } from "@react-hook/media-query";
import CardRecipe from "../CardRecipe/CardRecipe";
import TitleCategories from "../TitleCategories/TitleCategories";
import { fetchRecipesByFourCategories } from "../../API/recipesAPI";
import { toast } from "react-toastify";
import { ClimbingBoxLoader } from "react-spinners";
const PreviewsCategories = () => {
    const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 1200px)");
    const isDesctop = useMediaQuery("(min-width:1200px)");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [recipesMainCategories, setRecipesMainCategories] = useState();
    useEffect(() => {
        let count;
        if (isDesctop) {
            count = 4;
        }
        else if (isTablet) {
            count = 2;
        }
        else {
            count = 1;
        }
        const getRecipesByFourCategories = async () => {
            try {
                setIsLoading(true);
                const { data } = await fetchRecipesByFourCategories(count);
                setRecipesMainCategories(data);
            }
            catch (error) {
                setError(error.message);
                toast.error("Something went wrong. Plese try again...");
            }
            finally {
                setIsLoading(false);
            }
        };
        getRecipesByFourCategories();
    }, [isDesctop, isTablet]);
    return (_jsxs(_Fragment, { children: [error && _jsx("p", { children: "Something went wrong. Try again..." }), isLoading && _jsx("div", { className: css.boxLoader, children: _jsx(ClimbingBoxLoader, {}) }), _jsx("ul", { className: css.categoriesList, children: recipesMainCategories &&
                    Object.entries(recipesMainCategories).map(([categories, recipes], idx) => {
                        return (_jsxs("li", { className: css.categoriesListItem, children: [_jsx(TitleCategories, { categories: categories }), _jsx("ul", { className: css.recipesList, children: recipes &&
                                        recipes.map((recipe) => {
                                            return (_jsx("li", { className: css.recipesListItem, children: _jsx(NavLink, { to: `/recipe/${recipe._id}`, children: _jsx(CardRecipe, { title: recipe.title, preview: recipe.preview }) }) }, `${recipe._id}`));
                                        }) }), _jsx(NavLink, { to: `/categories/${categories.charAt(0).toUpperCase() + categories.slice(1)}`, className: css.btnCategories, children: "See all" })] }, `${categories}-${idx}`));
                    }) })] }));
};
export default PreviewsCategories;
