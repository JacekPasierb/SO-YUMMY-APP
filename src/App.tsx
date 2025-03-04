import React, {FC, Suspense, lazy, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Route, Routes, useLocation, useNavigate} from "react-router-dom";
import {AppDispatch} from "./redux/store";
import {refreshUser} from "./redux/auth/operations";
import {selectIsRefreshing, selectTheme} from "./redux/auth/selectors";
import {useAuth} from "./hooks/useAuth";
import {Loader} from "./components/Loader/Loader";
import RestrictedRoute from "./components/RestrictedRoute/RestrictedRoute";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import { jwtDecode } from "jwt-decode";

// Lazy-loaded Pages
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
const MyRecipesPage = lazy(() => import("./Pages/MyRecipesPage/MyRecipesPage"));
const NotFoundPage = lazy(() => import("./Pages/NotFoundPage/NotFoundPage"));
const SearchPage = lazy(() => import("./Pages/SearchPage/SearchPage"));
const ShoppingListPage = lazy(
  () => import("./Pages/ShoppingListPage/ShoppingListPage")
);
const SharedLayout = lazy(
  () => import("./components/SharedLayout/SharedLayout")
);
const CategoriesByName = lazy(
  () => import("./components/CategoriesByName/CategoriesByName")
);

const App: FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const {pathname, search} = location;

  const isRefreshing = useSelector(selectIsRefreshing);
  const isDarktheme = useSelector(selectTheme);
  const {token} = useAuth();

  // Preserve current location after refresh
  useEffect(() => {
    navigate(`${pathname}${search}`, {replace: true}); // Funkcja po odświeżeniu aplikacji użytkownik zostaje na aktualnej stronie
  }, [navigate, pathname, search]);

  // Refresh user session
  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch, token]);

 
  interface TokenPayload {
    exp: number;
  }
  const getTokenExpiration = (token: string | null) => {
    if (!token) return { expirationUtc: null, timeRemaining: null, isExpired: true };
  
    try {
      const decoded: TokenPayload = jwtDecode(token);
      const expirationTime = decoded.exp * 1000; // Konwersja na milisekundy
      const expirationDate = new Date(expirationTime);
      const currentTime = Date.now();
      const timeRemaining = expirationTime - currentTime;
  
      return {
        expirationUtc: expirationDate.toUTCString(), // Czytelna data UTC
        expirationTimestamp: expirationTime, // Timestamp do dalszego użycia
      timeRemaining: timeRemaining > 0 ? timeRemaining : 0, // Pozostały czas w ms
      isExpired: timeRemaining <= 0,
      };
    } catch (error) {
      console.error("Invalid token:", error);
      return { expirationUtc: null, timeRemaining: null, isExpired: true };
    }
  };

  useEffect(() => {
    const a = getTokenExpiration(token)
    console.log("token",a.expirationUtc);
    if (a.timeRemaining !== null) { // Sprawdzenie, czy timeRemaining nie jest null
      console.log("⏳ Pozostały czas:", a.timeRemaining / 1000, "sekund");
  } else {
      console.log("⏳ Pozostały czas: brak danych");
  }
    }, [ token]);

  // Handle theme changes
  useEffect(() => {
    document.body.className = isDarktheme ? "dark-theme" : "";
  }, [isDarktheme]);

  if (isRefreshing) {
    return <Loader />;
  }

  return (
    <Routes>
      {/* Public routes */}
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
      {/* Private routes */}
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
        <Route
          index
          element={
            <PrivateRoute
              component={
                <Suspense fallback={null}>
                  <MainPage />
                </Suspense>
              }
            />
          }
        />
        <Route
          path="/categories"
          element={
            <PrivateRoute
              component={
                <Suspense fallback={null}>
                  <CategoriesPage />
                </Suspense>
              }
            />
          }
        >
          <Route
            path=":categoryName"
            element={
              <Suspense fallback={null}>
                <CategoriesByName />
              </Suspense>
            }
          />
        </Route>
        <Route
          path="/favorite"
          element={
            <PrivateRoute
              component={
                <Suspense fallback={null}>
                  <FavoritesPage />
                </Suspense>
              }
            />
          }
        />
        <Route
          path="/ownRecipes"
          element={
            <PrivateRoute
              component={
                <Suspense fallback={null}>
                  <MyRecipesPage />
                </Suspense>
              }
            />
          }
        />
        <Route
          path="/add"
          element={
            <PrivateRoute
              component={
                <Suspense fallback={null}>
                  <AddRecipePage />
                </Suspense>
              }
            />
          }
        />
        <Route
          path="/recipe/:recipeId"
          element={
            <PrivateRoute
              component={
                <Suspense fallback={null}>
                  <RecipePage />
                </Suspense>
              }
            />
          }
        />
        <Route
          path="/search"
          element={
            <PrivateRoute
              component={
                <Suspense fallback={null}>
                  <SearchPage />
                </Suspense>
              }
            />
          }
        />
        <Route
          path="/shopping-list"
          element={
            <PrivateRoute
              component={
                <Suspense fallback={null}>
                  <ShoppingListPage />
                </Suspense>
              }
            />
          }
        />
        <Route
          path="*"
          element={
            <PrivateRoute
              component={
                <Suspense fallback={null}>
                  <NotFoundPage />
                </Suspense>
              }
            />
          }
        />
      </Route>
    </Routes>
  );
};

export default App;
