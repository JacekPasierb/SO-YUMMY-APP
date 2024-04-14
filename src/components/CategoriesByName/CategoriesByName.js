import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from "react";
import BasicPagination from "../Pagination/BasicPagination";
import CardRecipe from "../CardRecipe/CardRecipe";
import css from "./CategoriesByName.module.css";
import { getPageFromQueryString } from "../../helpers/getPageFromQueryString";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectCategoryRecipes, selectIsLoading, selectTotalRecipes, } from "../../redux/recipes/selectors";
import { getCategoryRecipes } from "../../redux/recipes/operations";
const CategoriesByName = () => {
    const { categoryName } = useParams();
    const currentPage = getPageFromQueryString();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const recipes = useSelector(selectCategoryRecipes);
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
        dispatch(getCategoryRecipes(request));
    }, [dispatch, categoryName, currentPage]);
    return (_jsxs(_Fragment, { children: [isLoading ? (_jsx("p", { children: "Loading recipes..." })) : (recipes && (_jsx("ul", { className: css.recipesList, children: recipes.map((recipe) => {
                    return (_jsx("li", { className: css.recipesListItem, children: _jsx(NavLink, { to: `/recipe/${recipe._id}`, children: _jsx(CardRecipe, { dish: recipe }) }) }, `${recipe._id}`));
                }) }))), _jsx(BasicPagination, { count: Math.ceil(totalRecipes / 8), page: currentPage, onPageChange: handlePageChange })] }));
};
export default CategoriesByName;
