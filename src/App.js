import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Suspense, lazy, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
const WelcomePage = lazy(() => import("./Pages/WelcomePage/WelcomePage"));
const RegisterPage = lazy(() => import("./Pages/RegisterPage/RegisterPage"));
const SigninPage = lazy(() => import("./Pages/SigninPage/SigninPage"));
const MainPage = lazy(() => import("./Pages/MainPage/MainPage"));
const CategoriesPage = lazy(() => import("./Pages/CategoriesPage/CategoriesPage"));
const RecipePage = lazy(() => import("./Pages/RecipePage/RecipePage"));
const AddRecipePage = lazy(() => import("./Pages/AddRecipePage/AddRecipePage"));
const FavoritesPage = lazy(() => import("./Pages/FavoritesPage/FavoritesPage"));
const SharedLayout = lazy(() => import("./components/SharedLayout/SharedLayout"));
const CategoriesByName = lazy(() => import("./components/CategoriesByName/CategoriesByName"));
import RestrictedRoute from "./components/RestrictedRoute/RestrictedRoute";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import { Loader } from "./components/Loader/Loader";
import { refreshUser } from "./redux/auth/operations";
import { selectIsRefreshing } from "./redux/auth/selectors";
import { selectTheme } from "./redux/global/globalSelectors";
import MyRecipesPage from "./Pages/MyRecipesPage/MyRecipesPage";
const App = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const { pathname, search } = location;
    const isRefreshing = useSelector(selectIsRefreshing);
    const theme = useSelector(selectTheme);
    useEffect(() => {
        navigate(`${pathname}${search}`, { replace: true });
    }, [navigate, pathname, search]);
    useEffect(() => {
        dispatch(refreshUser());
    }, [dispatch]);
    useEffect(() => {
        document.body.className = theme === "light" ? "light" : "dark-theme";
    }, [theme]);
    return isRefreshing ? (_jsx(Loader, {})) : (_jsx(_Fragment, { children: _jsxs(Routes, { children: [_jsx(Route, { path: "/welcome", element: _jsx(RestrictedRoute, { redirectTo: "/", component: _jsx(Suspense, { fallback: _jsx(Loader, {}), children: _jsx(WelcomePage, {}) }) }) }), _jsx(Route, { path: "/register", element: _jsx(RestrictedRoute, { redirectTo: "/", component: _jsx(Suspense, { fallback: _jsx(Loader, {}), children: _jsx(RegisterPage, {}) }) }) }), _jsx(Route, { path: "/signin", element: _jsx(RestrictedRoute, { redirectTo: "/", component: _jsx(Suspense, { fallback: _jsx(Loader, {}), children: _jsx(SigninPage, {}) }) }) }), _jsxs(Route, { path: "/", element: _jsx(PrivateRoute, { component: _jsx(Suspense, { fallback: _jsx(Loader, {}), children: _jsx(SharedLayout, {}) }) }), children: [_jsx(Route, { index: true, element: _jsx(PrivateRoute, { component: _jsx(MainPage, {}) }) }), _jsx(Route, { path: "/categories", element: _jsx(PrivateRoute, { component: _jsx(CategoriesPage, {}) }), children: _jsx(Route, { path: ":categoryName", element: _jsx(CategoriesByName, {}) }) }), _jsx(Route, { path: "/favorite", element: _jsx(PrivateRoute, { component: _jsx(FavoritesPage, {}) }) }), _jsx(Route, { path: "/ownRecipes", element: _jsx(PrivateRoute, { component: _jsx(MyRecipesPage, {}) }) }), _jsx(Route, { path: "/add", element: _jsx(PrivateRoute, { component: _jsx(AddRecipePage, {}) }) }), _jsx(Route, { path: "/recipe/:recipeId", element: _jsx(PrivateRoute, { component: _jsx(RecipePage, {}) }) }), _jsx(Route, { path: "/search", element: _jsx(PrivateRoute, { component: "" }) }), _jsx(Route, { path: "/shopping-list", element: _jsx(PrivateRoute, { component: "" }) })] })] }) }));
};
export default App;
