import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import css from "./PreviewsCategories.module.css";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useMediaQuery } from "@react-hook/media-query";
import { useDispatch, useSelector } from "react-redux";
import { getPopularRecipes } from "../../redux/recipes/operations";
import { selectIsLoading, selectPopularRecipes, } from "../../redux/recipes/selectors";
import CardRecipe from "../CardRecipe/CardRecipe";
import TitleCategories from "../TitleCategories/TitleCategories";
const PreviewsCategories = () => {
    const dispatch = useDispatch();
    const recipesByMainCategory = useSelector(selectPopularRecipes);
    const isLoading = useSelector(selectIsLoading);
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
            count = 1;
        }
        dispatch(getPopularRecipes({ count }));
    }, [dispatch, isDesctop, isTablet]);
    return (_jsx("ul", { className: css.categoriesList, children: isLoading ? (_jsx("p", { children: "Loading..." })) : (recipesByMainCategory &&
            Object.entries(recipesByMainCategory).map(([categories, recipes], idx) => {
                return (_jsxs("li", { className: css.categoriesListItem, children: [_jsx(TitleCategories, { categories: categories }), _jsx("ul", { className: css.recipesList, children: recipes &&
                                recipes.map((recipe) => {
                                    return (_jsx("li", { className: css.recipesListItem, children: _jsx(NavLink, { to: `/recipe/${recipe._id}`, children: _jsx(CardRecipe, { title: recipe.title, preview: recipe.preview }) }) }, `${recipe._id}`));
                                }) }), _jsx(NavLink, { to: `/categories/${categories.charAt(0).toUpperCase() + categories.slice(1)}`, className: css.btnCategories, children: "See all" })] }, `${categories}-${idx}`));
            })) }));
};
export default PreviewsCategories;
