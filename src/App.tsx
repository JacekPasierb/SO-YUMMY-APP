import React, { FC, Suspense, lazy, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const WelcomePage = lazy(() => import("./Pages/WelcomePage/WelcomePage"));
const RegisterPage = lazy(() => import("./Pages/RegisterPage/RegisterPage"));
const SigninPage = lazy(() => import("./Pages/SigninPage/SigninPage"));
const MainPage = lazy(() => import("./Pages/MainPage/MainPage"));
const CategoriesPage = lazy(
  () => import("./Pages/CategoriesPage/CategoriesPage")
);
const RecipePage = lazy(() => import("./Pages/RecipePage/RecipePage"));
const AddRecipePage = lazy(() => import("./Pages/AddRecipePage/AddRecipePage"));
const FavoritesPage = lazy(() => import("./Pages/FavoritesPage/FavoritesPage"));

const SharedLayout = lazy(
  () => import("./components/SharedLayout/SharedLayout")
);
const CategoriesByName = lazy(
  () => import("./components/CategoriesByName/CategoriesByName")
);
import RestrictedRoute from "./components/RestrictedRoute/RestrictedRoute";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import { Loader } from "./components/Loader/Loader";

import { AppDispatch } from "./redux/store";
import { refreshUser } from "./redux/auth/operations";
import { selectIsRefreshing, selectTheme } from "./redux/auth/selectors";
import MyRecipesPage from "./Pages/MyRecipesPage/MyRecipesPage";
import { ThemeProvider } from "styled-components";
import { useAuth } from "./hooks/useAuth";

const App: FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname, search } = location;
  const isRefreshing = useSelector(selectIsRefreshing);

  const isDarktheme = useSelector(selectTheme);

  const { token } = useAuth();
  useEffect(() => {
    console.log("hello",token);
    
    if (token) {
      try {
        // Dekodowanie tokena JWT
        const decoded: any = jwtDecode(token);
        // Wyciąganie czasu wygaśnięcia z tokena (exp jest w sekundach)
        const expirationDate = new Date(decoded.exp * 1000); // Konwersja na milisekundy
        const now = Date.now();

        // Obliczamy, ile czasu zostało do wygaśnięcia tokena
        const timeUntilExpiration = expirationDate.getTime() - now;

        if (timeUntilExpiration > 0) {
          // Ustawiamy odliczanie do wygaśnięcia tokena
          const timeoutId = setTimeout(() => {
            navigate("/signin"); // Przekierowanie do strony logowania
          }, timeUntilExpiration);

          // Sprzątanie po zakończeniu komponentu
          return () => clearTimeout(timeoutId);
        } else {
          // Token już wygasł, przenieś użytkownika od razu
          navigate("/signin");
        }
        console.log("Token wygasa:", expirationDate); // Możesz wyświetlić to w konsoli
      } catch (error) {
        console.error("Błąd dekodowania tokena:", error);
      }
    }
  }, [token, navigate]);

  useEffect(() => {
    navigate(`${pathname}${search}`, { replace: true });
  }, [navigate, pathname, search]);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  useEffect(() => {
    document.body.className = isDarktheme ? "dark-theme" : "";
  }, [isDarktheme]);

  return isRefreshing ? (
    <Loader />
  ) : (
    <>
      <Routes>
        <Route
          path="/welcome"
          element={
            <RestrictedRoute
              redirectTo="/"
              component={
                <Suspense fallback={<Loader />}>
                  <WelcomePage />
                </Suspense>
              }
            />
          }
        />
        <Route
          path="/register"
          element={
            <RestrictedRoute
              redirectTo="/"
              component={
                <Suspense fallback={<Loader />}>
                  <RegisterPage />
                </Suspense>
              }
            />
          }
        />
        <Route
          path="/signin"
          element={
            <RestrictedRoute
              redirectTo="/"
              component={
                <Suspense fallback={<Loader />}>
                  <SigninPage />
                </Suspense>
              }
            />
          }
        />

        <Route
          path="/"
          element={
            <PrivateRoute
              component={
                <Suspense fallback={<Loader />}>
                  <SharedLayout />
                </Suspense>
              }
            />
          }
        >
          <Route index element={<PrivateRoute component={<MainPage />} />} />
          <Route
            path="/categories"
            element={<PrivateRoute component={<CategoriesPage />} />}
          >
            <Route path=":categoryName" element={<CategoriesByName />} />
          </Route>
          <Route
            path="/favorite"
            element={<PrivateRoute component={<FavoritesPage />} />}
          />
          <Route
            path="/ownRecipes"
            element={<PrivateRoute component={<MyRecipesPage />} />}
          />
          <Route
            path="/add"
            element={<PrivateRoute component={<AddRecipePage />} />}
          />
          <Route
            path="/recipe/:recipeId"
            element={<PrivateRoute component={<RecipePage />} />}
          />
          <Route path="/search" element={<PrivateRoute component="" />} />
          <Route
            path="/shopping-list"
            element={<PrivateRoute component="" />}
          />
          {/* <Route path="*"  element={<Navigate to="/err" />} /> */}
        </Route>
      </Routes>
    </>
  );
};

export default App;
