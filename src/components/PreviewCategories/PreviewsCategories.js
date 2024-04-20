import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from "react";
import css from "./PreviewsCategories.module.css";
import { useMediaQuery } from "@react-hook/media-query";
import CardRecipe from "../CardRecipe/CardRecipe";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPopularRecipes } from "../../redux/recipes/operations";
import { selectIsLoading, selectPopularRecipes, } from "../../redux/recipes/selectors";
import TitleCategories from "../TitleCategories/TitleCategories";
const PreviewsCategories = () => {
    const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 1200px)");
    const isDesctop = useMediaQuery("(min-width:1200px)");
    const dispatch = useDispatch();
    const recipesByMainCategory = useSelector(selectPopularRecipes);
    const isLoading = useSelector(selectIsLoading);
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
                return (_jsxs("li", { className: css.categoriesListItem, children: [_jsx(TitleCategories, { categories: categories }), _jsxs("ul", { className: css.recipesList, children: [console.log("recipes", recipes), recipes &&
                                    recipes.map((recipe) => {
                                        console.log("re", recipe);
                                        return (_jsx("li", { className: css.recipesListItem, children: _jsx(NavLink, { to: `/recipe/${recipe._id}`, children: _jsx(CardRecipe, { dish: recipe }) }) }, `${recipe._id}`));
                                    })] }), _jsx(NavLink, { to: `/categories/${categories.charAt(0).toUpperCase() + categories.slice(1)}`, className: css.btnCategories, children: "See all" })] }, `${categories}-${idx}`));
            })) }));
};
export default PreviewsCategories;
