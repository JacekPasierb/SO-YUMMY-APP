import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import css from "./PreviewsCategories.module.css";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useMediaQuery } from "@react-hook/media-query";
import CardRecipe from "../CardRecipe/CardRecipe";
import TitleCategories from "../TitleCategories/TitleCategories";
import { fetchRecipesByFourCategories } from "../../API/recipesAPI";
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
            }
            finally {
                setIsLoading(false);
            }
        };
        getRecipesByFourCategories();
    }, []);
    // dokonczyc ustawianie error i wyswietlanie error oraz wyswietlanie loading opracowac
    return (_jsx("ul", { className: css.categoriesList, children: isLoading ? (_jsx("p", { children: "Loading..." })) : (recipesMainCategories &&
            Object.entries(recipesMainCategories).map(([categories, recipes], idx) => {
                console.log("reccc", recipes);
                return (_jsxs("li", { className: css.categoriesListItem, children: [_jsx(TitleCategories, { categories: categories }), _jsx("ul", { className: css.recipesList, children: recipes &&
                                recipes.map((recipe) => {
                                    return (_jsx("li", { className: css.recipesListItem, children: _jsx(NavLink, { to: `/recipe/${recipe._id}`, children: _jsx(CardRecipe, { title: recipe.title, preview: recipe.preview }) }) }, `${recipe._id}`));
                                }) }), _jsx(NavLink, { to: `/categories/${categories.charAt(0).toUpperCase() + categories.slice(1)}`, className: css.btnCategories, children: "See all" })] }, `${categories}-${idx}`));
            })) }));
};
export default PreviewsCategories;
