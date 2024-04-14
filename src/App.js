import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect } from "react";
import WelcomePage from "./Pages/WelcomePage/WelcomePage";
import RegisterPage from "./Pages/RegisterPage/RegisterPage";
import SigninPage from "./Pages/SigninPage/SigninPage";
import SharedLayout from "./components/SharedLayout/SharedLayout";
import MainPage from "./Pages/MainPage/MainPage";
import RestrictedRoute from "./components/RestrictedRoute/RestrictedRoute";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import { useDispatch, useSelector } from "react-redux";
import { refreshUser } from "./redux/auth/operations";
import { selectIsRefreshing } from "./redux/auth/selectors";
import { Loader } from "./components/Loader/Loader";
import { selectTheme } from "./redux/global/globalSelectors";
import CategoriesPage from "./Pages/CategoriesPage/CategoriesPage";
import CategoriesByName from "./components/CategoriesByName/CategoriesByName";
import RecipePage from "./Pages/RecipePage/RecipePage";
import AddRecipePage from "./Pages/AddRecipePage/AddRecipePage";
import FavoritesPage from "./Pages/FavoritesPage/FavoritesPage";
import { Route, Routes, useLocation } from "react-router-dom";
const App = () => {
    const dispatch = useDispatch();
    const isRefreshing = useSelector(selectIsRefreshing);
    const location = useLocation();
    const { pathname } = location;
    useEffect(() => {
        dispatch(refreshUser());
    }, []);
    const theme = useSelector(selectTheme);
    useEffect(() => {
        document.body.className = theme === "light" ? "light" : "dark-theme";
    }, [theme]);
    return isRefreshing ? (_jsx(Loader, {})) : (_jsx(_Fragment, { children: _jsxs(Routes, { children: [_jsx(Route, { path: "/welcome", element: _jsx(RestrictedRoute, { redirectTo: "/", component: _jsx(WelcomePage, {}) }) }), _jsx(Route, { path: "/register", element: _jsx(RestrictedRoute, { redirectTo: "/", component: _jsx(RegisterPage, {}) }) }), _jsx(Route, { path: "/signin", element: _jsx(RestrictedRoute, { redirectTo: "/", component: _jsx(SigninPage, {}) }) }), _jsxs(Route, { path: "/", element: _jsx(PrivateRoute, { component: _jsx(SharedLayout, {}) }), children: [_jsx(Route, { index: true, element: _jsx(PrivateRoute, { component: _jsx(MainPage, {}) }) }), _jsx(Route, { path: "/categories", element: _jsx(PrivateRoute, { component: _jsx(CategoriesPage, {}) }), children: _jsx(Route, { path: ":categoryName", element: _jsx(CategoriesByName, {}) }) }), _jsx(Route, { path: "/favorite", element: _jsx(PrivateRoute, { component: _jsx(FavoritesPage, {}) }) }), _jsx(Route, { path: "/my", element: _jsx(PrivateRoute, { component: "" }) }), _jsx(Route, { path: "/add", element: _jsx(PrivateRoute, { component: _jsx(AddRecipePage, {}) }) }), _jsx(Route, { path: "/recipe/:recipeId", element: _jsx(PrivateRoute, { component: _jsx(RecipePage, {}) }) }), _jsx(Route, { path: "/search", element: _jsx(PrivateRoute, { component: "" }) }), _jsx(Route, { path: "/shopping-list", element: _jsx(PrivateRoute, { component: "" }) })] })] }) }));
};
export default App;
