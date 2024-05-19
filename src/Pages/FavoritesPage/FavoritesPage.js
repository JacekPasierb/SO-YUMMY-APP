import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import css from "./FavoritesPage.module.css";
import { useEffect } from "react";
import Header from "../../components/Header/Header";
import MainTitle from "../../components/MainTitle/MainTitle";
import MyRecipesList from "../../components/MyRecipesList/MyRecipesList";
import { useSelector } from "react-redux";
import { selectFavoriteRecipes, selectIsError, selectIsLoading, } from "../../redux/favoriteRecipes/selectors";
import { useAppDispatch } from "../../redux/store";
import { getFavoriteRecipes } from "../../redux/favoriteRecipes/operations";
import { ClimbingBoxLoader } from "react-spinners";
const FavoritesPage = () => {
    const dispatch = useAppDispatch();
    const favoriteRecipes = useSelector(selectFavoriteRecipes);
    const isLoading = useSelector(selectIsLoading);
    const isError = useSelector(selectIsError);
    useEffect(() => {
        dispatch(getFavoriteRecipes());
    }, [dispatch]);
    return (_jsxs(_Fragment, { children: [_jsx(Header, {}), _jsx("main", { className: css.background, children: _jsxs("div", { className: `${css.container} ${css.flex}`, children: [_jsx(MainTitle, { title: "Favorites" }), isLoading ? (_jsx("div", { className: css.boxLoader, children: _jsx(ClimbingBoxLoader, {}) })) : (favoriteRecipes && _jsx(MyRecipesList, { recipes: favoriteRecipes }))] }) })] }));
};
export default FavoritesPage;
