import React, { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router";
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
const App = () => {
    const dispatch = useDispatch();
    const isRefreshing = useSelector(selectIsRefreshing);
    const location = useLocation();
    const { pathname } = location;
    useEffect(() => {
        dispatch(refreshUser());
    }, [dispatch]);
    const theme = useSelector(selectTheme);
    useEffect(() => {
        document.body.className = theme === "light" ? null : "dark-theme";
    }, [theme]);
    return isRefreshing ? (React.createElement(Loader, null)) : (React.createElement(React.Fragment, null,
        React.createElement(Routes, null,
            React.createElement(Route, { path: "/welcome", element: React.createElement(RestrictedRoute, { redirectTo: "/", component: React.createElement(WelcomePage, null) }) }),
            React.createElement(Route, { path: "/register", element: React.createElement(RestrictedRoute, { redirectTo: "/", component: React.createElement(RegisterPage, null) }) }),
            React.createElement(Route, { path: "/signin", element: React.createElement(RestrictedRoute, { redirectTo: "/", component: React.createElement(SigninPage, null) }) }),
            React.createElement(Route, { path: "/", element: React.createElement(PrivateRoute, { component: React.createElement(SharedLayout, null) }) },
                React.createElement(Route, { index: true, element: React.createElement(PrivateRoute, { component: React.createElement(MainPage, null) }) }),
                React.createElement(Route, { path: "/categories", element: React.createElement(PrivateRoute, { component: React.createElement(CategoriesPage, null) }) },
                    React.createElement(Route, { path: ":categoryName", element: React.createElement(CategoriesByName, null) })),
                React.createElement(Route, { path: "/favorite", element: React.createElement(PrivateRoute, { component: React.createElement(FavoritesPage, null) }) }),
                React.createElement(Route, { path: "/my", element: React.createElement(PrivateRoute, { component: "" }) }),
                React.createElement(Route, { path: "/add", element: React.createElement(PrivateRoute, { component: React.createElement(AddRecipePage, null) }) }),
                React.createElement(Route, { path: "/recipe/:recipeId", element: React.createElement(PrivateRoute, { component: React.createElement(RecipePage, null) }) }),
                React.createElement(Route, { path: "/search", element: React.createElement(PrivateRoute, { component: "" }) }),
                React.createElement(Route, { path: "/shopping-list", element: React.createElement(PrivateRoute, { component: "" }) })))));
};
export default App;
