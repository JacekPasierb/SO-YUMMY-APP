import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import css from "./FavoritesPage.module.css";
import { useEffect } from "react";
import Header from "../../components/Header/Header";
import MainTitle from "../../components/MainTitle/PageTitle";
import MyRecipesList from "../../components/MyRecipesList/MyRecipesList";
import { useSelector } from "react-redux";
import { selectFavoriteRecipes, selectIsError, selectIsLoading, selectTotalFavoritesRecipes, } from "../../redux/favoriteRecipes/selectors";
import { useAppDispatch } from "../../redux/store";
import { getFavoriteRecipes } from "../../redux/favoriteRecipes/operations";
import { ClimbingBoxLoader } from "react-spinners";
import BasicPagination from "../../components/Pagination/BasicPagination";
import { useNavigate } from "react-router";
import { getPageFromQueryString } from "../../helpers/getPageFromQueryString";
const FavoritesPage = () => {
    const dispatch = useAppDispatch();
    const favoriteRecipes = useSelector(selectFavoriteRecipes);
    const totalFavoriteRecipes = useSelector(selectTotalFavoritesRecipes);
    const isLoading = useSelector(selectIsLoading);
    const isError = useSelector(selectIsError);
    const currentPage = getPageFromQueryString();
    const navigate = useNavigate();
    const handlePageChange = (page) => {
        navigate(`?page=${page}`);
        window.scrollTo(0, 0);
    };
    useEffect(() => {
        if (currentPage !== undefined) {
            dispatch(getFavoriteRecipes({ page: currentPage }));
        }
    }, [dispatch, currentPage]);
    return (_jsxs(_Fragment, { children: [_jsx(Header, {}), _jsx("main", { className: css.background, children: _jsxs("div", { className: `${css.container} ${css.flex}`, children: [_jsx(MainTitle, { title: "Favorites" }), isLoading ? (_jsx("div", { className: css.boxLoader, children: _jsx(ClimbingBoxLoader, {}) })) : (favoriteRecipes && (_jsxs(_Fragment, { children: [_jsx(MyRecipesList, { recipes: favoriteRecipes }), _jsx(BasicPagination, { count: Math.ceil(totalFavoriteRecipes / 4), page: currentPage, onPageChange: handlePageChange })] })))] }) })] }));
};
export default FavoritesPage;
