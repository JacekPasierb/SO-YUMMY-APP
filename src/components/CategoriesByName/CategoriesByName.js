import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import css from "./CategoriesByName.module.css";
import { useEffect } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectIsLoading, selectRecipesByCategory, selectTotalRecipes, } from "../../redux/recipes/selectors";
import { getRecipesByCategory } from "../../redux/recipes/operations";
import { getPageFromQueryString } from "../../helpers/getPageFromQueryString";
import BasicPagination from "../Pagination/BasicPagination";
import CardRecipe from "../CardRecipe/CardRecipe";
import { Loader } from "../Loader/Loader";
const CategoriesByName = () => {
    const { categoryName } = useParams();
    const currentPage = getPageFromQueryString();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const recipes = useSelector(selectRecipesByCategory);
    const totalRecipes = useSelector(selectTotalRecipes);
    const isLoading = useSelector(selectIsLoading);
    const handlePageChange = (page) => {
        navigate(`?page=${page}`);
        window.scrollTo(0, 0);
    };
    useEffect(() => {
        let category;
        if (categoryName === ":categoryName" || "") {
            category = "Beef";
            navigate(`/categories/Beef`);
        }
        else {
            category = categoryName;
        }
        const request = { category, page: currentPage };
        dispatch(getRecipesByCategory(request));
    }, [dispatch, categoryName, currentPage]);
    return (_jsxs(_Fragment, { children: [isLoading ? (_jsx(Loader, {})) : (recipes && (_jsx("ul", { className: css.recipesList, children: recipes.map((recipe) => {
                    return (_jsx("li", { className: css.recipesListItem, children: _jsx(NavLink, { to: `/recipe/${recipe._id}`, children: _jsx(CardRecipe, { title: recipe.title, preview: recipe.preview }) }) }, `${recipe._id}`));
                }) }))), !isLoading && (_jsx(BasicPagination, { count: Math.ceil(totalRecipes / 8), page: currentPage, onPageChange: handlePageChange }))] }));
};
export default CategoriesByName;
